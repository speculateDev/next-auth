"use client";

import RoleGate from "@/app/_components/auth/role-gate";
import FormSuccess from "@/app/_components/form-success";
import { admin } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
// import { useCurrentRole } from "@/hooks/use-current-role";
// import { currentRole } from "@/lib/auth";

// export default async function AdminPage() {
//   const role = await currentRole();

//   return <div>Current role : {role}</div>;
// }

export default function AdminPage() {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="w-[600px] ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole="admin">
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium ">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium ">Admin-only Server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
