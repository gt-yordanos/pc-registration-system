<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    // Register a new student along with their PC
    public function register(Request $request)
    {
        // Validate request input
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|string|unique:students',
            'student_name' => 'required|string',
            'phoneNumber' => 'nullable|string',
            'pc_brand' => 'required|string',
            'serial_number' => 'required|string|unique:pcs',
            'pc_color' => 'required|string',
        ]);
        
        // Check for validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        \Log::info('This is a test log message');

        // Create student entry
        $student = Student::create([
            'student_id' => $request->student_id,
            'student_name' => $request->student_name,
            'phoneNumber' => $request->phoneNumber,
            'serial_number' => $request->serial_number,
            'pc_color' => $request->pc_color,
            'pc_brand' => $request->pc_brand,
        ]);
    $d = $student->id;
    // Log the created student details
    \Log::info('Student created: ', ['student' => $student]);

        // Create PC entry
        $pc = PC::create([
            'serial_number' => $request->serial_number,
            'pc_brand' => $request->pc_brand,
            'pc_color' => $request->pc_color,
            'owner_id' => $d,
        ]);
        
        // Generate QR code
        $qrCode = $this->generateQRCode($pc->serial_number);
        
        // Placeholder for sending QR code
        // Mail::to($request->email)->send(new QrCodeEmail($qrCode));
        
        return response()->json(['message' => 'Student registered successfully', 'student' => $student], 201);
    }


    //search
    public function index(Request $request)
    {
        $searchTerm = $request->get('search', '');

        // Query students based on the search term across multiple columns
        $students = Student::where('student_name', 'like', "%{$searchTerm}%")
            ->orWhere('student_id', 'like', "%{$searchTerm}%")
            ->orWhere('phoneNumber', 'like', "%{$searchTerm}%")
            ->orWhere('serial_number', 'like', "%{$searchTerm}%")
            ->orWhereHas('pc', function ($query) use ($searchTerm) {
                $query->where('pc_color', 'like', "%{$searchTerm}%")
                      ->orWhere('pc_brand', 'like', "%{$searchTerm}%");
            })
            ->get();

        if ($students->isEmpty()) {
            Log::info('No students found for search term: ' . $searchTerm);
        }

        return response()->json($students);
    }

    // Generate a QR code (dummy implementation)
    private function generateQRCode($data)
    {
        return $data; // Placeholder
    }
    
    // Retrieve all student information
    public function showAll()
    {
        return response()->json(Student::all());
    }

    // Show student information
    public function show($id)
    {
        $student = Student::with('pc')->findOrFail($id);
        return response()->json($student);
    }

    // Update student information
    public function update(Request $request, $id)
    {
        // Validate request input
        $validator = Validator::make($request->all(), [
            'student_name' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
            'pc_brand' => 'nullable|string',
            'serial_number' => 'nullable|string',
            'pc_color' => 'nullable|string',
        ]);

        // Check for validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Find the student by ID
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Update student details
        $student->update($request->only(['student_name', 'phoneNumber']));

        // Update associated PC details if provided
        if ($request->has('serial_number') || $request->has('pc_brand') || $request->has('pc_color')) {
            $pc = $student->pc; // Assuming a relation named 'pc' exists
            if ($pc) {
                $pc->update($request->only(['serial_number', 'pc_brand', 'pc_color']));
            }
        }

        return response()->json(['message' => 'Student updated successfully', 'student' => $student], 200);
    }

    // Delete a student
    public function delete($id)
    {
        $student_id = $id;
        // Find and delete student
        $student = Student::find($student_id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->pc()->delete(); // Delete associated PC
        $student->delete(); // Delete student record

        return response()->json(['message' => 'Student deleted successfully'], 200);
    }
}
