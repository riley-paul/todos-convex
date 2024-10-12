import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ListsEditor: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;
  const lists = useQuery(api.lists.list);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage your lists</DialogTitle>
          <DialogDescription>
            Add, remove, edit and share your lists
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[300px] overflow-scroll">
          {lists?.map((list) => <div key={list._id}>{list.name}</div>)}
        </div>
        <form>
          <Input />
          <Button>Add list</Button>
        </form>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListsEditor;
