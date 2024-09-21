<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';

    protected $fillable = [
        'student_id',
        'student_name',
        'phoneNumber',
        'email',
        'pc_brand',
        'serial_number',
        'pc_color',
        'qr_code',
        'pc_id',
    ];


     // Relationship: A student has one PC
     public function pc()
     {
         return $this->hasOne(PC::class, 'owner_id');
     }
    

}