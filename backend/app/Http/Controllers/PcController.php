<?php

namespace App\Http\Controllers;

use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PcController extends Controller
{
    // Retrieve all PCs
    public function index()
    {
        $pcs = PC::all();

        if ($pcs->isEmpty()) {
            Log::info('No PCs found.');
        }

        return response()->json($pcs);
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
            'serial_number' => 'required|string|unique:pcs',
            'pc_brand' => 'required|string|max:255',
            'pc_color' => 'required|string|max:255',
            'owner_id' => 'nullable|exists:Students,student_id', // Ensure the owner exists
        ]);

        // Create a new PC with the validated data
        $pc = PC::create($request->only(['serial_number', 'pc_brand', 'pc_color', 'owner_id']));
        
        Log::info('PC created: ', ['pc' => $pc]);

        return response()->json($pc, 201);
    }

    // Update an existing PC
    public function update(Request $request, $id)
    {
        $pc = PC::findOrFail($id);

        $request->validate([
            'serial_number' => 'sometimes|required|string|unique:pcs,serial_number,' . $pc->id,
            'pc_brand' => 'sometimes|required|string|max:255',
            'pc_color' => 'sometimes|required|string|max:255',
            'owner_id' => 'nullable|exists:Students,student_id', // Ensure the owner exists
        ]);

        $pc->update($request->only(['serial_number', 'pc_brand', 'pc_color', 'owner_id']));

        Log::info('PC updated: ', ['pc' => $pc]);

        return response()->json($pc);
    }

    // Delete a PC
    public function delete($id)
    {
        $pc = PC::findOrFail($id);
        $pc->delete();

        Log::info('PC deleted: ', ['pc_id' => $id]);

        return response()->json(null, 204);
    }
}