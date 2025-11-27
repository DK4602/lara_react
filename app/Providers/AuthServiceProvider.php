<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        Gate::define('is-admin', function ($user) {
            return strtolower($user->role) === 'admin';
        });

        Gate::define('is-employee', function ($user) {
            return strtolower($user->role) === 'employee';
        });

        Gate::define('is-client', function ($user) {
            return strtolower($user->role) === 'client';
        });

        Gate::define('view-project', function ($user, $project) {

            return $project->employees->contains('id', $user->id)
                || $user->id === $project->client_id;
        });
    }
}
