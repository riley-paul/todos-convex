import { Chat } from "@/Chat/Chat";
import { SignInForm } from "@/sign-in-form";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Header from "./header";

export default function App() {
  const user = useQuery(api.users.viewer);
  return (
    <>
      <Authenticated>
        <Header />
        <Chat viewer={(user ?? {})._id!} />
      </Authenticated>
      <Unauthenticated>
        <main className="min-h-screen flex items-center justify-center">
          <SignInForm />
        </main>
      </Unauthenticated>
    </>
  );
}
