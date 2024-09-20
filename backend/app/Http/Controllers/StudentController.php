<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    // Register a new student along with their PC
    public function register(Request $request)
    {
        // Validate request input
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
            'serial_number' => 'required|string|unique:pcs',
            'pc_brand' => 'required|string',
            'pc_color' => 'required|string',
        ]);

        // Check for validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create PC entry
        $pc = PC::create([
            'serial_number' => $request->serial_number,
            'pc_brand' => $request->pc_brand,
            'pc_color' => $request->pc_color,
            'owner_id' => $request->user_id,
        ]);

        // Create student entry
        $student = Student::create([
            'user_id' => $request->user_id,
            'pc_id' => $pc->pc_id,
        ]);

        // Generate QR code (for simplicity, we use the serial number as the code)
        $qrCode = $this->generateQRCode($pc->serial_number);

        // Send QR code via email
        Mail::to($request->user()->email)->send(new QrCodeEmail($qrCode));

        return response()->json(['message' => 'Student registered successfully', 'student' => $student], 201);
    }

    // Generate a QR code (dummy implementation)
    private function generateQRCode($data)
    {
        // This is where you'd generate a QR code.
        return $data; // Placeholder
    }

    // Show student information
    public function show($id)
    {
        $student = Student::with('user', 'pc')->findOrFail($id);
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

        // Find and update student
        $student = Student::findOrFail($id);
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
    $student = Student::findOrFail($id);
    $student->pc->delete(); // Delete associated PC
    $student->delete(); // Delete student record

    return response()->json(['message' => 'Student deleted successfully'], 200);
}
}






