<?php

namespace App\Http\Controllers;

use App\Models\PC;
use Illuminate\Http\Request;

class PCController extends Controller
{
    // Retrieve all PCs
    public function index()
    {
        return response()->json(PC::all());
    }

    // Retrieve a single PC by ID
    public function show($id)
    {
        $pc = PC::findOrFail($id);
        return response()->json($pc);
    }

    // Create a new PC
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'serial_number' => 'required|string|unique:pcs',
            'status' => 'required|in:available,assigned,maintenance',
            'assigned_to' => 'nullable|string',
        ]);

        $pc = PC::create($request->all());

        return response()->json($pc, 201);
    }

    // Update an existing PC
    public function update(Request $request, $id)
    {
        $pc = PC::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'model' => 'sometimes|required|string|max:255',
            'serial_number' => 'sometimes|required|string|unique:pcs,serial_number,' . $pc->id,
            'status' => 'sometimes|required|in:available,assigned,maintenance',
            'assigned_to' => 'nullable|string',
        ]);

        $pc->update($request->all());

        return response()->json($pc);
    }

    // Delete a PC
    public function delete($id)
    {
        $pc = PC::findOrFail($id);
        $pc->delete();
        return response()->json(null, 204);
    }
}