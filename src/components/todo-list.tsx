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
import { X } from "lucide-react";
import SingleInputForm from "./single-input-form";

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
        <SingleInputForm
          className="h-8"
          initialValue={todo.text}
          handleSubmit={(value) => {
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
