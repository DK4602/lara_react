import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showUpdatedToast } from '@/lib/utils';
import { Project, Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { FilePenLine } from 'lucide-react';
import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import { route } from 'ziggy-js';

type OptionType = {
    value: number;
    label: string;
};

type StatusOption = {
    value: string;
    label: string;
};
export default function TaskEditDialog({
    task,
    project,
}: {
    task: Task;
    project: Project;
}) {
    console.log(task);
    const [open, setOpen] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm<{
        project_id: number;
        task_name: string;
        task_description: string;
        start_date: string;
        end_date: string;
        employee_id: number | null; // ✅ allow null
        status: string;
    }>({
        project_id: task.project_id,
        task_name: task.task_name,
        task_description: task.task_description,
        start_date: task.start_date,
        end_date: task.end_date,
        employee_id: task.employee_id ?? null, // ✅ null if undefined
        status: task.status,
    });

    useEffect(() => {
        setData('project_id', task.project_id);
        setData('task_name', task.task_name);
        setData('task_description', task.task_description);
        setData('start_date', task.start_date);
        setData('end_date', task.end_date);
        setData('employee_id', task.employee_id ?? null); // ✅ null if undefined
        setData('status', task.status);
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('tasks.update', task.id), {
            onSuccess: () => {
                reset(); // reset form
                showUpdatedToast('Task Added Successfully');
                setOpen(false); // close dialog
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const employeeOptions: OptionType[] =
        project?.employees?.map((emp) => ({
            value: emp.id,
            label: emp.name,
        })) ?? [];
    const statusOptions: StatusOption[] = [
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'default'}>
                    <FilePenLine />
                    Edit Task
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            <FilePenLine className="mr-3" />
                            Edit Task
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the Task details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <Input type="hidden" value={task.id} name="task_id" />
                    <div>
                        <Label className="mb-1 block text-base">
                            task Name
                        </Label>
                        <Input
                            type="text"
                            value={data.task_name}
                            onChange={(e) =>
                                setData('task_name', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.task_name && (
                            <p className="text-sm text-red-500">
                                {errors.task_name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">
                            Description
                        </Label>
                        <Textarea
                            value={data.task_description}
                            onChange={(e) =>
                                setData('task_description', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.task_description && (
                            <p className="text-sm text-red-500">
                                {errors.task_description}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">
                            Start Date
                        </Label>
                        <Input
                            type="date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData('start_date', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.start_date && (
                            <p className="text-sm text-red-500">
                                {errors.start_date}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">End Date</Label>
                        <Input
                            type="date"
                            value={data.end_date}
                            onChange={(e) =>
                                setData('end_date', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.end_date && (
                            <p className="text-sm text-red-500">
                                {errors.end_date}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Status</Label>
                        <Select
                            name="status"
                            options={statusOptions}
                            value={
                                statusOptions.find(
                                    (opt) => opt.value === data.status,
                                ) || null
                            }
                           onChange={(selected) => setData('status', selected?.value ?? '')}

                        />

                        {errors.employee_id && (
                            <p className="text-sm text-red-500">
                                {errors.employee_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Employees</Label>
                        <Select
                            name="employee_id"
                            options={employeeOptions}
                            value={
                                employeeOptions.find(
                                    (opt) => opt.value === data.employee_id,
                                ) || null
                            }
                            onChange={(selected) =>
                                setData('employee_id', selected?.value ?? '')
                            }
                        />

                        {errors.employee_id && (
                            <p className="text-sm text-red-500">
                                {errors.employee_id}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
