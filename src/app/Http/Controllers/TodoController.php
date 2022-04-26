<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    //初期表示
    public function index()
    {
        $todos = Todo::all();
        return $todos;
    }

    //add
    public function addTodo(Request $request){
        $todo = new Todo;
        $todo->title = $request->title;
        $todo->save();

        $todos = Todo::all();
        return $todos;
    }

    //complete
    public function completeTodo(Request $request)[
        
    ]

    //delete
    public function deleteTodo(Request $request){
        $todo = Todo::find($request->id);
        $todo->delete();

        $todos = Todo::all();
        return $todos;
    }
}