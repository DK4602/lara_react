<?php

namespace App\Repositories;

use App\Interface\EmployeeInterface;
use App\Models\User;

class EmployeeRepositories extends BaseRepositories
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

}
