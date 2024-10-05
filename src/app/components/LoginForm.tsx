"use client";

import { doCredentialLogin } from "@/app/actions/authActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const result = await doCredentialLogin(formData);

      if (result.error) {
        alert(result.error);
        console.error(result.error);
        setError(result.error);
      } else if (result.redirectUrl && result.role) {
        console.log("Login successful, role:", result.role);
        // Redirect based on user role
        if (result.role === 'Admin') {
          router.push("/admin/publish-test");
        } else if (result.role === 'Student') {
          router.push("/student/tests");
        }
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred.");
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to MCQ Tests!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to explore.
      </p>

      <form className="my-8" onSubmit={onSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
        </button>
      </form>
    </div>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default LoginForm;
