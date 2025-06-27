import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <nav className="bg-black text-white p-4">
        This is a shared navbar for dashboard
      </nav>
      {children}
    </div>
  );
}
