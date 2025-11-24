// components/ProjectFormDialog.tsx
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
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { User} from '@/types';
import { FilePlus } from 'lucide-react';
import Select from 'react-select';
import { showAddedToast } from '@/lib/utils';
import { route } from 'ziggy-js';

interface AddProjectDialogProps {
    employees: User[];
    clients: User[];
}

type OptionType = {
    value: number;
    label: string;
};

export default function AddProjectDialog({employees, clients}: AddProjectDialogProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
    project_name: string;
    project_description: string;
    start_date: string;
    end_date: string;
    client_id: number | "";
    employee_ids: number[];
}>({
    project_name: '',
    project_description: '',
    start_date: '',
    end_date: '',
    client_id: '',
    employee_ids: [],   // 👈 important
});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                reset(); // reset form
                showAddedToast('Project Added Successfully');
                setOpen(false); // close dialog
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

   const employeeOptions: OptionType[] = employees.map(emp => ({
        value: emp.id,
        label: emp.name,
    }));

    const clientOptions: OptionType[] = clients.map(cli => ({
        value: cli.id,
        label: cli.name,
    }));
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'default'}><FilePlus/>Add Project</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle><div className="flex items-center"><FilePlus className="mr-3"/>Add New Project</div></DialogTitle>
                    <DialogDescription>
                        Fill in the project details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <Label className="mb-1 block text-base">
                            Project Name
                        </Label>
                        <Input
                            type="text"
                            value={data.project_name}
                            onChange={(e) =>
                                setData('project_name', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.project_name && (
                            <p className="text-sm text-red-500">
                                {errors.project_name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">
                            Description
                        </Label>
                        <Textarea
                            value={data.project_description}
                            onChange={(e) =>
                                setData('project_description', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.project_description && (
                            <p className="text-sm text-red-500">
                                {errors.project_description}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">
                            Start Date
                        </Label>
                        <Input
                            type="date"
                            
                            onChange={(e) =>
                                setData('start_date', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.project_name && (
                            <p className="text-sm text-red-500">
                                {errors.project_name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-1 block text-base">
                            Start Date
                        </Label>
                        <Input
                            type="date"
                            
                            onChange={(e) =>
                                setData('end_date', e.target.value)
                            }
                            className="w-full rounded border px-2 py-1"
                        />
                        {errors.project_name && (
                            <p className="text-sm text-red-500">
                                {errors.project_name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Employees</Label>
                        <Select<OptionType, true>
                            isMulti
                            options={employeeOptions}
                            onChange={(selected) => setData("employee_ids", selected.map(s => s.value))}
                        />
                        {errors.employee_ids && <p className="text-sm text-red-500">{errors.employee_ids}</p>}
                    </div>

                    <div>
                        <Label>Client</Label>
                        <Select<OptionType>
                            options={clientOptions}
                            onChange={(selected) => setData("client_id", selected?.value ?? "")}
                        />
                        {errors.client_id && <p className="text-sm text-red-500">{errors.client_id}</p>}
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
