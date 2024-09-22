<?php

namespace App\Http\Controllers;

use App\Models\Admin; // Import the Admin model
use Illuminate\Http\Request; // Import the Request class
use Illuminate\Support\Facades\Hash; // Import the Hash facade for password hashing

class AdminController extends Controller
{
    // Admin login
    public function login(Request $request)
    {
        // Validate request data
        $request->validate([
            'username' => 'required|string', // Ensure username is provided
            'password' => 'required|string', // Ensure password is provided
        ]);

        // Find the admin by username
        $admin = Admin::where('username', $request->username)->first();

        // Check if the admin exists and the password is correct
        if ($admin && Hash::check($request->password, $admin->password)) {
            return response()->json(['admin' => $admin], 200); // Return admin data if successful
        }

        // Return an error response if credentials are invalid
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Retrieve all admins
    public function index()
    {
        return response()->json(Admin::all()); // Return a list of all admins
    }

    // Retrieve a single admin by ID
    public function show($id)
    {
        // Find the admin by admin_id or fail if not found
        $admin = Admin::where('admin_id', $id)->firstOrFail();
        return response()->json($admin); // Return the admin data
    }

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
            'role' => $request->role, // Set role from request
            'email' => $request->email, // Set email from request
            'profile_picture' => $request->profile_picture, // Set profile picture
            'phoneNumber' => $request->phoneNumber, // Set phone number
        ]);
    
        return response()->json($admin, 201); // Return created admin with 201 status
    }
    
    // Update an existing admin
    public function update(Request $request, $id)
    {
        // Find the admin by admin_id or fail
        $admin = Admin::where('admin_id', $id)->firstOrFail();

        // Validate incoming request data
        $request->validate([
            'username' => 'sometimes|required|string', // Username is required if provided
            'password' => 'sometimes|string|min:6', // Password must be at least 6 characters if provided
            'role' => 'sometimes|required|in:super_admin,admin', // Role should be valid if provided
            'email' => 'nullable|email|unique:admins,email,' . $admin->id, // Email validation
            'profile_picture' => 'nullable|string', // Profile picture is optional
            'phoneNumber' => 'nullable|string', // Phone number is optional
        ]);

        // Hash the password if it is provided in the request
        if ($request->has('password')) {
            $admin->password = Hash::make($request->password);
        }

        // Update the admin record with the new data
        $admin->update($request->except('password')); // Exclude the password from the update array

        return response()->json($admin); // Return the updated admin data
    }

    // Delete an admin
    public function delete($id)
    {
        // Find the admin by admin_id or fail
        $admin = Admin::where('admin_id', $id)->firstOrFail();
        $admin->delete(); // Delete the admin record
        return response()->json(null, 204); // Return a 204 status for successful deletion
    }
}