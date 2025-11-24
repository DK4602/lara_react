<?php

namespace App\Repositories;

use App\Models\Task;
use App\Interface\TaskInterface;
use App\Repositories\BaseRepositories;

class TaskRepositories extends BaseRepositories
{
   public function __construct(Task $model)
   {
       parent::__construct($model);
   } 
}
