import { z } from "zod";

const sweetSchema = z.object({
  sweetName: z
    .string()
    .min(3, { message: "Il nome del dolce deve contenere almeno 3 caratteri" })
    .max(40, {
      message: "il nome del dolce non deve contenere più di 25 caratteri",
    }),
  sweetQuantity: z
    .number()
    .positive({ message: "il numero deve essere superiore allo 0" })
    .min(1, { message: "La quantità del dolce deve essere di almeno 1 unità" })
    .max(99, {
      message: "La quantità del dolce non può essere superiore a 99",
    }),
  ingredients: z.array(
    z.object({
      ingredientName: z
        .string()
        .min(3, {
          message: "Il nome dell'ingrediente deve contenere almeno 3 caratteri",
        })
        .max(20, {
          message:
            "Il nome dell'ingrediente non deve contenere più di 20 caratteri",
        }),
      measureUnit: z
        .string()
        .min(2, {
          message:
            "la sigla dell'unità di misura deve contenere almeno 2 caratteri: esempio (gr, cl, ml)",
        })
        .max(2, {
          message:
            "la sigla dell'unità di misura non deve contenere più di 2 caratteri: esempio (gr, cl, ml)",
        })
        .refine((val) => val === "gr" || val === "cl" || val === "ml", {
          message:
            "la sigla dell'unità di misura deve essere 'gr', 'cl', o 'ml'",
        }),
      amount: z
        .number()
        .positive({ message: "il numero deve essere superiore allo 0" })
        .min(1, {
          message: "la quantità dell'ingrediente deve essere di minimo 1",
        })
        .max(1000, {
          message: "la quantità dell'ingrediente deve essere di massimo 1000",
        }),
    })
  ),
  price: z
    .number()
    .positive({ message: "il numero deve essere superiore allo 0" })
    .min(2, {
      message: "il prezzo deve essere di almeno 2 cifre",
    })
    .max(999, {
      message: "il prezzo non può essere superiore a 999",
    }),
  description: z
    .string()
    .min(10, {
      message:
        "la descrizione del prodotto di pasticceria deve essere di almeno 10 caratteri",
    })
    .max(250, {
      message:
        "la descrizione del prodotto di pasticceria non può superare i 250 caratteri",
    }),
  category: z.string().nonempty({ message: "Inserire almeno un valore" }),
});

export { sweetSchema };
