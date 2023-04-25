import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Il nome deve contenere almeno 3 caratteri" })
    .max(15, { message: "il nome non deve contenere più di 15 caratteri" }),

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
});

export { signUpSchema };
