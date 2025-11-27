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
import { showAddedToast } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function AddUserDialog({role}:{role:string}) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // 👈 important
    });
    const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();
    const Capitalize_role = capitalize(role);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route(`${role}.store`), {
            onSuccess: () => {
                reset(); // reset form
                showAddedToast(` ${Capitalize_role} Added Successfully`);
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
                    <UserRoundPlus />
                    Add {Capitalize_role}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            <UserRoundPlus className="mr-3" />
                            Add {Capitalize_role}
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the {Capitalize_role} details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    {errors.password_confirmation && (
                            <p className="text-sm text-red-500">
                                {errors.password_confirmation}
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
