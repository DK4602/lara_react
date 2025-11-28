import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Project, User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AddUserDialog from '../User/addUserDialog';
import DeleteUserButton from '../../components/deleteButton';
import EditUserDialog from '../User/editUserDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: route('clients.index'),
    },
];

export default function getClients({ data }: {data:User[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex justify-between items-center mt-5">
            <div className="text-2xl font-semibold">
            Clients
            </div>
            <AddUserDialog role='clients'/>
            </div>
            <Table className="max-w-screen mb-5">
                <TableHeader>
                    <TableRow>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Client Email</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead colSpan={2} className='text-center'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>
                                <ul className="list-disc list-inside">
                                {client.projects_by_client
                                    .map((project : Project) =>
                                        <li key={project.id}>
                                            <Link href={route('projects.show', project.id)}>
                                                {project.project_name}
                                            </Link>
                                        </li>
                                    )}
                                    </ul>
                            </TableCell>
                            <TableCell>
                                <EditUserDialog userData={client} role='clients'/>
                            </TableCell>
                            <TableCell>
                                <DeleteUserButton id={client.id} type='clients'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
