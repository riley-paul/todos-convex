import { Save } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type Props = {
  initialValue: string;
  handleSubmit: (value: string) => void;
  className?: string;
  buttonPtops?: ButtonProps;
};

const SingleInputForm: React.FC<Props> = ({
  initialValue,
  handleSubmit,
  className,
  buttonPtops,
}) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <form
      className={cn("flex gap-2 w-full items-center h-9", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length === 0) {
          toast.error("Input cannot be empty");
          return;
        }
        handleSubmit(value);
      }}
    >
      <Input
        className="h-full"
        autoFocus
        value={value}
        placeholder="Enter some text"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="submit"
        variant="secondary"
        disabled={value.length === 0}
        children={
          <>
            <Save className="size-4 mr-2" />
            <span>Save</span>
          </>
        }
        {...buttonPtops}
        className={cn("h-full", buttonPtops?.className)}
      />
      <input type="submit" className="hidden" />
    </form>
  );
};

export default SingleInputForm;
