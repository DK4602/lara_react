<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Can;
use App\Repositories\TaskRepositories;
use App\Repositories\ClientRepositories;
use App\Repositories\ProjectRepositories;
use App\Http\Requests\StoreProjectRequest;
use App\Repositories\EmployeeRepositories;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{

    public function __construct(
        protected ProjectRepositories $projectRepositories,
        protected EmployeeRepositories $employeeRepositories,
        protected ClientRepositories $clientRepositories,
        protected TaskRepositories $taskRepositories
    ) {}

    public function index()
    {
        // Get projects with tasks, employees, and client, paginated
        $data = $this->projectRepositories->index(
            ['tasks', 'employee', 'client'], // relations
            [],                              // optional where conditions
            10                                // pagination: 10 per page
        );

        // Get all employees
        $employee = $this->employeeRepositories->index(
            [],                               // no relations
            ['role' => 'employee']            // where role = employee
        );

        // Get all clients
        $client = $this->clientRepositories->index(
            [],                               // no relations
            ['role' => 'client']              // where role = client
        );
        // return($data);
        return Inertia::render('project/projectIndex', compact('data', 'employee', 'client'));
    }


    public function store(StoreProjectRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $data = [
                'project_name'        => $validated['project_name'],
                'project_description' => $validated['project_description'] ?? null,
                'start_date'          => $validated['start_date'],
                'end_date'            => $validated['end_date'],
                'client_id'           => $validated['client_id'],
            ];

            $employeeIds = $validated['employee_ids'];
            $this->projectRepositories->store($data, $employeeIds);

            DB::commit();
            return redirect()->route('projects.index')->with('success', 'Project created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            // Optional: log for debugging
            Log::error('Project store failed: ' . $e->getMessage());

            return redirect()
                ->route('projects.index')
                ->with('error', 'Something went wrong while creating the project.');
        }
    }

    public function create()
    {
        $client = $this->clientRepositories->index([], ['role' => 'client']);
        $employees = $this->employeeRepositories->index([], ['role' => 'employee']);
        return view('project.createProject', compact('client', 'employees'));
    }

    public function show(Project $project)
    {

        if (Auth::user()->role === 'employee') {
            $employeeFilter = function ($query) {
                return $query->whereHas('employees', function ($q) {
                    $q->where('users.id', Auth::id());
                });
            };

            $data = $this->projectRepositories->show($project->id, ['employees', 'tasks', 'client'], [], [$employeeFilter]);
            $tasks = $this->taskRepositories->index(['user'], ['project_id' => $project->id, 'employee_id' => Auth::user()->id]);
            // return view('project.GetProject', compact('data', 'tasks'));
        }
        if (Auth::user()->role === 'admin') {
            $data = $this->projectRepositories->show($project->id, ['employees', 'tasks', 'client']);
            $tasks = $this->taskRepositories->index(['user'], ['project_id' => $project->id]);
        }
        // dd($data);
        // return view('project.GetProject', compact('data', 'tasks'));
        return Inertia::render('project/getProject', compact('data', 'tasks'));
    }


    public function edit($id)
    {
        if (Gate::denies('is-admin')) {
            return view('error.403page');
        }
        $project = $this->projectRepositories->show($id, ['employees']);
        $client = $this->clientRepositories->index([], ['role' => 'client']);
        $employees = $this->employeeRepositories->index([], ['role' => 'employee']);
        $selectedEmployees = $project->employees->pluck('id')->toArray();
        return view('project.editProject', compact('project', 'client', 'employees', 'selectedEmployees'));
    }


    public function update(UpdateProjectRequest $request, Project $project)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $data = [
                'project_name'        => $validated['project_name'],
                'project_description' => $validated['project_description'] ?? null,
                'start_date'          => $validated['start_date'],
                'end_date'            => $validated['end_date'],
                'client_id'           => $validated['client_id'],
            ];
            $this->projectRepositories->update($data, $project->id, $validated['employee_ids']);
            DB::commit();
            return redirect()->route('projects.index')->with('success', 'Project created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('projects.index');
        }
    }


    public function destroy(Project $project)
    {
        DB::beginTransaction();
        try {
            $this->projectRepositories->destroy($project->id);
            DB::commit();
            return redirect()->route('projects.index')->with('success', 'Project deleted successfully!');;
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('projects.index');
        }
    }
}
