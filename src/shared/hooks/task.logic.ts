import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { storage } from "@/core/libraries-impl/storage/storage.impl";

const STORAGE_KEY = "tasks";

export const useTaskLogic = () => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    storage.get<Task[]>(STORAGE_KEY, [])
  );
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    storage.set<Task[]>(STORAGE_KEY, tasks);
  }, [tasks]);

  const onPressEdit = (id: string) => {
    const taskToEdit = tasks.find((t) => t.id === id) || null;
    setEditingTask(taskToEdit);
    setSelectedTask(null);
    setShowForm(true);
  };

  const onPressDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  };

  const onPressToggle = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSubmit = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
    setShowForm(false);
  };

  const onPressView = (id: string) => {
    const taskToView = tasks.find((t) => t.id === id) || null;
    setSelectedTask(taskToView);
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return {
    onPressEdit,
    onPressDelete,
    onPressToggle,
    handleSubmit,
    onPressView,
    setSearch,
    setEditingTask,
    setSelectedTask,
    setShowForm,
    showForm,
    search,
    editingTask,
    selectedTask,
    filteredTasks,
  };
};
