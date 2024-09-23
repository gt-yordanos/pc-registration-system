<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PcController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\QrController;
use App\Http\Controllers\StudentController;
//use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Authenticated user route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group routes for all controllers
Route::group(['prefix' => 'api'], function () {
    //login sigup
    // Route::post('/login', [AuthController::class, 'login']);
    // Route::post('/signup', [AuthController::class, 'signup']);
    // Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    
    // Student routes
    Route::post('/students/register', [StudentController::class, 'register']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::get('/students', [StudentController::class, 'showAll']);
    Route::get('/students/search', [StudentController::class, 'index']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::delete('/students/{id}', [StudentController::class, 'delete']);

    // Admin routes
    Route::post('/admin/login', [AdminController::class, 'login']);
    Route::get('/admins', [AdminController::class, 'index']);
    Route::get('/admins/search', [AdminController::class, 'search']);
    Route::get('/admins/{id}', [AdminController::class, 'show']);
    Route::post('/admins/register', [AdminController::class, 'store']);
    Route::put('/admins/{id}', [AdminController::class, 'update']);
    Route::delete('/admins/{id}', [AdminController::class, 'delete']);

    // PC routes
    Route::get('/pcs', [PcController::class, 'index']);
    Route::get('/pcs/{id}', [PcController::class, 'show']);
    Route::post('/pcs', [PcController::class, 'store']);
    Route::put('/pcs/{id}', [PcController::class, 'update']);
    Route::delete('/pcs/{id}', [PcController::class, 'delete']);
    Route::get('/chart-data', [PCController::class, 'getChartData']);

    // QR Code routes
    Route::post('/qrcodes/generate', [QrController::class, 'generate']);
    Route::post('/qrcodes/scan', [QrController::class, 'scan']);
});