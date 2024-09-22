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

        $admin = Admin::where('username', $request->username)->first();

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
            'username' => 'required|string|unique:admins',
            'password' => 'required|string|min:6',
            'email' => 'nullable|email|unique:admins',
            'profile_picture' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
        ]);

        $admin = Admin::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'admin',
            'email' => $request->email,
            'profile_picture' => $request->profile_picture,
            'phoneNumber' => $request->phoneNumber,
        ]);

        return response()->json($admin, 201);
    }

    // Update an existing admin
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $request->validate([
            'username' => 'sometimes|required|string|unique:admins,username,' . $admin->admin_id,
            'password' => 'sometimes|string|min:6',
            'email' => 'nullable|email|unique:admins,email,' . $admin->admin_id,
            'profile_picture' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
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
