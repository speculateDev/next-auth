"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/app/actions/settings";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { SettingsSchema } from "@/schemas";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import FormSuccess from "@/app/_components/form-success";
import FormError from "@/app/_components/form-error";

export default function SettingsPage() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then(async (data) => {
          if (data?.success) {
            setSuccess(data.success);
            toast.success(data.success);
            update();
          }
          if (data?.error) {
            setError(data.error);
            toast.error(data.error);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader className="flex gap-10 items-center">
        <p className="text-2xl font-bold text-center">⚙️ Settings</p>
        <p>
          Name : <span className="font-black">{user?.name}</span>
        </p>
      </CardHeader>

      <CardContent className="flex gap-5">
        <Form {...form}>
          <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
