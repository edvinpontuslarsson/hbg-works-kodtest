<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CoursesController;
use App\Http\Controllers\CourseApplicationController;

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

Route::get('/courses', [CoursesController::class, 'index']);

Route::get(
    '/applications', 
    [CourseApplicationController::class, 'index']
);

Route::post(
    '/applications', 
    [CourseApplicationController::class, 'store']
);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
