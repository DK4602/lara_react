<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Middleware\isAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Settings\ProfileController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',DashboardController::class)->name('dashboard');

});

Route::middleware('auth')->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::resource('employees', EmployeeController::class)->middleware(isAdmin::class);
    Route::resource('clients', ClientController::class)->middleware(isAdmin::class);
    Route::resource('tasks', TaskController::class);
    Route::post('tasks/import/{projectId}', [TaskController::class, 'import'])->name('tasks.import');
});

require __DIR__.'/settings.php';
