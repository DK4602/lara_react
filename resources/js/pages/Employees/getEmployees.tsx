import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Project, User, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AddUserDialog from '../User/addUserDialog';
import EditUserDialog from '../User/editUserDialog';
import DeleteUserButton from '../../components/deleteButton';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: route('employees.index'),
    },
];

export default function getEmployees({ data }: {data:User[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex justify-between items-center mt-5">
            <div className="text-2xl font-semibold">
            Employees
            </div>
            <AddUserDialog role='employees'/></div>
            <Table className="max-w-screen mb-5">
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Employee Email</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead colSpan={2} className='text-center'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>
                                <ul className="list-disc list-inside">
                                {employee.projects_by_employee
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
                                <EditUserDialog userData={employee} role='employees'/>
                            </TableCell>
                            <TableCell>
                                <DeleteUserButton id={employee.id} type='employees'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
