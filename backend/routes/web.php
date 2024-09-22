<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route to show the signup form
Route::get('/signup', function () {
    return view('signup'); // Make sure you have a signup.blade.php in resources/views
});

// Route to handle signup form submission
//Route::post('/signup', [AuthController::class, 'signup']); // Adjust according to your AuthController

