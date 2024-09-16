<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePcsTable extends Migration
{
    public function up()
    {
        Schema::create('pcs', function (Blueprint $table) {
            $table->id('pc_id');
            $table->string('serial_number')->unique();
            $table->foreignId('owner_id')->constrained('students', 'student_id')->onDelete('cascade');
            $table->string('pc_brand');
            $table->string('pc_color');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pcs');
    }
}
