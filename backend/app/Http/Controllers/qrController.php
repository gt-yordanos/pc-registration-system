<?php

namespace App\Http\Controllers;

use App\Models\QRCodeScan;
use Illuminate\Http\Request;

class QRCodeScanController extends Controller
{
    public function index()
    {
        return QRCodeScan::with(['admin', 'student', 'pc'])->get();
    }

    public function show($id)
    {
        return QRCodeScan::with(['admin', 'student', 'pc'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|exists:admins,admin_id',
            'student_id' => 'required|exists:students,student_id',
            'pc_id' => 'required|exists:pcs,pc_id',
        ]);

        $scan = QRCodeScan::create($request->all());
        return response()->json($scan, 201);
    }

    public function update(Request $request, $id)
    {
        $scan = QRCodeScan::findOrFail($id);

        $request->validate([
            'admin_id' => 'sometimes|required|exists:admins,admin_id',
            'student_id' => 'sometimes|required|exists:students,student_id',
            'pc_id' => 'sometimes|required|exists:pcs,pc_id',
        ]);

        $scan->update($request->all());
        return response()->json($scan);
    }

    public function delete($id)
    {
        $scan = QRCodeScan::findOrFail($id);
        $scan->delete();
        return response()->json(null, 204);
    }
}