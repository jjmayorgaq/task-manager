import "./App.css";
import { TaskTable } from "./shared/components/molecules/TaskList";
import { TaskForm } from "./shared/components/molecules/TaskForm";
import { TaskCard } from "./shared/components/molecules/TaskCard";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useTaskLogic } from "./shared/hooks/task.logic";

function App() {
  const {
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
    editingTask,
    selectedTask,
    search,
    filteredTasks,
  } = useTaskLogic();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <div className="flex items-center gap-4">
        <Button
          className="text-white"
          onClick={() => {
            setEditingTask(null);
            setSelectedTask(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Cancel" : "Create Task"}
        </Button>

        <Input
          type="text"
         placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm transition-all duration-200 focus:ring-2 focus:ring-primary"
        />
      </div>
      {showForm && (
        <TaskForm
          onSubmit={handleSubmit}
          initialValues={editingTask ?? undefined}
        />
      )}

      {selectedTask ? (
        <TaskCard
          task={selectedTask}
          onEdit={(id) => onPressEdit(id)}
          onDelete={(id) => onPressDelete(id)}
          onToggle={(id) => onPressToggle(id)}
          onBack={() => setSelectedTask(null)}
        />
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onEdit={onPressEdit}
          onDelete={onPressDelete}
          onToggle={onPressToggle}
          onView={onPressView}
        />
      )}
    </div>
  );
}

export default App;
