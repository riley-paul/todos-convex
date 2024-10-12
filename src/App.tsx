import { SignInForm } from "@/sign-in-form";
import { Authenticated, Unauthenticated } from "convex/react";
import Header from "./header";
import Lists from "./components/lists";
import Adder from "./components/adder";
import TodoList from "./components/todo-list";

export default function App() {
  return (
    <>
      <Authenticated>
        <Header />
        <main className="max-w-screen-sm mx-auto grid gap-6 py-6 px-4">
          <Adder />
          <Lists />
          <TodoList />
        </main>
      </Authenticated>
      <Unauthenticated>
        <main className="min-h-screen flex items-center justify-center">
          <SignInForm />
        </main>
      </Unauthenticated>
    </>
  );
}
