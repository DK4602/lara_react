import {
    DataDisplayComponent,
    DataDisplayComponentWithLink,
} from '@/components/dataDisplayComponent';
import AppLayout from '@/layouts/app-layout';
import { Project, Task, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ClipboardList, FolderRoot, User, Users } from 'lucide-react';
import ProjectBarChart from '../Charts/projectBarChart';
import UserPieCharts from '../Charts/userPieCharts';
import TaskpieCharts from '../Charts/taskpieCharts';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

interface barChartData {
    name: string;
    tasks: number;
}

export default function Dashboard({
    employeeCount,
    clientCount,
    taskCount,
    project,
    task,
    projectWithTasks,
}: {
    employeeCount: number;
    clientCount: number;
    taskCount: {
        ip_task: number;
        pending_task: number;
        completed_task: number;
    };
    project: Project[];
    task: Task[];
    projectWithTasks: barChartData[];
}) {
    const userData = {
        employees: employeeCount,
        clients: clientCount,
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mt-5 flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <DataDisplayComponentWithLink
                        page="employees"
                        borderColor="border-purple-100"
                        bgColor="bg-purple-200"
                        iconColor="text-purple-800"
                        icon={Users}
                        label="Total Employees"
                        data={employeeCount}
                    />

                    <DataDisplayComponentWithLink
                        page="clients"
                        borderColor="border-blue-100"
                        bgColor="bg-blue-200"
                        iconColor="text-blue-800"
                        icon={User}
                        label="Total Clients"
                        data={clientCount}
                    />

                    <DataDisplayComponentWithLink
                        page="projects"
                        borderColor="border-amber-100"
                        bgColor="bg-amber-200"
                        iconColor="text-amber-800"
                        icon={FolderRoot}
                        label="Total Projects"
                        data={project.length}
                    />

                    <DataDisplayComponent
                        borderColor="border-indigo-100"
                        bgColor="bg-indigo-200"
                        iconColor="text-indigo-800"
                        icon={ClipboardList}
                        label="Total Tasks"
                        data={task.length}
                    />
                </div>
                <div className="mt-10 flex justify-around">
                    <TaskpieCharts data={taskCount} />
                    <UserPieCharts data={userData} />
                </div>
                <div className="mt-10">
                    <ProjectBarChart data={projectWithTasks} />
                </div>
            </div>
        </AppLayout>
    );
}
