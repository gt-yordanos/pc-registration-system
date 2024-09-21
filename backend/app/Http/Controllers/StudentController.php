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

        
        // Create student entry
        $student = Student::create([
            'student_id' => $request->student_id,
            'student_name' => $request->student_name,
            'phoneNumber' => $request->phoneNumber,
            'pc_brand' => $request->pc_brand,
            'serial_number' => $request->serial_number,
            'pc_color' => $request->pc_color,
        ]);
        

        
        
        // Create PC entry
        $pc = PC::create([
            'serial_number' => $request->serial_number,
            'pc_brand' => $request->pc_brand,
            'pc_color' => $request->pc_color,
            'owner_id' => $request->student_id,
        ]);
        
        // Generate QR code
        $qrCode = $this->generateQRCode($pc->serial_number);
        
        // Placeholder for sending QR code
        // Mail::to($request->email)->send(new QrCodeEmail($qrCode));
        
        return response()->json(['message' => 'Student registered successfully', 'student' => $student], 201);
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
            'serial_number' => 'sometimes|required|string|unique:pcs,serial_number,' . $id,
            'pc_brand' => 'sometimes|required|string',
            'pc_color' => 'sometimes|required|string',
        ]);

        // Check for validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Find student
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Update PC if serial number is provided
        if ($request->has('serial_number')) {
            $student->pc->update([
                'serial_number' => $request->serial_number,
                'pc_brand' => $request->pc_brand,
                'pc_color' => $request->pc_color,
            ]);
        }

        return response()->json(['message' => 'Student updated successfully', 'student' => $student], 200);
    }

    // Delete a student
    public function delete($id)
    {
        // Find and delete student
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->pc()->delete(); // Delete associated PC
        $student->delete(); // Delete student record

        return response()->json(['message' => 'Student deleted successfully'], 200);
    }
}
