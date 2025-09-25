import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@/shared/types/task";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
}

export function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onToggle,
  onView,
}: TaskTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No tasks found
            </TableCell>
          </TableRow>
        ) : (
          tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="text-center">
                <Badge
                  className={
                    task.completed
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }
                  onClick={() => onToggle(task.id)}
                >
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell
                className={
                  task.completed ? "line-through text-muted-foreground" : ""
                }
              >
                {task.title}
              </TableCell>
              <TableCell>
                <Badge>{task.priority}</Badge>
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(task.id)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
