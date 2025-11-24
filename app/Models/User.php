<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projectsByEmployee()
    {
         return $this->belongsToMany(Project::class, 'user_project', 'user_id', 'project_id');
    }
    public function projectsByClient()
    {
        return $this->hasMany(Project::class, 'client_id', 'id');
    }

   public function tasksByEmployee()
    {
        return $this->hasMany(
            Task::class, 'employee_id', 'id'    // Local key on user_project table
        );
    }
    public function tasksByClient()
    {
       return $this->hasManyThrough(
        Task::class,     
        Project::class,  
        'client_id',  
        'project_id',    
        'id',            
        'id'
    );            
    }

}
