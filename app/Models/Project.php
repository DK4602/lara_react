<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    protected $guarded = [];

   public function tasks()
   {
      return $this->hasMany(Task::class);
   }

    public function employees()
    {
        return $this->belongsToMany(User::class, 'user_project', 'project_id', 'user_id');
    }
   public function client(){
      return $this->belongsTo(User::class, 'client_id');
   }

   public static function boot()
   {
       parent::boot();
       static::deleting(function ($project) {
           $project->employees()->detach();
       });
   }
}
