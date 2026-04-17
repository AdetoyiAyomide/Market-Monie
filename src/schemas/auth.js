import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(10, "Phone number is too short").max(15, "Phone number is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Ms", "Miss", "Dr"], {
    errorMap: () => ({ message: "Please select a title" }),
  }),
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  phone: z.string().min(10, "Phone number is too short").max(15, "Phone number is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z
    .string()
    .length(6, "PIN must be exactly 6 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "PINs don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  phone: z.string().min(10, "Phone number is too short").max(15, "Phone number is too long"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
