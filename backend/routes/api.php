
<?php


use App\Http\Controllers\AdminController;
use App\Http\Controllers\PcController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



Route::post('/signup' , [AuthController::class, 'signup']);
Route::post('/login' , [AuthController::class, 'login']);
Route::post('/logout' , [AuthController::class, 'logout']);


// Group routes for all controllers
Route::group(['prefix' => 'api'], function () {
    // User routes
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
    
    // Student routes
    Route::post('/students/register', [StudentController::class, 'register']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::delete('/students/{id}', [StudentController::class, 'delete']);

    // Admin routes
    Route::post('/admin/login', [AdminController::class, 'login']);
    Route::get('/admins', [AdminController::class, 'index']);
    Route::get('/admins/{id}', [AdminController::class, 'show']);
    Route::post('/admins', [AdminController::class, 'store']);
    Route::put('/admins/{id}', [AdminController::class, 'update']);
    Route::delete('/admins/{id}', [AdminController::class, 'delete']);

    // PC routes
    Route::get('/pcs', [PCController::class, 'index']);
    Route::get('/pcs/{id}', [PCController::class, 'show']);
    Route::post('/pcs', [PCController::class, 'store']);
    Route::put('/pcs/{id}', [PCController::class, 'update']);
    Route::delete('/pcs/{id}', [PCController::class, 'delete']);

    // QR Code routes
    Route::post('/qrcodes/generate', [QRCodeController::class, 'generate']);
    Route::post('/qrcodes/scan', [QRCodeController::class, 'scan']);
});



