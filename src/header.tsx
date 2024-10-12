import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-14 bg-card/20 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-screen-sm mx-auto flex items-center h-full">
        <h1 className="text-2xl font-bold tracking-tight">
          <i className="fa-solid fa-circle mr-2 text-primary" />
          <span>Todos</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
