<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\TaskRepositories;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Repositories\EmployeeRepositories;


class EmployeeController extends Controller
{

    public function __construct(protected EmployeeRepositories $employeeRepositories,
        protected TaskRepositories $taskRepositories
    ){}
    public function index()
    {
        $data = $this->employeeRepositories->index(['projectsByEmployee'], ['role' => 'employee']);
        // return view('employee',compact('data'));    
        return Inertia::render('Employees/getEmployees', compact('data'));
    }

    public function store(StoreUserRequest $request) 
    {
        $data = $request->validated();
        $data['role']='employee';
        DB::beginTransaction();
        try{
            $this->employeeRepositories->store($data);
            DB::commit();
            return redirect()->route('employees.index')->with('success', 'Employee created successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('employees.index');
        }
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        DB::beginTransaction();
        try{
            $this->employeeRepositories->update($request->validated(),$id);
            DB::commit();
            return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');;    
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return redirect()->route('projects.index');
        }
    }

   public function destroy(string $id)
    {
        DB::beginTransaction();
        try{
            $this->employeeRepositories->destroy($id);
            DB::commit();
            return redirect()->route('employees.index')->with('success', 'Employee deleted successfully!');
        }
        catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('employees.index');
        }
    }
    
}
