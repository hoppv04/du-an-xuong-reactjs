import * as z from "zod";

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }).min(6).max(30),
  price: z.number({ invalid_type_error: "Price must be a number!" }).min(0),
  description: z.string().optional(),
});

export default productSchema;
