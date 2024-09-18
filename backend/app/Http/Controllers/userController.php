<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Retrieve all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Retrieve a single user by ID
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Create a new user
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:super_admin,admin,student',
            'email' => 'nullable|email|unique:users',
            'profile_picture' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'email' => $request->email,
            'profile_picture' => $request->profile_picture,
            'phoneNumber' => $request->phoneNumber,
        ]);

        return response()->json($user, 201);
    }

    // Update an existing user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'username' => 'sometimes|required|string|unique:users,username,' . $user->user_id,
            'password' => 'sometimes|required|string|min:6',
            'role' => 'sometimes|required|in:super_admin,admin,student',
            'email' => 'nullable|email|unique:users,email,' . $user->user_id,
            'profile_picture' => 'nullable|string',
            'phoneNumber' => 'nullable|string',
        ]);

        // Update password only if it's provided
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        // Update user information, excluding password if not provided
        $user->update($request->except('password'));

        return response()->json($user);
    }

    // Delete a user
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}