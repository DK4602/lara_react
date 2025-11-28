import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Project, Task, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useCallback, useMemo, useState } from 'react';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project',
        href: '/projects',
    },
];

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date));

type StatusOption = {
    value: string;
    label: string;
};

const STATUS_OPTIONS: StatusOption[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
];

export default function ManageMultitask() {
    const { data, tasks: initialTasks } = usePage<{
        data: Project;
        tasks: Task[];
    }>().props;

    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);

    // Memoize employee options with null checking
    const employeeOptions = useMemo(
        () =>
            (data?.employees || []).map((emp) => ({
                value: emp.id,
                label: emp.name,
            })),
        [data?.employees]
    );

    // Memoize formatted dates with null checking
    const formattedStartDate = useMemo(
        () => (data?.start_date ? formatDate(data.start_date) : 'N/A'),
        [data]
    );
    
    const formattedEndDate = useMemo(
        () => (data?.end_date ? formatDate(data.end_date) : 'N/A'),
        [data]
    );

    // Memoize employee names string with null checking
    const employeeNames = useMemo(
        () => (data?.employees || []).map((employee) => employee.name).join(' | ') || 'None',
        [data?.employees]
    );

    // Optimize input handler with useCallback
    const handleChange = useCallback((index: number, field: string, value: string | number) => {
        setTasks((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }, []);

    // Optimize delete handler
    const deleteTask = useCallback((index: number) => {
        setTasks((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], _delete: true };
            return updated;
        });
    }, []);

    // Optimize add task handler
    const addNewTask = useCallback(() => {
        setTasks((prev) => [
            ...prev,
            {
                id: null,
                task_name: '',
                task_description: '',
                status: 'pending',
                project_id: data?.id,
                employee_id: null,
                start_date: '',
                end_date: '',
                _new: true,
                _delete: false,
            } as Task,
        ]);
    }, [data?.id]);

    // Optimize save handler
    const saveChanges = useCallback(() => {
    if (!data?.id) return;

    const payload = tasks.map(task => ({
        id: task.id,
        task_name: task.task_name,
        task_description: task.task_description,
        status: task.status,
        project_id: task.project_id,
        employee_id: task.employee_id,
        start_date: task.start_date || null,
        end_date: task.end_date || null,
        _new: task._new || false,
        _delete: task._delete || false,
    }));

    router.post(`/tasks/${data.id}/sync`, { tasks: payload });
    setTasks(prev => prev.filter(task => !task._delete));
}, [data, tasks]);

    if (!data) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Project" />
                <div className="flex items-center justify-center p-8">
                    <p>Loading project data...</p>
                </div>
            </AppLayout>
        );
    }

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
                                    <li>Client: {data.client?.name || 'N/A'}</li>
                                    <li>Employee: {employeeNames}</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="mt-3">
                            <CardContent>
                                <ul>
                                    <li>Start Date: {formattedStartDate}</li>
                                    <li>End Date: {formattedEndDate}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card className="w-full px-5">
                    <CardHeader className="flex justify-between text-xl font-semibold">
                        <p>Tasks</p>
                    </CardHeader>

                    {tasks.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No tasks yet. Click "Add New Task" to create one.
                        </div>
                    ) : (
                        tasks.map((task, index) => (
                            <TaskCard
                                key={task.id || `new-${index}`}
                                task={task}
                                index={index}
                                statusOptions={STATUS_OPTIONS}
                                employeeOptions={employeeOptions}
                                handleChange={handleChange}
                                deleteTask={deleteTask}
                            />
                        ))
                    )}

                    <div className="flex justify-between p-4">
                        <Button onClick={addNewTask}>+ Add New Task</Button>
                        <Button className="px-6" onClick={saveChanges}>
                            Save All Changes
                        </Button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}

// Extract TaskCard as separate memoized component
const TaskCard = React.memo<{
    task: Task;
    index: number;
    statusOptions: StatusOption[];
    employeeOptions: { value: number; label: string }[];
    handleChange: (index: number, field: string, value: string | number) => void;
    deleteTask: (index: number) => void;
}>(({ task, index, statusOptions, employeeOptions, handleChange, deleteTask }) => {
    const selectedStatus = useMemo(
        () => statusOptions.find((opt) => opt.value === task.status),
        [statusOptions, task.status]
    );

    const selectedEmployee = useMemo(
        () => employeeOptions.find((opt) => opt.value === task.employee_id) ?? null,
        [employeeOptions, task.employee_id]
    );

    return (
        <Card className={`my-2 ${task._delete ? 'line-through opacity-40' : ''}`}>
            <CardHeader>
                <div className="flex items-center justify-between gap-3">
                    <Input
                        type="text"
                        className="w-3/4"
                        value={task.task_name || ''}
                        onChange={(e) => handleChange(index, 'task_name', e.target.value)}
                        disabled={task._delete}
                    />

                    <Select
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={(selected) =>
                            handleChange(index, 'status', selected?.value ?? '')
                        }
                        isDisabled={task._delete}
                    />
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-2">
                    <Textarea
                        value={task.task_description || ''}
                        className="w-full"
                        onChange={(e) =>
                            handleChange(index, 'task_description', e.target.value)
                        }
                        disabled={task._delete}
                    />
                    <div className="flex justify-between gap-3">
                    <Select
                        className="w-full"
                        options={employeeOptions}
                        value={selectedEmployee}
                        onChange={(selected) =>
                            handleChange(index, 'employee_id', selected?.value ?? '')
                        }
                        isDisabled={task._delete}
                        placeholder="Select employee..."
                    />
                    <Input
                        type="date"
                        className="w-full"
                        value={task.start_date ? task.start_date.slice(0, 10) : ''}
                        onChange={(e) => handleChange(index, 'start_date', e.target.value)}
                        disabled={task._delete}
                    />
                    <Input
                        type="date"
                        className="w-full"
                        value={task.end_date ? task.end_date.slice(0, 10) : ''}
                        onChange={(e) => handleChange(index, 'end_date', e.target.value)}
                        disabled={task._delete}
                    />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button 
                    variant="destructive" 
                    onClick={() => deleteTask(index)}
                    disabled={task._delete}
                >
                    {task._delete ? 'Marked for Deletion' : 'Delete'}
                </Button>
            </CardFooter>
        </Card>
    );
});

