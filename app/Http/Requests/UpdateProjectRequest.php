<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_name'=>'required',
            'project_description'=>'required',
            'start_date'=>'required|date',
            'end_date'=>'required|date|after:start_date',
            'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:users,id',
            'client_id'=>'required',
        ];
    }

     public function messages(): array
    {
        return [
            'employee_id.required' => 'The employee is required.',
            'end_date.after' => 'The end date must be after the start date.',
            'project_name.required' => 'Please provide a task name.',
            'start_date.required' => 'Start date is mandatory.',
        ];
    }
}
