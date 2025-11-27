<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Repositories\ClientRepositories;
use App\Repositories\EmployeeRepositories;
use App\Repositories\ProjectRepositories;
use App\Repositories\TaskRepositories;
use ArielMejiaDev\LarapexCharts\Facades\LarapexChart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected ClientRepositories $clientRepositories,
        protected EmployeeRepositories $employeeRepositories,
        protected TaskRepositories $taskRepositories,
        protected ProjectRepositories $projectRepositories
    ) {}

    public function __invoke()
    {
        $id = Auth::user()->id;
        if (Auth::user()->role === 'admin') {
            $data = User::get();
            $project = $this->projectRepositories->index();
            $task = $this->taskRepositories->index();
            $projectWithTasks = $project->map(fn($project) => [
                'name' => $project->project_name,
                'tasks' => $project->tasks->count(), // Only count tasks relation
            ]);
            $employeeCount = $this->employeeRepositories->index([], ['role' => 'employee'])->count();
            $clientCount = $this->clientRepositories->index([], ['role' => 'client'])->count();
            $taskCount['ip_task'] = $this->taskRepositories->index([], ['status' => 'in_progress'])->count();
            $taskCount['pending_task'] = $this->taskRepositories->index([], ['status' => 'pending'])->count();
            $taskCount['completed_task'] = $this->taskRepositories->index([], ['status' => 'completed'])->count();
            return Inertia::render('Dashboard/dashboard', compact('employeeCount', 'clientCount', 'taskCount', 'project', 'task', 'projectWithTasks'));
        }

        if (Auth::user()->role === 'employee') {
            $data = $this->employeeRepositories->show($id, ['projectsByEmployee']);
            $task = $this->employeeRepositories->show($id, ['tasksByEmployee']);
            $ip_task        = $task->tasksByEmployee->where('status', 'in_progress')->count();
            $pending_task   = $task->tasksByEmployee->where('status', 'pending')->count();
            $completed_task = $task->tasksByEmployee->where('status', 'completed')->count();
            $totalTasks = $task->tasksByEmployee->count();
            $complete_percent = $totalTasks > 0
                ? ($completed_task / $totalTasks) * 100
                : 0;
            // $chartTask = LarapexChart::donutChart()
            //     ->setTitle('Tasks Status')
            //     ->addData([$pending_task, $ip_task, $completed_task])
            //     ->setLabels(['Pending', 'In Progress', 'Completed'])
            //     ->setColors(['#F59E0B', '#6366F1', '#10B981']);
            return Inertia::render('Dashboard/dashboard', compact('data', 'task', 'complete_percent'));
        }

        if (Auth::user()->role === 'client') {
            $data = $this->clientRepositories->show($id, ['projectsByClient']);
            $task = $this->clientRepositories->show($id, ['tasksByClient']);
            $ip_task = $task->tasksByClient->where('status', 'in_progress')->count();
            $pending_task = $task->tasksByClient->where('status', 'pending')->count();
            $completed_task = $task->tasksByClient->where('status', 'completed')->count();
            // $chartTask = LarapexChart::donutChart()
            //     ->setTitle('Tasks Status')
            //     ->addData([$pending_task, $ip_task, $completed_task])
            //     ->setLabels(['Pending', 'In Progress', 'Completed'])
            //     ->setColors(['#F59E0B', '#6366F1', '#10B981']);
            return Inertia::render('Dashboard/dashboard', compact('data', 'task'));
        }
    }
}
