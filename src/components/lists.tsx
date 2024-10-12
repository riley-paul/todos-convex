import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { Badge } from "./ui/badge";
import { useAtom } from "jotai/react";
import { selectedListAtom } from "@/lib/store";
import { Separator } from "./ui/separator";
import { Edit } from "lucide-react";

const List: React.FC<{ value: string | null; name: string }> = ({
  value,
  name,
}) => {
  const [selectedList, setSelectedList] = useAtom(selectedListAtom);
  return (
    <Badge
      className="cursor-pointer select-none"
      variant={selectedList === value ? "default" : "secondary"}
      onClick={() => setSelectedList(value)}
    >
      {name}
    </Badge>
  );
};

const Lists: React.FC = () => {
  const lists = useQuery(api.lists.list);

  return (
    <div className="flex flex-wrap gap-2">
      <List value={null} name="Inbox" />
      <List value={"all"} name="All" />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-5" />
      </div>
      {lists?.map((list) => (
        <List key={list._id} value={list._id} name={list.name} />
      ))}
      <Badge className="cursor-pointer select-none font-normal" variant="ghost">
        <Edit className="size-3 mr-1.5" />
        <span>Edit lists</span>
      </Badge>
    </div>
  );
};

export default Lists;
