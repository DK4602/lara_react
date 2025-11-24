<?php

namespace App\Interface;

interface RepositoryInterface
{
    public function index($relation = [], $select = []);
    public function store($request);
    public function show($id, $relation = []);
    public function update($request, $id);
    public function destroy($id);
}
