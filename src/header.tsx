import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-14 bg-card/20 backdrop-blur border-b">
      <div className="max-w-screen-sm mx-auto flex items-center h-full">
        <h1 className="text-2xl font-bold tracking-tight">
          <i className="fa-solid fa-save" />
          <span>Todos</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
