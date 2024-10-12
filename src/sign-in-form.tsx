import { SignInMethodDivider } from "@/components/SignInMethodDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Label } from "./components/ui/label";

export const SignInForm: React.FC = () => {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="max-w-[500px] w-full">
        {step === "signIn" ? (
          <>
            <CardHeader>
              <CardTitle>Sign in or create an account</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <SignInWithGitHub />
              <SignInMethodDivider />
              <SignInWithMagicLink handleLinkSent={() => setStep("linkSent")} />
            </CardContent>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-2xl tracking-tight">
              Check your email
            </h2>
            <p>A sign-in link has been sent to your email address.</p>
            <Button
              className="p-0 self-start"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </>
        )}
      </Card>
    </main>
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
