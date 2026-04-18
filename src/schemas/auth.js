import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(10, "Phone Number Is Too Short").max(15, "Phone Number Is Too Long"),
  password: z.string().min(6, "Password Must Be At Least 6 Characters"),
});

export const registerSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Ms", "Miss", "Dr"], {
    errorMap: () => ({ message: "Please Select A Title" }),
  }),
  firstName: z.string().min(2, "First Name Is Too Short"),
  lastName: z.string().min(2, "Last Name Is Too Short"),
  phone: z.string().min(10, "Phone Number Is Too Short").max(15, "Phone Number Is Too Long"),
  email: z.string().email("Invalid Email Address").optional().or(z.literal("")),
  password: z
    .string()
    .length(6, "PIN Must Be Exactly 6 Digits")
    .regex(/^\d+$/, "PIN Must Contain Only Numbers"),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, "You Must Accept The Terms And Conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "PINs Don't Match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  phone: z.string().min(10, "Phone Number Is Too Short").max(15, "Phone Number Is Too Long"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP Must Be 6 Digits"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password Must Be At Least 6 Characters")
      .regex(/[A-Z]/, "Password Must Contain At Least One Uppercase Letter")
      .regex(/[0-9]/, "Password Must Contain At Least One Number")
      .regex(/[^A-Za-z0-9]/, "Password Must Contain At Least One Special Character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't Match",
    path: ["confirmPassword"],
  });
