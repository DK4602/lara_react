<?php

namespace App\Repositories;

use App\Models\User;use App\Interface\ClientInterface;
use App\Repositories\BaseRepositories;


class ClientRepositories extends BaseRepositories
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}
