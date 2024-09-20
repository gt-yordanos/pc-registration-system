<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $primaryKey = 'admin_id';

    protected $fillable = [
        'user_id',
        'managed_students', // This is a JSON field
    ];

     // Relationship: An admin belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}