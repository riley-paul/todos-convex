import { selectedListAtom } from "@/lib/store";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useAtomValue } from "jotai/react";
import React from "react";
import type { Doc } from "../../convex/_generated/dataModel";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import { Input } from "./ui/input";

const TodoEditor: React.FC<{
  initialValue: string;
  updateValue: (value: string) => void;
}> = ({ initialValue, updateValue }) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <form
      className="flex gap-2 w-full h-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length === 0) {
          toast.error("Task cannot be empty");
          return;
        }
        updateValue(value);
      }}
    >
      <Input
        className="h-full"
        autoFocus
        value={value}
        placeholder="Enter some text"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="submit"
        className="h-full"
        variant="secondary"
        disabled={value.length === 0}
      >
        <Save className="size-4 mr-2" />
        <span>Save</span>
      </Button>
      <input type="submit" className="hidden" />
    </form>
  );
};

const Todo: React.FC<{ todo: Doc<"todos"> }> = ({ todo }) => {
  const updateTodo = useMutation(api.todos.update);
  const deleteTodo = useMutation(api.todos.remove);

  const [isEditing, setIsEditing] = React.useState(false);
  const ref = React.useRef<HTMLLIElement>(null);

  useOnClickOutside(ref, () => setIsEditing(false));
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setIsEditing(false);
  });

  return (
    <li
      ref={ref}
      className="hover:bg-muted/20 px-3 py-1 min-h-10 rounded transition-colors ease-out text-sm flex gap-2 items-center"
    >
      {isEditing ? (
        <TodoEditor
          initialValue={todo.text}
          updateValue={(value) => {
            updateTodo({ todoId: todo._id, text: value })
              .then(() => {
                toast.success("Task updated");
                setIsEditing(false);
              })
              .catch((error) => {
                toast.error("Failed to update task", {
                  description: error.message,
                });
              });
          }}
        />
      ) : (
        <>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(completed) => {
              updateTodo({ todoId: todo._id, completed: Boolean(completed) })
                .then(() => toast.success("Task updated"))
                .catch((error) => {
                  toast.error("Failed to update task", {
                    description: error.message,
                  });
                });
            }}
          />
          <span
            onClick={() => setIsEditing(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(true);
              if (e.key === " ") setIsEditing(true);
            }}
            tabIndex={0}
            className={cn(
              "flex-1 cursor-pointer select-none",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.text}
          </span>
          <Button
            variant="ghost"
            className="size-7 p-0 text-muted-foreground rounded-full"
            onClick={() => {
              deleteTodo({ todoId: todo._id })
                .then(() => toast.success("Task deleted"))
                .catch((error) => {
                  toast.error("Failed to delete task", {
                    description: error.message,
                  });
                });
            }}
          >
            <X className="size-4 shrink-0" />
          </Button>
        </>
      )}
    </li>
  );
};

const TodoList: React.FC = () => {
  const selectedList = useAtomValue(selectedListAtom);
  const todos = useQuery(api.todos.list, { listId: selectedList });

  return (
    <ul className="grid gap-1">
      {todos?.map((todo) => <Todo key={todo._id} todo={todo} />)}
    </ul>
  );
};

export default TodoList;
