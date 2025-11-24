<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Imports\TasksImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Repositories\TaskRepositories;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\ImportTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Repositories\ProjectRepositories;

class TaskController extends Controller
{

    public function __construct(
        protected TaskRepositories $taskRepositories,
        protected ProjectRepositories $projectRepositories
    )
    {}
    
    public function index()
    {
        $id = Auth::user()->id;
        $Efilter = function ($query) {
            $query->whereHas('employees', function ($q) {
                $q->where('id', Auth::id());
            });
            return $query;
        };
        
        $data = $this->taskRepositories->index(['project'],['employee_id'=>$id],10,['project_id'=>'asc']);
        $project = $this->projectRepositories->index(['employees'], [], null, $Efilter);
        return view('task',compact('data','project'));
    }
    
    public function store(StoreTaskRequest $request)
    {
        
        DB::beginTransaction();
        try{
            $this->taskRepositories->store($request->validated());
            DB::commit();
            return redirect()->back()->with('success', 'Tasks created successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->back();
        }
        
    }

    
    public function update(UpdateTaskRequest $request, Task $task)
    {
        DB::beginTransaction();
        try{
            $this->taskRepositories->update($request->validated(),$task->id);
            DB::commit();
            return redirect()->back()->with('success', 'Tasks updated successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->back();
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        DB::beginTransaction();
        try{
            $this->taskRepositories->destroy($task->id);
            DB::commit();
            return redirect()->back()->with('success', 'Tasks Deleted successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->back();
        }
    }

    public function import(ImportTaskRequest $request, $projectId)
    {
        DB::beginTransaction();
        try{
            $request->validated();
            Excel::import(new TasksImport($projectId), $request->file('file'));
            DB::commit();
            return redirect()->back()->with('success', 'Tasks imported successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
