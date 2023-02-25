import { errorMessages } from "$lib/constants/error.contant";
import { z } from "zod";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6).max(30);

export const loginDto = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpDto = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: errorMessages["password-must-same"],
    path: ["confirmPassword"],
  });

export type LoginDto = z.infer<typeof loginDto>;
export type SignUpDto = z.infer<typeof signUpDto>;
