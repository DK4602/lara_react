import CompletedBadge from '@/components/completedBadge';
import InprogressBadge from '@/components/inprogressBadge';
import PendingBadge from '@/components/pendingBadge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Paginated, Project, Task } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AddTaskDialog from './addTaskDialog';
import EditTaskDialog from './editTaskDialog';
import DeleteButton from '@/components/deleteButton';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

const badge = (status: string) => {
    switch (status) {
        case 'pending':
            return <PendingBadge data="Pending" />;
        case 'in_progress':
            return <InprogressBadge data="In Progress" />;
        case 'completed':
            return <CompletedBadge data="Completed" />;
        default:
            return 'default';
    }
};

export default function GetTasks({
    data,
    project,
}: {
    data: Paginated<Task> | [];
    project: Project;
})  {

     const startNo = (data.current_page - 1) * data.per_page + 1;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mt-5">
                <Head title="Tasks" />
                <div className="flex justify-between">
                    <h1 className="my-4 text-2xl font-semibold">Tasks</h1>
                    <AddTaskDialog project={project} />
                </div>
                <Table className="max-w-screen">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Task Name</TableHead>
                            <TableHead>Task Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead colSpan={2} className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((task: Task, index) => (
                            <TableRow key={task.id}>
                                <TableCell>{index + startNo}</TableCell>
                                <TableCell>{task.task_name}</TableCell>
                                <TableCell className="max-w-xl font-medium break-words whitespace-normal">
                                    {task.task_description}
                                </TableCell>
                                <TableCell>{badge(task.status)}</TableCell>
                                <TableCell>
                                    {task.project?.project_name}
                                </TableCell>
                                <TableCell>
                                    <EditTaskDialog
                                        task={task}
                                        project={project}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DeleteButton id={task.id} type="tasks" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="my-5 flex items-center justify-end gap-2">
                    {data.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`rounded-md border px-3 py-1 ${link.active ? 'bg-primary text-white' : 'bg-muted hover:bg-accent'} ${!link.url ? 'cursor-not-allowed opacity-50' : ''} `}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
