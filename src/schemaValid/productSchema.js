import * as z from "zod";

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }).min(6).max(30),
  price: z.number().nonnegative("Price must be a number"),
  description: z.string().optional(),
  thumbnail: z.any().optional(),
});

export default productSchema;
