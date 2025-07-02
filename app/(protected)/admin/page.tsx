// "use client";

// import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";

export default async function AdminPage() {
  const role = await currentRole();

  return <div>Current role : {role}</div>;
}
