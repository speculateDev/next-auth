import { useRouter } from "next/navigation";

// "use client";

interface LoginButton {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  aschild?: boolean;
}

export default function LoginButton({ children, mode, asChild }: LoginButton) {
  const router = useRouter();

  if (mode === "modal") {
    return <span>TODO: implement modal</span>;
  }

  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
