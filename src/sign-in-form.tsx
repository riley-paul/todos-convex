import { SignInMethodDivider } from "@/components/SignInMethodDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Label } from "./components/ui/label";
import { CircleCheckBig } from "lucide-react";

export const SignInForm: React.FC = () => {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");

  return (
    <Card className="max-w-[500px] w-full">
      <div className="p-7 flex flex-col justify-center items-center gap-3">
        <CircleCheckBig className="size-12 text-primary" />
        <h1 className="text-4xl tracking-tight font-bold">Todos</h1>
      </div>
      {step === "signIn" ? (
        <>
          <CardHeader>
            <CardTitle className="text-center">
              Sign in or create an account
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SignInWithGitHub />
            <SignInMethodDivider />
            <SignInWithMagicLink handleLinkSent={() => setStep("linkSent")} />
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              A sign-in link has been sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="p-0 self-start"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export function SignInWithGitHub() {
  const { signIn } = useAuthActions();
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => void signIn("github")}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
    </Button>
  );
}

const SignInWithMagicLink: React.FC<{
  handleLinkSent: () => void;
}> = ({ handleLinkSent }) => {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  return (
    <form
      className="grid gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        signIn("resend", formData)
          .then(handleLinkSent)
          .catch((error) => {
            console.error(error);
            toast({
              title: "Could not send sign-in link",
              variant: "destructive",
            });
          });
      }}
    >
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        id="email"
        className="mb-4"
        autoComplete="email"
        placeholder="hello@example.com"
      />
      <Button type="submit">Send sign-in link</Button>
      <Toaster />
    </form>
  );
};
