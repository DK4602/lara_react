<?php

namespace App\Imports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TasksImport implements ToModel,WithHeadingRow
{
     protected $projectId;

    public function __construct($projectId)
    {
        $this->projectId = $projectId;
    }

    public function model(array $row)
    {
        return new Task([
            'project_id'       => $this->projectId,
            'task_name'        => $row['task_name'],
            'task_description' => $row['task_description'],
            'status'           => $row['status'] ?? 'pending',
            'start_date'       => $row['start_date'] ?? null,
            'end_date'         => $row['end_date'] ?? null,
        ]);
    }
}
