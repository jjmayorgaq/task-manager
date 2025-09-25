export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  dueDate: string;
}
