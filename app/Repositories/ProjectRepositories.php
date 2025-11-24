<?php

namespace App\Repositories;

use App\Models\Project;
use App\Interface\ProjectInterface;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BaseRepositories;

class ProjectRepositories extends BaseRepositories
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }
     public function index($relation = [], $where = [], $paginate = null, $filter = null, $order = null)
    {
        $query = $this->model->with(['tasks', 'employees', 'client']);

        if (Auth::user()->role === 'employee') {
            $query->whereHas('employees', function ($q) {
                $q->where('users.id', Auth::user()->id);
            });
        }

        if (Auth::user()->role === 'client') {
            $query->whereHas('client', function ($q) {
                $q->where('users.id', Auth::user()->id);
            });
        }

        if(!empty($paginate)) {
            return $query->paginate($paginate);
        }

        // Admin sees all
        return $query->get();
    }

}
