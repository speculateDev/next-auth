import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "./auth/LoginForm";

// "use client";

interface LoginButton {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({ children, mode }: LoginButton) {
  const router = useRouter();

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <DialogTitle>
            <LoginForm />
          </DialogTitle>
        </DialogContent>
      </Dialog>
    );
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
