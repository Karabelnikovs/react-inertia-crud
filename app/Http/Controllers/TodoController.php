<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Todo;
class TodoController extends Controller
{
    public function index(){
        return Inertia::render('Todo', [
            'todos' => Todo::paginate(2)
    ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'is_completed' => 'boolean'
        ],
        [
            'name.required' => 'Todo is required',
            'name.min' => 'Minimal length is 3 chars',
        ]);
        Todo::create($data);
        return back()->with('message','Todo was added');

    }
    
    public function edit(Todo $todo){
        return Inertia::render('Edit', [
            'todo'=>$todo
        ]);
    }
    public function update(Request $request, Todo $todo){
        $data = $request->validate([
            'name' => 'required|min:3',
        ],[
            'name.required' => 'Todo is required',
            'name.min' => 'Minimal length is 3 chars',
        ]);
        $todo->update($data);
        return redirect(route("todo.index"))->with('message', 'Todo updated succesfully');
    }
    public function complete(Request $request, Todo $todo){
        $data = $request->validate([
            'is_completed' => 'boolean'
        ]);
        $todo->update($data);
        return back()->with('message', 'Data have been updated');
    }

    public function destroy(Todo $todo){
        $todo->delete();
        return back()->with('message', 'Todo have been deleted');
    }

}

