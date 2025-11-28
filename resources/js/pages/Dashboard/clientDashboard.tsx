import { DataDisplayComponent, DataDisplayComponentWithLink } from '@/components/dataDisplayComponent'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, User } from '@/types'
import { Head } from '@inertiajs/react'
import { CircleCheckBig, ClipboardList, FolderRoot } from 'lucide-react'
import React from 'react'
import { route } from 'ziggy-js'
import TaskpieCharts from '../Charts/taskpieCharts'
import VerticalProjectBarChart from '../Charts/verticalProjectBarChart'

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

export default function ClientDashboard({
    project,
    task,
    complete_percent,
    taskStatus,
    projectWithTasks
}:{
    project: User;   // FIXED (not array)
    task: User;      // FIXED (not array)
    complete_percent: number;
    taskStatus: {
        ip_task: number;
        pending_task: number;
        completed_task: number;
    };
    projectWithTasks: barChartData[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mt-5 flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">

                {/* TOP STATS */}
                <div className="flex justify-between">

                    <DataDisplayComponentWithLink
                        page="projects"
                        borderColor="border-amber-100"
                        bgColor="bg-amber-200"
                        iconColor="text-amber-800"
                        icon={FolderRoot}
                        label="Total Projects"
                        data={project?.projects_by_client?.length ?? 0}   // FIXED
                    />

                    <DataDisplayComponentWithLink
                        page="tasks"
                        borderColor="border-indigo-100"
                        bgColor="bg-indigo-200"
                        iconColor="text-indigo-800"
                        icon={ClipboardList}
                        label="Total Tasks"
                        data={task?.tasks_by_client?.length ?? 0}   // FIXED
                    />

                    <DataDisplayComponent
                        borderColor="border-green-100"
                        bgColor="bg-green-200"
                        iconColor="text-green-800"
                        icon={CircleCheckBig}
                        label="Completion Percentage"
                        data={Math.round(complete_percent)}
                    />
                </div>

                {/* CHARTS */}
                <div className="mt-10 flex justify-around">
                    <TaskpieCharts data={taskStatus} />
                    <VerticalProjectBarChart data={projectWithTasks} />
                </div>
            </div>
        </AppLayout>
    )
}
