"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-10 justify-center">
      <Button className="flex-1" size="lg" variant="outline" onClick={() => {}}>
        <FcGoogle className="size-5 " />
      </Button>
      <Button className="flex-1" size="lg" variant="outline" onClick={() => {}}>
        <FaGithub className="size-5 " />
      </Button>
    </div>
  );
}
