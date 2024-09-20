<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'user_id';
    
    protected $fillable = [
        'username',
        'password',
        'role', // 'super_admin', 'admin', or 'student'
        'email',
        'profile_picture',
        'phoneNumber',
    ];
    public function isAdmin()
    {
        return $this->role === 'admin' || $this->role === 'super_admin';
    }

    public function isStudent()
    {
        return $this->role === 'student';
    }

    public function student()
    {
        return $this->hasOne(Student::class, 'user_id');
    }

    public function admin()
    {
        return $this->hasOne(Admin::class, 'user_id');
    }
}
