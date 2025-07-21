export interface TeamMember {
  _id?: string;
  id?: string | number;
  name: string;
  avatar: string;
}

export interface Task {
  _id?: string;
  id?: string | number;
  title: string;
  subtitle: string;
  priority: string;
  status: string;
  assignees: (string | number)[];
  comments: number;
  dueDate: string;
  completion: number;
}

export interface KanbanColumn {
  _id?: string;
  id?: string | number;
  name: string;
  tasks: Task[];
} 