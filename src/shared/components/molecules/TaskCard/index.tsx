import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/shared/types/task";
import { useEffect, useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void; 
  onBack: () => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggle,
  onBack,
}: TaskCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const onPressToggleAndBack = () => {
    onToggle(task.id);
    onBack();
  };

  return (
    <Card
      className={`p-4 space-y-4 transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {task.title}
          <div className="flex gap-2 items-center">
            <Badge
              className={
                task.completed
                  ? "bg-green-600 text-white"
                  : "bg-gray-500 text-white"
              }
            >
              {task.completed ? "Completed" : "Pending"}
            </Badge>
            <Badge>{task.priority}</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p>{task.description}</p>
        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>

        <div className="flex gap-2 flex-wrap">
          <Button
            className="text-white"
            variant={task.completed ? "secondary" : "default"}
            onClick={onPressToggleAndBack}
          >
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>

          <Button variant="outline" onClick={() => onEdit(task.id)}>
            Edit
          </Button>

          <Button variant="destructive" onClick={() => onDelete(task.id)}>
            Delete
          </Button>

          <Button variant="secondary" onClick={onBack}>
            Go back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}