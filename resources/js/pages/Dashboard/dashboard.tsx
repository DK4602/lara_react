import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Project, Task, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, FolderRoot, User, Users } from 'lucide-react';
import { route } from 'ziggy-js';
import PieCharts from '../Charts/taskpieCharts';
import UserPieCharts from '../Charts/userPieCharts';
import ProjectBarChart from '../Charts/projectBarChart';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface barChartData{
    name: string;
    tasks: number;
}

export default function Dashboard({
    employeeCount, clientCount, taskCount, project, task,projectWithTasks
}:{
    employeeCount: number;
    clientCount: number;
    taskCount: {ip_task:number; pending_task:number; completed_task:number};
    project: Project[];
    task: Task[];
    projectWithTasks: barChartData[];
}) {

    const userData ={
        employees: employeeCount,
        clients: clientCount,
    } 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex mt-5 h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <Link href={route('employees.index')} className="flex flex-col items-center bg-purple-200 border border-purple-100 shadow-md rounded-2xl h-50 w-1/5">
                        <Users className="m-5 p-3 h-35 w-35 text-purple-800  rounded-3xl" />
                        <div className="mb-5 text-lg font-semibold text-gray-700">Total Employees : {employeeCount}</div>
                    </Link>

                    <Link href={route('clients.index')} className="flex flex-col items-center bg-cyan-100 border border-cyan-50 shadow-md rounded-2xl h-50 w-1/5">
                        <User className="m-5 p-3 h-35 w-35 text-cyan-700  rounded-3xl" />
                        <div className="mb-5 text-lg font-semibold text-gray-700">Total Clients : {clientCount}</div>
                    </Link>

                    <Link href={route('projects.index')} className="flex flex-col items-center bg-amber-100 border border-amber-50 shadow-md rounded-2xl h-50 w-1/5">
                        <FolderRoot className="m-5 p-3 h-35 w-35 text-amber-700  rounded-3xl" />
                        <div className="mb-5 text-lg font-semibold text-gray-700">Total Projects : {project.length}</div>
                    </Link>

                    <Link href={route('tasks.index')} className="flex flex-col items-center bg-indigo-100 border border-indigo-50 shadow-md rounded-2xl h-50 w-1/5">
                        <ClipboardList className="m-5 p-3 h-35 w-35 text-indigo-700  rounded-3xl" />
                        <div className="mb-5 text-lg font-semibold text-gray-700">Total Tasks : {task.length}</div>
                    </Link>
                </div>
                <div className=" flex justify-around mt-10">
                <PieCharts data={taskCount}/>
                <UserPieCharts data={userData}/>
                </div>
                <div className="mt-10">
                <ProjectBarChart data={projectWithTasks}/>
                </div>
            </div>
        </AppLayout>
    );
}
