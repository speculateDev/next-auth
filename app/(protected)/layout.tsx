import React from "react";
import Navbar from "./_components/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full min-h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_#38bdf8_0%,_#1d4ed8_100%)]">
      <Navbar />
      {children}
    </div>
  );
}
