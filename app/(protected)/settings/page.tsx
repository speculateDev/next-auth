"use client";

import { signOut, useSession } from "next-auth/react";
import { logout } from "@/app/actions/logout";
// import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const onClick = () => {
    // signOut();
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
}
