import { selectedListAtom } from "@/lib/store";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useAtomValue } from "jotai/react";
import React from "react";
import type { Doc } from "../../convex/_generated/dataModel";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Todo: React.FC<{ todo: Doc<"todos"> }> = ({ todo }) => {
  const updateTodo = useMutation(api.todos.update);
  return (
    <li className="hover:bg-muted/20 px-3 py-2 rounded transition-colors ease-out text-sm flex gap-2 items-center">
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
        className={cn(todo.completed && "line-through text-muted-foreground")}
      >
        {todo.text}
      </span>
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
