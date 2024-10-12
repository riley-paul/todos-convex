import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import SingleInputForm from "./single-input-form";
import { Label } from "./ui/label";
import DeleteButton from "./ui/delete-button";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import type { Doc } from "../../convex/_generated/dataModel";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const List: React.FC<{
  list: Doc<"lists"> & { count: number };
}> = ({ list }) => {
  const deleteList = useMutation(api.lists.remove);
  const updateList = useMutation(api.lists.update);

  const ref = React.useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  useOnClickOutside(ref, () => setIsEditing(false));
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") setIsEditing(false);
  });

  return (
    <div ref={ref} className="py-1 flex items-center h-10 gap-2">
      {isEditing ? (
        <SingleInputForm
          className="h-8"
          initialValue={list.name}
          handleSubmit={(name) => {
            updateList({ listId: list._id, name })
              .then(() => {
                toast.success("List updated");
                setIsEditing(false);
              })
              .catch((error) => {
                toast.error("Failed to update list", {
                  description: error.message,
                });
              });
          }}
        />
      ) : (
        <span
          className="flex-1 cursor-pointer select-none"
          onClick={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditing(true);
          }}
          tabIndex={0}
        >
          {list.name}
        </span>
      )}
      <span className="flex gap-1 text-secondary-foreground/80 text-sm">
        <span className="font-semibold">{list.count}</span>
        <span className="font-normal">tasks</span>
      </span>
      <DeleteButton
        handleDelete={() => {
          deleteList({ listId: list._id })
            .then(() => toast.success("List deleted"))
            .catch((error) => {
              toast.error("Failed to delete list", {
                description: error.message,
              });
            });
        }}
      />
    </div>
  );
};

const ListsEditor: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;
  const lists = useQuery(api.lists.list);
  const createList = useMutation(api.lists.create);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage your lists</DialogTitle>
          <DialogDescription>
            Add, remove, edit and share your lists
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] min-h-[150px] overflow-scroll bg-secondary/20 rounded-lg px-3">
          <div className="divide-y grid">
            {lists?.map((list) => <List key={list._id} list={list} />)}
          </div>
          {lists?.length === 0 && (
            <div className="text-muted-foreground py-2 h-full text-sm flex items-center justify-center">
              No lists yet
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Add a List</Label>
          <SingleInputForm
            clearAfterSubmit
            initialValue=""
            inputProps={{ placeholder: "Enter list name" }}
            handleSubmit={(name) => {
              createList({ name })
                .then(() => {
                  toast.success("List added", { description: name });
                })
                .catch((error) => {
                  toast.error("Failed to add list", {
                    description: error.message,
                  });
                });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListsEditor;
