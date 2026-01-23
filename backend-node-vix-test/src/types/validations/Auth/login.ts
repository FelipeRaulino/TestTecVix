import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .superRefine((val, ctx) => {
      if (val.length < 12)
        ctx.addIssue({
          code: "custom",
          message: "Password must be at least 12 characters long",
        });
      if ((val.match(/\d/g) || []).length < 2)
        ctx.addIssue({
          code: "custom",
          message: "Password must contain at least 2 numbers",
        });
      if ((val.match(/[a-z]/g) || []).length < 2)
        ctx.addIssue({
          code: "custom",
          message: "Password must contain at least 2 lowercase letters",
        });

      if ((val.match(/[A-Z]/g) || []).length < 2)
        ctx.addIssue({
          code: "custom",
          message: "Password must contain at least 2 uppercase letters",
        });

      if ((val.match(/[^a-zA-Z0-9]/g) || []).length < 2)
        ctx.addIssue({
          code: "custom",
          message: "Password must contain at least 2 special characters",
        });
    }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
