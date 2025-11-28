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
import { Textarea } from '@/components/ui/textarea';
import { Project, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FilePenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { route } from 'ziggy-js';
import { showUpdatedToast } from '@/lib/utils';

type OptionType = {
    value: number;
    label: string;
};
interface EditProjectDialogProps {
    project: Project;
    employees: User[];
    clients: User[];
}

export default function EditProjectDialog({
    project,
    employees,
    clients,
}: EditProjectDialogProps) {
    const [open, setOpen] = useState(false);
    const test =2;
   
    const {
        data: formData,
        setData,
        put,
        processing,
        reset,
    } = useForm({
        _method: 'PUT',
        project_name: project.project_name,
        project_description: project.project_description,
        start_date: project.start_date,
        end_date: project.end_date,
        client_id: project.client_id ?? '',
        employee_ids: project.employees?.map((e) => e.id) ?? [],
    });

    useEffect(() => {
            if (project) {
                setData('project_name', project.project_name);
                setData('project_description', project.project_description);
                setData('start_date', project.start_date);
                setData('end_date', project.end_date);
                setData('client_id', project.client_id??'');
                setData('employee_ids', project.employees?.map((e) => e.id) ?? []);
            }
        }, [test,project, setData]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('projects.update', project.id), {
            onSuccess: () => {
                reset();
                showUpdatedToast('Project Updated Successfully');
                setOpen(false);
            },
        });
    };

    const employeeOptions: OptionType[] = employees.map((emp) => ({
        value: emp.id,
        label: emp.name,
    }));
    const clientOptions: OptionType[] = clients.map((cli) => ({
        value: cli.id,
        label: cli.name,
    }));

    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <div className="flex">
                    <FilePenLine /> Edit Project
                    </div>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <FilePenLine /> Edit Project
                    </DialogTitle>
                    <DialogDescription>
                        Update the project details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    
                    <Input
                        type="text"
                        value={formData.project_name}
                        onChange={(e) =>
                            setData('project_name', e.target.value)
                        }
                    />

                    <Textarea
                        value={formData.project_description}
                        onChange={(e) =>
                            setData('project_description', e.target.value)
                        }
                    />

                    <Input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                    />
                    <Input
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                    />

                    {/* Employees Multi Select */}
                    <Select
                        isMulti
                        options={employeeOptions}
                        value={employeeOptions.filter((o) =>
                            formData.employee_ids.includes(o.value),
                        )}
                        onChange={(selected) =>
                            setData(
                                'employee_ids',
                                selected.map((s) => s.value),
                            )
                        }
                    />

                    {/* Client Select */}
                    <Select
                        options={clientOptions}
                        value={
                            clientOptions.find(
                                (o) => o.value === formData.client_id,
                            ) ?? null
                        }
                        onChange={(selected) =>
                            setData('client_id', selected?.value ?? '')
                        }
                    />

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
