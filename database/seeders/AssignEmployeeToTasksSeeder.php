<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignEmployeeToTasksSeeder extends Seeder
{
    public function run(): void
    {
        // Get all tasks
        $tasks = DB::table('tasks')->get();

        foreach ($tasks as $task) {
            // Find all employee users linked to this task's project
            $employees = DB::table('user_project')
                ->join('users', 'users.id', '=', 'user_project.user_id')
                ->where('user_project.project_id', $task->project_id)
                ->where('users.role', 'employee') // Adjust field name if different
                ->pluck('users.id');

            // If project has employees, randomly assign one
            if ($employees->count() > 0) {
                $employeeId = $employees->random();

                DB::table('tasks')
                    ->where('id', $task->id)
                    ->update(['employee_id' => $employeeId]);
            }
        }
    }
}
