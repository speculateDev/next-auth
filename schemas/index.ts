import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
});

export const LoginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
  emailVerified: z.date(),
  isTwoFactorEnabled: z.boolean(),
});
export type User = z.infer<typeof User>;

export type Token = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type TwoFactor = {
  id: string;
  userId: number;
};
