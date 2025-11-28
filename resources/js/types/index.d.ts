import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    //relations
    projects_by_employee: Project[];
    projects_by_client?: Project[];
    // This allows for additional properties...
}

export interface Project {
    id: number;
    project_name: string;
    project_description: string;
    start_date: string;
    end_date: string; 
    client_id: number | null; // This allows for additional properties...
    //relations 
    tasks?: Task[];
    employees?: (User & { pivot?: ProjectUserPivot })[];
    client?: User | null;
}

export interface Task {
    id: number;
    employee_id: number | null;
    task_name: string;
    task_description: string;
    status: string;
    start_date: string; 
    end_date: string;
    project_id: number | null; 
    project?: Project; // This allows for additional properties...
}

export type Paginated<T> = {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  links: {
    label: string;
    url: string | null;
    active: boolean;
  }[];
}

export interface ProjectUserPivot {
  project_id: number;
  user_id: number;
}


export interface ProjectIndexProps{
    data: Paginated<Project>;
    employee: User;
    client: User;
}

export interface PermissionMap {
  [key: string]: boolean;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Auth {
  user: AuthUser;
  permissions: PermissionMap;
}
