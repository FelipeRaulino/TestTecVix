import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().optional(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  hasBackup: z.boolean().optional().default(false),
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
  pass: z
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
  location: z.enum(["bre_barueri", "usa_miami"]),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
