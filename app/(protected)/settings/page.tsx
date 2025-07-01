"use client";

import { signOut, useSession } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      {JSON.stringify(session)}
      <form>
        <button onClick={onClick} type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
