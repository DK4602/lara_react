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

export default function EditEmployeeDialog({ userData, role }: { userData: User; role: string }) {
    const [open, setOpen] = useState(false);

    

    const { data, setData, put, processing, errors, reset } = useForm<{
        id: number;
        name: string;
        email: string;
       
    }>({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        // 👈 important
    });

    useEffect(() => {
    if (userData) {
        setData('id', userData.id);
        setData('name', userData.name);
        setData('email', userData.email);
    }
}, [userData, setData]);

    const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    const Capitalize_role = capitalize(role);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route(`${role}.update`, userData.id), {
            onSuccess: () => {
                reset(); // reset form
                showUpdatedToast(`${Capitalize_role} Updated Successfully`);
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
                    Edit {Capitalize_role}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            <UserRoundCog className="mr-3" />
                            Edit {Capitalize_role}
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the {Capitalize_role} details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <Input type="hidden" name="id" value={data.id} />
                    <Label>{Capitalize_role} Name</Label>
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
                    <Label>{Capitalize_role} Email</Label>
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
