import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Adder: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Input />
      <Button>Add</Button>
    </div>
  );
};

export default Adder;
