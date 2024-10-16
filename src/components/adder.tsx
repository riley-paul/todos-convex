import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAtomValue } from "jotai/react";
import { selectedListAtom } from "@/lib/store";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const Adder: React.FC = () => {
  const selectedList = useAtomValue(selectedListAtom);
  const [value, setValue] = React.useState("");

  const createTodo = useMutation(api.todos.create);

  return (
    <form
      className="flex gap-2 px-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length === 0) {
          toast.error("Task cannot be empty");
          return;
        }
        createTodo({ text: value, listId: selectedList })
          .then(() => {
            toast.success("Task added", { description: value });
            setValue("");
          })
          .catch((error) => {
            toast.error("Failed to add task", { description: error.message });
          });
      }}
    >
      <Input
        autoFocus
        placeholder="What needs doing?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
      <Button type="submit" disabled={value.length === 0}>
        <Plus className="size-5 mr-2" />
        <span>Add</span>
      </Button>
      <input type="submit" hidden />
    </form>
  );
};

export default Adder;
