import CompletedBadge from '@/components/completedBadge';
import InprogressBadge from '@/components/inprogressBadge';
import PendingBadge from '@/components/pendingBadge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {  Project, Task, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import TaskAddDialog from './EditTask/taskAddDialog';
// import TaskEditDialog from '../task/taskEditDialog';
import DeleteTaskButton from './EditTask/deleteTaskButton';
import TaskEditDialog from './EditTask/taskEditDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project',
        href: '/projects',
    },
];
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));


export default function GetProject() {
    const { data, tasks } = usePage<{
        data: Project;
        tasks:Task
    }>().props;
    const { auth } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            
            <Head title="Project" />
            <div className="flex flex-col items-center">
            <div className="flex justify-between">
                <Card className="mx-2 my-5 w-1/2">
                    <CardHeader className="text-center text-2xl">
                        <CardTitle>{data.project_name}</CardTitle>
                    </CardHeader>
                    <CardDescription className="px-5 text-lg">
                        {data.project_description}
                    </CardDescription>
                </Card>
                <div className="my-5 flex flex-col">
                    <Card className="min-w-xl">
                        <CardContent>
                            <ul>
                                <li>Client : {data.client.name}</li>
                                <li>
                                    Employee :{' '}
                                    {data.employees
                                        .map((employee) => employee.name)
                                        .join(' | ')}
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="mt-3">
                        <CardContent>
                            <ul>
                                <li>Start Date : {formatDate(data.start_date)}</li>
                                <li>End Date : {formatDate(data.end_date)}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card className="w-full px-5">
                <CardHeader className='text-xl font-semibold'>
                    <div className="flex justify-between">
                    <p>Tasks</p>
                    {(auth.permissions?.isAdmin || auth.permissions?.isEmployee)&&(
                        <TaskAddDialog task={data}/>
                    )}
                    </div>
                </CardHeader>
                
                    {
                        tasks.map((task)=>
                            <Card className='my-2'>
                                <CardHeader>
                                    <div className="flex justify-between">
                                    {task.task_name}
                                    <div className="">
                                    {task.status =='pending' ? <PendingBadge data='Pending'/>:''}
                                    {task.status =='in_progress' ? <InprogressBadge data='In Progress'/>:''}
                                    {task.status =='completed' ? <CompletedBadge data='Compeleted'/>:''}
                                    </div>
                                    </div>
                                </CardHeader>
                                <CardDescription className='px-6'>
                                    {task.task_description}
                                </CardDescription>
                                <CardContent>
                                    <div className="flex flex-col mx-5">
                                    <div className="text-xs text-gray-500">
                                    <ul>
                                        <li>
                                           Start Date: {formatDate(task.start_date)}
                                        </li>
                                        <li>
                                           End Date: {formatDate(task.end_date)}
                                        </li>
                                    </ul>
                                    </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full flex justify-between">
                                        <div className="mt-2 text-sm text-gray-700">
                                            Assigned to : {task.user?.name}
                                        </div>
                                    <div className="flex gap-3">
                                        {(auth.permissions?.isAdmin || auth.permissions?.isEmployee) &&(
                                        <TaskEditDialog key={task.id} task={task} project={data}/>
                                        )}
                                        {auth.permissions?.isAdmin &&(
                                        <DeleteTaskButton id={task.id}/>
                                        )}
                                    </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    }
                    
                
            </Card>
            </div>
        </AppLayout>
    );
}
