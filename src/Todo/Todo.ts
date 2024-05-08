
export interface Task {
    id: number;
    name: string;
    isDone: boolean;
}

export interface TaskList {
    tasks: Task[];
}
