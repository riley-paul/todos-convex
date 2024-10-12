import { selectedListAtom } from "@/lib/store";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useAtomValue } from "jotai/react";
import React from "react";

const TodoList: React.FC = () => {
  const selectedList = useAtomValue(selectedListAtom);
  const todos = useQuery(api.todos.list, { listId: selectedList });

  return <ul>{todos?.map((todo) => <li key={todo._id}>{todo.text}</li>)}</ul>;
};

export default TodoList;
