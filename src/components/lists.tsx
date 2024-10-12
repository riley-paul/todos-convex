import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { Badge } from "./ui/badge";
import { useAtom } from "jotai/react";
import { selectedListAtom } from "@/lib/store";
import { Separator } from "./ui/separator";
import { Pencil } from "lucide-react";
import ListsEditor from "./lists-editor";
import { cn } from "@/lib/utils";

const List: React.FC<{
  value: string | undefined;
  name: string;
  count?: number;
}> = ({ value, name, count = 0 }) => {
  const [selectedList, setSelectedList] = useAtom(selectedListAtom);
  const isSelected = selectedList === value;
  return (
    <Badge
      className="cursor-pointer select-none h-6"
      variant={isSelected ? "default" : "secondary"}
      onClick={() => setSelectedList(value)}
    >
      <span>{name}</span>
      {count > 0 && (
        <span
          className={cn(
            "text-muted-foreground ml-1.5",
            isSelected && "text-secondary",
          )}
        >
          {count}
        </span>
      )}
    </Badge>
  );
};

const Lists: React.FC = () => {
  const lists = useQuery(api.lists.list);
  const allCount = useQuery(api.todos.list, { listId: "all" })?.length;
  const inboxCount = useQuery(api.todos.list, { listId: undefined })?.length;

  const [editorIsOpen, setEditorIsOpen] = React.useState(false);

  return (
    <div className="flex flex-wrap gap-2 px-3">
      <List value={undefined} name="Inbox" count={inboxCount} />
      <List value={"all"} name="All" count={allCount} />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-5" />
      </div>
      {lists?.map((list) => (
        <List
          key={list._id}
          value={list._id}
          name={list.name}
          count={list.count}
        />
      ))}
      <Badge
        className="cursor-pointer select-none font-normal px-1.5 h-6"
        variant="ghost"
        onClick={() => setEditorIsOpen(true)}
      >
        <Pencil className="size-3" />
        {/* <span>Edit lists</span> */}
      </Badge>
      <ListsEditor isOpen={editorIsOpen} setIsOpen={setEditorIsOpen} />
    </div>
  );
};

export default Lists;
