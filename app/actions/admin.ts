"use server";

import { currentRole } from "@/lib/auth";

export async function admin() {
  const role = await currentRole();

  if (role === "admin") {
    return { success: "Allowed!" };
  }

  return { error: "FORBIDDEN!" };
}
