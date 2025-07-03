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
  aschild?: boolean;
}

export default function LoginButton({ children, mode, asChild }: LoginButton) {
  const router = useRouter();

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
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
