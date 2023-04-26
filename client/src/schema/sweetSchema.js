import { z } from "zod";

const sweetSchema = z.object({
  sweetName: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(3, { message: "Il nome del dolce deve contenere almeno 3 caratteri" })
    .max(25, {
      message: "il nome del dolce non deve contenere più di 25 caratteri",
    }),
  ingredientName: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(3, {
      message: "Il nome dell'ingrediente deve contenere almeno 3 caratteri",
    })
    .max(25, {
      message:
        "Il nome dell'ingrediente non deve contenere più di 25 caratteri",
    }),
  measureUnit: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(2, {
      message:
        "la sigla dell'unità di misura deve contenere almeno 2 caratteri: esempio(gr, cl, ml)",
    })
    .max(20, {
      message:
        "la sigla dell'unità di misura non deve contenere più di 20 caratteri",
    }),
  amount: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(1, {
      message:
        "indicare la quantità dell'ingrediente in numeri, minimo 1 numero",
    })
    .max(20, {
      message:
        "indicare la quantità dell'ingrediente in numeri, massimo 4 numeri",
    }),
  price: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(2, {
      message: "il prezzo deve essere di almeno 0.99",
    })
    .max(5, {
      message: "il prezzo non può superare l'ammontare di 999.99",
    }),
  description: z
    .string()
    .nonempty({ meesage: "inserire un valore" })
    .min(10, {
      message:
        "la descrizione del prodotto di pasticceria deve essere di almeno 20 caratteri",
    })
    .max(150, {
      message:
        "la descrizione del prodotto di pasticceria non può superare i 150 caratteri",
    }),
  category: z.string().nonempty({ message: "Inserire almeno un valore" }),
});

export { sweetSchema };
