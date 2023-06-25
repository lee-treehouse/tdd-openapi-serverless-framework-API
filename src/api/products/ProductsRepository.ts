import { Product, NewProduct } from "./Product";

export interface ProductsRepository {
  create(product: NewProduct): Promise<Product>;
}
