<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Admin login
public function login(Request $request)
{
    $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

        // Find the admin by username
    $admin = Admin::where('username', $request->username)->first();

        // Check if the admin exists and the password is correct
    if ($admin && Hash::check($request->password, $admin->password)) {
        if ($admin->role !== 'super_admin') {
            return response()->json(['message' => 'Access denied. Super admin role required.'], 403);
        }
        return response()->json(['admin' => $admin], 200);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}


    // Retrieve all admins
    public function index()
    {
        return response()->json(Admin::all());
    }

    // Retrieve a single admin by ID
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    // Create a new admin
    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|string|unique:admins', // Validate admin_id
            'username' => 'required|string', // Username is required
            'password' => 'required|string|min:6', // Password validation
            'role' => 'required|in:super_admin,admin', // Role validation
            'email' => 'nullable|email|unique:admins', // Email validation
            'profile_picture' => 'nullable|string', // Profile picture validation
            'phoneNumber' => 'nullable|string', // Phone number validation
        ]);
    
        // Create a new admin record
        $admin = Admin::create([
            'admin_id' => $request->admin_id, // Set admin_id from request
            'username' => $request->username, // Set username from request
            'password' => Hash::make($request->password), // Hash the password
            'role' => 'admin', // Set role from request
            'email' => $request->email, // Set email from request
            'profile_picture' => $request->profile_picture, // Set profile picture
            'phoneNumber' => $request->phoneNumber, // Set phone number
        ]);
    
        return response()->json($admin, 201);
    }
    
    // Update an existing admin
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        // Validate incoming request data
        $request->validate([
            'username' => 'sometimes|required|string', // Username is required if provided
            'password' => 'sometimes|string|min:6', // Password must be at least 6 characters if provided
            'role' => 'sometimes|required|in:super_admin,admin', // Role should be valid if provided
            'email' => 'nullable|email|unique:admins,email,' . $admin->id, // Email validation
            'profile_picture' => 'nullable|string', // Profile picture is optional
            'phoneNumber' => 'nullable|string', // Phone number is optional
        ]);

        if ($request->has('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->update($request->except('password'));

        return response()->json($admin);
    }

    // Delete an admin
    public function delete($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();
        return response()->json(null, 204);
    }
}
