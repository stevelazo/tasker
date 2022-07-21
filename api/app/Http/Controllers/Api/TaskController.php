<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    ////Funcion principal del listado de tareas////
    public function index()
    {
        $tasks  = Task::all(); 
        return  $tasks;
    }

    ////Funcion Para Registrar Nueva Tarea////
    public function store(Request $request)
    {
        $task                       = new Task;
        $task->title                = $request->title;
        $task->description          = $request->description;
        $task->name_response        = $request->name_response;      	  
        $task->last_name_response   = $request->last_name_response;         
        $task->save();

        return $task;
    
    }
    
    ////Funcion para Mostrar una Tarea////
    public function show($id)
    {
        $task = Task::find($id);
        return $task;
    }

    ////Funcion para Actualizar Tarea////
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($request->id);
        $task->title                = $request->title;
        $task->description          = $request->description;
        $task->name_response        = $request->name_response;      	  
        $task->last_name_response   = $request->last_name_response;         
        $task->save();

        return $task;
    }

    ////Funcion para Eliminar una Tarea////
    public function destroy($id)
    {
        $task = Task::destroy($id);
        return $task;
    }
}
