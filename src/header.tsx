import { Authenticated } from "convex/react";
import React from "react";
import { UserMenu } from "./components/UserMenu";
import { CircleCheckBig } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-card/20 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-screen-sm mx-auto flex items-center h-full justify-between px-5">
        <h1 className="text-2xl font-bold tracking-tight flex gap-2 items-center">
          <CircleCheckBig className="text-primary size-6" />
          <span>Todos</span>
        </h1>
        <Authenticated>
          <UserMenu />
        </Authenticated>
      </div>
    </header>
  );
};

export default Header;
