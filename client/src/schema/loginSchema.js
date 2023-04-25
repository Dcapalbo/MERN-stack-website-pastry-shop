import { z } from "zod";

const loginSchema = z
  .object({
    email: z
      .string()
      .email({
        message:
          "l'email non è ben formattata inserire la @ e nella seconda parte la dicitura che posticipa il punto",
      })
      .min(10, { message: "l'email deve essere almeno di 10 caratteri" })
      .max(40, { message: "l'email non deve esuperare i 40 caratteri" }),
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

export { loginSchema };
