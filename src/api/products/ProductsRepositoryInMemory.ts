import { v4 } from "uuid";
import { NewProduct, Product } from "./Product";
import { ProductsRepository } from "./ProductsRepository";

export class ProductsRepositoryInMemory implements ProductsRepository {
  private productMap: Record<string, Product> = {};

  create(newProduct: NewProduct): Promise<Product> {
    const product = {
      ...newProduct,
      id: v4(),
      createdAt: new Date(),
    };

    this.productMap[product.id] = product;

    return Promise.resolve(product);
  }
}
