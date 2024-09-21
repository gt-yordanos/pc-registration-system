<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQrCodeScansTable extends Migration
{
    public function up()
    {
        Schema::create('qr_code_scans', function (Blueprint $table) {
            $table->id('scan_id');
            $table->foreignId('admin_id')->constrained('admins', 'admin_id')->onDelete('cascade');
            $table->foreignId('student_id')->referenced('students','student_id')->onDelete('cascade');
            $table->foreignId('pc_id')->constrained('pcs', 'pc_id')->onDelete('cascade');
            $table->timestamp('scan_time')->useCurrent();
        });
    }

    public function down()
    {
        Schema::dropIfExists('qr_code_scans');
    }
}
