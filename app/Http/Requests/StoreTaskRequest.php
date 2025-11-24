<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && in_array(auth()->user()->role, ['admin', 'employee']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'task_name'=>'required',
            'task_description'=>'required',
            'project_id'=>'required|exists:projects,id',
            'employee_id'=>'required|exists:users,id',
            'start_date'=>'required | date ',
            'end_date'=>'required | date | after:start_date',
            'status'=>'required',
        ];
    }
}
