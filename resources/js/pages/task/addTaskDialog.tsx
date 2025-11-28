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
import { showAddedToast } from '@/lib/utils';
import { Project,  } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FilePlusIcon } from 'lucide-react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';
import React, { useState, } from 'react';
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
export default function AddTaskDialog({
    project,

}: {
    project: Project;
   
}) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm<{
        project_id: number;
        task_name: string;
        task_description: string;
        start_date: string;
        end_date: string;
        employee_id: number | null; // ✅ allow null
        status: string;
    }>({
        project_id:"",
        task_name: "",
        task_description: "",
        start_date: "",
        end_date: "",
        employee_id: auth.user.id, // ✅ null if undefined
        status: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                reset(); // reset form
                showAddedToast('Task Added Successfully');
                setOpen(false); // close dialog
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const projectOptions: OptionType[] =
        project?.map((emp) => ({
            value: emp.id,
            label: emp.project_name,
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
                    <FilePlusIcon />
                    Add Task
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            <FilePlusIcon className="mr-3" />
                            Add Task
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the Task details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <Input type="hidden" value={auth?.user?.id} name="employee_id" />
                    <div>
                        <Label className="mb-1 block text-base">
                            Task Name
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

                        {errors.status && (
                            <p className="text-sm text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Project</Label>
                        <Select
                            name="project_id"
                            options={projectOptions}
                            value={
                                projectOptions.find(
                                    (opt) => opt.value === data.project_id,
                                ) || null
                            }
                            onChange={(selected) =>
                                setData('project_id', selected?.value ?? '')
                            }
                        />

                        {errors.project_id && (
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
