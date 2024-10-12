import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

const Lists: React.FC = () => {
  const lists = useQuery(api.lists.list);
  const createList = useMutation(api.lists.create);

  if (!lists) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {lists.map((list) => (
        <li key={list._id}>
          <Badge>{list.name}</Badge>
        </li>
      ))}
      <Button
        onClick={() => {
          createList({ name: "test" }).catch((error) =>
            toast.error(error.message),
          );
        }}
      >
        Add list
      </Button>
    </ul>
  );
};

export default Lists;
