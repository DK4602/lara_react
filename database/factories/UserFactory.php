<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('123456789'),
            'remember_token' => Str::random(10),
            // Weighted: more employees than clients
            'role' => fake()->randomElement([
                'employee', 'employee', 'employee', 'employee', // 4x employee
                'client', 'client',                               // 2x client
                'admin'                                           // 1x admin
            ]),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
