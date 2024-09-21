<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;

class AdminController extends Controller
{
    // Admin login
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        try {
            $admin = Admin::where('username', $request->username)->first();

            if ($admin && Hash::check($request->password, $admin->password)) {
                return response()->json(['admin' => $admin], 200);
            }

            return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (Exception $e) {
            return response()->json(['message' => 'Login failed. ' . $e->getMessage()], 500);
        }
    }

    // Fetch all admins or search by name
    public function index(Request $request)
    {
        $search = $request->input('search');

        try {
            $admins = $search 
                ? Admin::where('username', 'LIKE', '%' . $search . '%')->get() 
                : Admin::all();

            return response()->json($admins, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to fetch admins. ' . $e->getMessage()], 500);
        }
    }

    // Register new admin
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'admin_id' => 'required|unique:admins',
            'phoneNumber' => 'required|string|max:20',
            'email' => 'required|email|unique:admins',
            'password' => 'required|string|min:6',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            // Handle profile picture upload if available
            $profilePicPath = null;
            if ($request->hasFile('profile_picture')) {
                $profilePicPath = $this->handleFileUpload($request->file('profile_picture'));
            }

            // Create new admin
            $admin = Admin::create([
                'username' => $request->input('username'),
                'admin_id' => $request->input('admin_id'),
                'phoneNumber' => $request->input('phoneNumber'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'profile_picture' => $profilePicPath,
            ]);

            return response()->json($admin, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Admin registration failed. ' . $e->getMessage()], 500);
        }
    }

    // Get an admin by ID
    public function show($id)
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['message' => 'Admin not found'], 404);
            }

            return response()->json($admin, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to fetch admin. ' . $e->getMessage()], 500);
        }
    }

    // Update admin
    public function update(Request $request, $id)
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['message' => 'Admin not found'], 404);
            }

            $request->validate([
                'username' => 'required|string|max:255',
                'phoneNumber' => 'required|string|max:20',
                'email' => 'required|email|unique:admins,email,' . $admin->id,
                'password' => 'nullable|string|min:6',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Handle profile picture upload if available
            if ($request->hasFile('profile_picture')) {
                if ($admin->profile_picture) {
                    Storage::delete($admin->profile_picture);
                }

                $profilePicPath = $this->handleFileUpload($request->file('profile_picture'));
                $admin->profile_picture = $profilePicPath;
            }

            // Update other fields
            $admin->username = $request->input('username');
            $admin->phoneNumber = $request->input('phoneNumber');
            $admin->email = $request->input('email');

            if ($request->input('password')) {
                $admin->password = Hash::make($request->input('password'));
            }

            $admin->save();

            return response()->json($admin, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Admin update failed. ' . $e->getMessage()], 500);
        }
    }

    // Delete admin
    public function destroy($id)
    {
        try {
            $admin = Admin::find($id);

            if (!$admin) {
                return response()->json(['message' => 'Admin not found'], 404);
            }

            if ($admin->profile_picture) {
                Storage::delete($admin->profile_picture);
            }

            $admin->delete();

            return response()->json(['message' => 'Admin deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete admin. ' . $e->getMessage()], 500);
        }
    }

    // Handle file upload
    protected function handleFileUpload($file)
    {
        try {
            $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();
            return $file->storeAs('profile_pictures', $fileName, 'public');
        } catch (Exception $e) {
            throw new Exception('File upload failed. ' . $e->getMessage());
        }
    }
}
