import { z } from "zod";

export const userCreatedSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required"),
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
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).optional(),
  idBrandMaster: z.number().optional(),
  isActive: z.boolean().optional().default(true),
  lastLoginDate: z.date().nullable().optional(),
});

export type TUserCreated = z.infer<typeof userCreatedSchema>;
