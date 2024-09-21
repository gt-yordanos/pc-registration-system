<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username');
            $table->string('password');
            $table->enum('role', ['super_admin', 'admin', 'student']);
            $table->string('email')->unique();
            $table->string('profile_picture')->nullable();
            $table->string('phoneNumber')->nullable();
            $table->timestamps(); // Adds created_at and updated_at columns
            
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
