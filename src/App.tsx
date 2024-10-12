import { Chat } from "@/Chat/Chat";
import { SignInForm } from "@/sign-in-form";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Header from "./header";
import Lists from "./components/lists";
import Adder from "./components/adder";

export default function App() {
  const user = useQuery(api.users.viewer);
  return (
    <>
      <Authenticated>
        <Header />
        <main className="max-w-screen-sm mx-auto grid gap-6 py-6">
          <Adder />
          <Lists />
          <Chat viewer={(user ?? {})._id!} />
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
