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
import { showUpdatedToast } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { UserRoundCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function EditEmployeeDialog({ employee }: { employee: User }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
    if (employee) {
        setData('id', employee.id);
        setData('name', employee.name);
        setData('email', employee.email);
    }
}, [employee]);

    const { data, setData, put, processing, errors, reset } = useForm<{
        id: number;
        name: string;
        email: string;
       
    }>({
        id: employee.id,
        name: employee.name,
        email: employee.email,
        // 👈 important
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id), {
            onSuccess: () => {
                reset(); // reset form
                showUpdatedToast('Employee Updated Successfully');
                setOpen(false); // close dialog
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'default'}>
                    <UserRoundCog />
                    Edit Employee
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            <UserRoundCog className="mr-3" />
                            Edit Employee
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the Employee details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <Input type="hidden" name="id" value={data.id} />
                    <Label>Employee Name</Label>
                    <Input 
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    <Label>Employee Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {setOpen(false)
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
