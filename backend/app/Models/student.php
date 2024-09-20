<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';

    protected $fillable = [
        'user_id',
        'pc_brand',
        'serial_number',
        'pc_color',
        'qr_code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

     // Relationship: A student has one PC
     public function pc()
     {
         return $this->hasOne(PC::class, 'owner_id');
     }
    

}