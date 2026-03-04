import { z } from "zod";

import { CategorySchema } from "@/schemas/category.schema";
import { ProductImageSchema } from "@/schemas/product-image.schema";
import { ProductResponseSchema } from "@/schemas/product.schema";

export type Product = z.infer<typeof ProductResponseSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
