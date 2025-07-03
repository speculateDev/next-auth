"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import LoginButton from "./_components/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_#38bdf8_0%,_#1d4ed8_100%)]">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>

        <p className="text-white text-lg">A simple authentication service</p>

        <div>
          <LoginButton mode="modal">
            <Button variant="secondary" size="lg" className="cursor-pointer">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
