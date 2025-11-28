import { Link } from '@inertiajs/react';

import { LucideIcon } from 'lucide-react';
import { route } from 'ziggy-js';

export function DataDisplayComponentWithLink({
    page,
    borderColor,
    bgColor,
    iconColor,
    icon: Icon,
    label,
    data,
}: {
    page: string;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    icon: LucideIcon;
    label: string;
    data: number;
}) {
    return (
        <Link
            href={route(`${page}.index`)}
            className={`flex h-50 w-1/5 flex-col items-center rounded-2xl border border-${borderColor}-100 ${bgColor} shadow-md transition hover:scale-105`}
        >
            <Icon className={`m-5 h-35 w-35 rounded-3xl p-3 ${iconColor}`} />
            <div className="mb-5 text-lg font-semibold text-gray-700">
                {label} : {data}
            </div>
        </Link>
    );
}


export  function DataDisplayComponent({
    borderColor,
    bgColor,
    iconColor,
    icon: Icon,
    label,
    data,
}:{borderColor: string;
    bgColor: string;
    iconColor: string;
    icon: LucideIcon;
    label: string;
    data: number;
})
{
    return (
        <div
            className={`flex h-50 w-1/5 flex-col items-center rounded-2xl border ${borderColor} ${bgColor} shadow-md transition hover:scale-105`}
        >
            <Icon className={`m-5 h-35 w-35 rounded-3xl p-3 ${iconColor}`} />
            <div className="mb-5 text-lg font-semibold text-gray-700">
                {label} : {data}
            </div>
        </div>
    );
}
