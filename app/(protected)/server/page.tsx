import UserInfo from "@/app/_components/auth/user-info";
import { currentUser } from "@/lib/auth";

export default async function page() {
  const user = await currentUser();

  return (
    <div>
      <UserInfo label="💻 Server component" user={user} />
    </div>
  );
}
