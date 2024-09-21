<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Signup function
    public function signup(SignupRequest $request)
    {
        try {
            // Create new user
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'role' => $request->role,
                'phoneNumber' => $request->phoneNumber,
                'password' => Hash::make($request->password),
            ]);

            // Generate token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Signup successful!',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    // Login function
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('username', 'password');

        // Check user credentials
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Get authenticated user and generate token
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Logout function
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();  // Delete all tokens for the user

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
