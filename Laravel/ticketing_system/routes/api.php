<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketTypeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('events', [EventController::class, 'index']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('events/{id}', [EventController::class, 'show']);
Route::post('events', [EventController::class, 'store']);
Route::get('user', [EventController::class, 'user']);
Route::resource('/users', UserController::class);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('adminevents', [EventController::class, 'adminIndex']);
    Route::post('events/{id}/tickets', [EventController::class, 'addTicket']);
    Route::put('events/{id}', [EventController::class, 'update']);
    Route::delete('events/{id}', [EventController::class, 'destroy']);
    Route::post('/admin/register', [AuthController::class, 'registerAdmin'])->name('admin.register');
    Route::get('/events/{event}/tickets', [TicketTypeController::class, 'index']);
    Route::post('/events/{event}/tickets', [TicketTypeController::class, 'store']);
    Route::get('/tickets/{ticket}', [TicketTypeController::class, 'show']);
    Route::put('/tickets/{ticket}', [TicketTypeController::class, 'update']);
    Route::delete('/tickets/{ticket}', [TicketTypeController::class, 'destroy']);
    Route::post('/events/{event}/purchase-ticket', [EventController::class, 'purchaseTicket']);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
