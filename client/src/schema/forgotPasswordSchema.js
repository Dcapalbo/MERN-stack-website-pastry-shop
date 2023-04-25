import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message:
        "l'email non è ben formattata inserire la @ e nella seconda parte la dicitura che posticipa il punto",
    })
    .min(10, { message: "l'email deve essere almeno di 10 caratteri" })
    .max(40, { message: "l'email non deve esuperare i 40 caratteri" }),
});

export { forgotPasswordSchema };
