<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 year', 'now');
        $endDate = fake()->dateTimeBetween($startDate, '+6 months');    
        return [
            'task_name'=>fake()->company() . ' ' . fake()->word(),
            'task_description'=>fake()->paragraph(),
            'status'=>fake()->randomElement(['pending', 'in_progress', 'completed']),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'project_id'=>Project::inRandomOrder()->value('id') ?? 1
        ];
    }
}
