<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 
////Rutas Para el controlador de Tareas
Route::controller(TaskController::class)->group(function (){
    Route::get('/tasks','index');////Ruta para el listado de tareas
    Route::post('/task','store');////Ruta para registrar una tarea
    Route::get('/task/{id}','show');////Ruta para mostrar una tarea
    Route::put('/task/{id}','update');////Ruta para actualizar una tarea
    Route::delete('/task/{id}','destroy');////Ruta para eliminar una tarea
    Route::get('/taskexist/{title}','taskexist');////Ruta para validar titula de tarea existe

});
