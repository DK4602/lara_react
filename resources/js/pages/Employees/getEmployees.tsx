import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Project, User, type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AddEmployeeDialog from './addEmployeeDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: route('employees.index'),
    },
];

export default function getEmployees({ data }: {data:User[]}) {
    console.log(data)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex justify-between items-center mt-5">
            <div className="text-2xl font-semibold">
            Employees
            </div>
            <AddEmployeeDialog/></div>
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
                                <Button variant="outline">Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button className='mr-5' variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
