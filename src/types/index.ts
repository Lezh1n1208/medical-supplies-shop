import { z } from "zod";

import { CategorySchema } from "@/schemas/category.schema";
import { ProductImageSchema } from "@/schemas/product-image.schema";
import { ProductSchema } from "@/schemas/product.schema";

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
