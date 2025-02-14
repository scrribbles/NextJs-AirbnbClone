import z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

// export const authSchema = z.object({
//   country_code: z.string(),
//   phone_number: z.string().refine((v) => /^\d{10,15}$/.test(v), {
//     message: "Phone number must be numeric and between 10 to 15 digits.",
//   }),
// });
