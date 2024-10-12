import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { Badge } from "./ui/badge";
import { useAtom } from "jotai/react";
import { selectedListAtom } from "@/lib/store";
import { Separator } from "./ui/separator";
import { Pencil } from "lucide-react";
import ListsEditor from "./lists-editor";

const List: React.FC<{ value: string | undefined; name: string }> = ({
  value,
  name,
}) => {
  const [selectedList, setSelectedList] = useAtom(selectedListAtom);
  return (
    <Badge
      className="cursor-pointer select-none h-6"
      variant={selectedList === value ? "default" : "secondary"}
      onClick={() => setSelectedList(value)}
    >
      {name}
    </Badge>
  );
};

const Lists: React.FC = () => {
  const lists = useQuery(api.lists.list);
  const [editorIsOpen, setEditorIsOpen] = React.useState(false);

  return (
    <div className="flex flex-wrap gap-2 px-3">
      <List value={undefined} name="Inbox" />
      <List value={"all"} name="All" />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-5" />
      </div>
      {lists?.map((list) => (
        <List key={list._id} value={list._id} name={list.name} />
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
