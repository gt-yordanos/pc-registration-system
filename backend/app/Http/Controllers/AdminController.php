<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        $admin = User::where('username', $request->username)
                     ->where('role', 'admin')
                     ->first();

        if ($admin && Hash::check($request->password, $admin->password)) {
            return response()->json(['admin' => $admin], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Retrieve all admins
    public function index()
    {
        return response()->json(User::where('role', 'admin')->get());
    }

    // Retrieve a single admin by ID
    public function show($id)
    {
        $admin = User::where('role', 'admin')->findOrFail($id);
        return response()->json($admin);
    }

    // Create a new admin
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'email' => 'nullable|email|unique:users',
            'profile_picture' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
        ]);

        $admin = User::create([
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
        $admin = User::where('role', 'admin')->findOrFail($id);

        $request->validate([
            'username' => 'sometimes|required|string|unique:users,username,' . $admin->id,
            'password' => 'sometimes|string|min:6',
            'email' => 'nullable|email|unique:users,email,' . $admin->id,
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
        $admin = User::where('role', 'admin')->findOrFail($id);
        $admin->delete();
        return response()->json(null, 204);
    }
}