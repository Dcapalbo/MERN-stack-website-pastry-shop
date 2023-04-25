import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(10, { message: "La password deve contenere almeno 10 caratteri" })
      .max(30, {
        message: "La password non può contenere più di 30 caratteri",
      }),
    confirmPassword: z
      .string()
      .min(10, {
        message:
          "La conferma della password deve contenere almeno 10 caratteri",
      })
      .max(30, {
        message:
          "La conferma della password non può contenere più di 30 caratteri",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Le password non sono uguali",
      });
    }
  });

export { resetPasswordSchema };
