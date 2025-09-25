import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Finish technical assessment",
    description:
      "Complete the React + TypeScript + Tailwind test within 60 minutes",
    priority: "High",
    completed: false,
    dueDate: "2025-09-30",
  },
  {
    id: "2",
    title: "Update project documentation",
    description: "Add details about the new API endpoints and usage examples",
    priority: "Medium",
    completed: true,
    dueDate: "2025-10-05",
  },
  {
    id: "3",
    title: "Team meeting",
    description: "Discuss progress on sprint tasks and blockers",
    priority: "Low",
    completed: false,
    dueDate: "2025-09-28",
  },
];
