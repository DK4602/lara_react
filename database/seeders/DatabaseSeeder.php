<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(20)->create();

    // 2️⃣ Create 20 projects
        Project::factory(50)->create()->each(function ($project) {
            // 3️⃣ Create 1–5 tasks for each project
            Task::factory(fake()->numberBetween(6, 10))->create([
                'project_id' => $project->id,
            ]);
        });
        $this->call(AssignEmployeesToProjectsSeeder::class);
        $this->call(AssignEmployeeToTasksSeeder::class);


    }
}
