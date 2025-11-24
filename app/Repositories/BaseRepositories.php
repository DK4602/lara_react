<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Log;
use App\Interface\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

abstract class BaseRepositories implements RepositoryInterface
{
    protected $model;
    /**
     * Create a new class instance.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

   public function index($relation = [], $where = [], $paginate = null, $filter = null, $orderBy = null)
    {
        $query = $this->model->newQuery();
        
        // Relations
        if (!empty($relation)) {
            $query->with($relation);
        }

        // Where conditions
        if (!empty($where)) {
            $query->where($where);
        }

        // Filter callback
        if (is_callable($filter)) {
            $query = $filter($query);
        }

        // OrderBy
        if (!empty($orderBy) && is_array($orderBy)) {
            foreach ($orderBy as $column => $direction) {
                $query->orderBy($column, $direction);
            }
        }

        // Pagination or get all
        if (!empty($paginate)) {
            return $query->paginate($paginate);
        }
        
        return $query->get();
    }



    public function store($request , $sync = null)
    {
        try
        {
            $create = $this->model->create($request);

            if(!empty($sync)) {
                
                $create->employees()->sync($sync);
            }
           return $create;
        }
        catch (QueryException $exc) 
        {
            Log::error($exc->getMessage(), $exc->getTrace());
            return null;
        }
    }

    public function show($id, $relation = [],$where = [],$filter = [])
    {
        $query = $this->model->newQuery();
        if(!empty($relation)) {
            return $query->with($relation)->find($id);
        }

        if(!empty($where)) {
            return $query->where($where)->find($id);
        }
         if (is_callable($filter)) {
            $query = $filter($query);
        }

        return $this->model->find($id);
    }

    public function update($request, $id, $sync = null)
    {
        try
        {
            $data = $this->show($id);
            $update = $data->update($request);

            if(!empty($sync)) {
                $data->employees()->sync($sync);
            }

            return $update;
        }
        catch (QueryException $exc) 
        {
            Log::error($exc->getMessage(), $exc->getTrace());
            return null;
        }
    }

    public function destroy($id)
    {
        try
        {
            $data = $this->show($id);
            return $data->delete();
        }
        catch (QueryException $exc) 
        {
            Log::error($exc->getMessage(), $exc->getTrace());
            return null;
        }
    }
}
