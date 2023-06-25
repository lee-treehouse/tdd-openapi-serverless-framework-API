import { v4 } from "uuid";
import { Product } from "../../src/api/products/Product";

export const createProduct = (product: Partial<Product> = {}): Product => ({
  id: v4(),
  title: `title-${v4()}`,
  description: `description-${v4()}`,
  createdAt: new Date(),
  ...product,
});
