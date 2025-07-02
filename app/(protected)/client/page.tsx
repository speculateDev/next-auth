"use client";

import UserInfo from "@/app/_components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo label="📱 Client component" user={user} />
    </div>
  );
}
