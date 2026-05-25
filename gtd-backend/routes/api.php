<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/v1/tasks/batch', [TaskController::class, 'batchStore']);
