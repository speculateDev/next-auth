import CardWrapper from "./CardWrapper";
import { AlertTriangle } from "lucide-react";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex justify-center">
        <AlertTriangle className="size-5 text-destructive" />
      </div>
    </CardWrapper>
  );
}
