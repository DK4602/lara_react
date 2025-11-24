import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CircleAlert, Trash } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';
import { showDeletedToast } from '@/lib/utils';

export default function DeleteProjectButton({ id }: { id: number }) {
    const handleDelete = () => {
        router.delete(route('projects.destroy', id), {
            onSuccess: () => {
                setOpen(false);
                showDeletedToast('Project Deleted Successfully');}
                 // close dialog after delete
        });
    };
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className='hover:cursor-pointer'>
                    <Trash className="mr-2 h-4 w-4 " />
                    Delete Project
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Are you sure?
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col py-4">
                    <div className="flex justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }} // expand → shrink back
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <CircleAlert size={60} className="text-red-500" />
                        </motion.div>
                    </div>
                    <span className="mt-6 text-center">
                        Are you sure you want to delete this project?
                    </span>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" className='hover:cursor-pointer' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" className='hover:cursor-pointer' onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
