"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-10 justify-center">
      <Button
        className="flex-1"
        size="lg"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="size-5 " />
      </Button>
      <Button
        className="flex-1"
        size="lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="size-5 " />
      </Button>
    </div>
  );
}
