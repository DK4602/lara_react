<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AssignEmployeesToProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            $employees = User::where('role', 'employee')
                             ->inRandomOrder()
                             ->take(2)
                             ->pluck('id');

            // Assign employees to this project
            $project->employees()->syncWithoutDetaching($employees);
        }
    }
}
