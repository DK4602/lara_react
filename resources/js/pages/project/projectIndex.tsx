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
import { Paginated, Project, User,AuthType, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AddProjectDialog from './addProjectDialog';
import DeleteProjectButton from './deleteProjectButton';
import EditProjectDialog from './editProjectDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function ProjectIndex() {
    const { data, employee, client } = usePage<{
        data: Paginated<Project>;
        employee: User[];
        client: User[];
    }>().props;
    const { auth } = usePage<{ auth: AuthType }>().props;
    const startNo = (data.current_page - 1) * data.per_page + 1;

    const pendingTasks = (data: Project) => {
        return (
            data.tasks?.filter((task) => task.status === 'pending').length ?? 0
        );
    };
    const inprogressTasks = (data: Project) => {
        return (
            data.tasks?.filter((task) => task.status === 'in_progress')
                .length ?? 0
        );
    };
    const completedTasks = (data: Project) => {
        return (
            data.tasks?.filter((task) => task.status === 'completed').length ??
            0
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mt-5">
                <Head title="Projects" />
                <div className="flex justify-between">
                    <h1 className="my-4 text-2xl font-semibold">Projects</h1>
                    <AddProjectDialog employees={employee} clients={client} />
                </div>
                <Table className="max-w-screen">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            {(auth.permissions?.isAdmin ||
                                auth.permissions?.isClient) && (
                                <TableHead>Employee</TableHead>
                            )}
                            {(auth.permissions?.isAdmin ||
                                auth.permissions?.isEmployee) && (
                                <TableHead>Client</TableHead>
                            )}
                            <TableHead>Total Tasks</TableHead>
                            {(auth.permissions?.isAdmin ||
                                auth.permissions?.isEmployee) && (
                                 <TableHead colSpan={2} className="text-center">
                                Actions
                            </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data?.map((project, index) => (
                            <TableRow key={project.id}>
                                <TableCell>{index + startNo}</TableCell>
                                <TableCell className="font-medium">
                                    <Link href={`/projects/${project.id}`}>
                                        {project.project_name}
                                    </Link>
                                </TableCell>
                                <TableCell className="max-w-xl font-medium break-words whitespace-normal">
                                    {project.project_description}
                                </TableCell>
                                {(auth.permissions?.isAdmin ||
                                    auth.permissions?.isClient) && (
                                    <TableCell>
                                        {project.employees?.length ? (
                                            <ul>
                                                {project.employees.map(
                                                    (emp) => (
                                                        <li key={emp.id}>
                                                            {emp.name}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            'N/A'
                                        )}
                                    </TableCell>
                                )}

                                {(auth.permissions?.isAdmin ||
                                    auth.permissions?.isEmployee) && (
                                    <TableCell>
                                        {project.client?.name ?? 'N/A'}
                                    </TableCell>
                                )}
                                <TableCell className="text-center">
                                    <div className="flex flex-col">
                                        <span>
                                            <PendingBadge
                                                data={`Pending: ${pendingTasks(project)}`}
                                            />
                                        </span>

                                        <span>
                                            <InprogressBadge
                                                data={`In Progress: ${inprogressTasks(project)}`}
                                            />
                                        </span>
                                        <span>
                                            <CompletedBadge
                                                data={`Completed: ${completedTasks(project)}`}
                                            />
                                        </span>
                                    </div>
                                </TableCell>
                                {(auth.permissions?.isAdmin || auth.permissions?.isEmployee)&& (
                                <TableCell>
                                    <EditProjectDialog
                                        project={project}
                                        employees={employee}
                                        clients={client}
                                    />
                                </TableCell>    
                                )}
    
                                {(auth.permissions?.isAdmin)&& (
                                <TableCell>
                                    <DeleteProjectButton id={project.id} />
                                </TableCell>
                                )}
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
