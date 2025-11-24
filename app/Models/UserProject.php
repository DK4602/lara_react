<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    use HasFactory;

    // Explicitly specify the table name
    protected $table = 'user_project';

    // Allow mass assignment
    protected $fillable = [
        'user_id',
        'project_id',
        'created_at',
        'updated_at',
    ];

    // Define relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
