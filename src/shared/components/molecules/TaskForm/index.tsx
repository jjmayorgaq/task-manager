import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Task } from "@/shared/types/task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialValues?: Task;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),
  description: Yup.string().max(
    500,
    "Description must be at most 500 characters"
  ),
  priority: Yup.string()
    .oneOf(["High", "Medium", "Low"], "Invalid priority")
    .required("Priority is required"),
  dueDate: Yup.string().required("Due date is required"),
});

export function TaskForm({ onSubmit, initialValues }: TaskFormProps) {
  return (
    <Formik
      initialValues={
        initialValues ?? {
          id: Date.now().toString(),
          title: "",
          description: "",
          priority: "Medium" as Priority,
          completed: false,
          dueDate: "",
        }
      }
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Field as={Input} id="title" name="title" />
            <ErrorMessage
              name="title"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">
              Description (Optional)
            </Label>
            <Field as={Textarea} id="description" name="description" />
            <ErrorMessage
              name="description"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="priority">Priority</Label>
            <Select
              defaultValue={initialValues?.priority ?? "Medium"}
              onValueChange={(value) => setFieldValue("priority", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="priority"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <Field as={Input} type="date" id="dueDate" name="dueDate" />
            <ErrorMessage
              name="dueDate"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white border border-white"
          >
            {initialValues ? "Update Task" : "Add Task"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}