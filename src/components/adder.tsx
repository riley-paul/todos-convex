import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAtomValue } from "jotai/react";
import { selectedListAtom } from "@/lib/store";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const Adder: React.FC = () => {
  const selectedList = useAtomValue(selectedListAtom);
  const [value, setValue] = React.useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Task added", { description: value });
        setValue("");
      }}
    >
      <Input
        autoFocus
        placeholder="What needs doing?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">
        <Plus className="size-5 mr-2" />
        <span>Add</span>
      </Button>
      <input type="submit" hidden />
    </form>
  );
};

export default Adder;
