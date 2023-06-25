import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { ApiError } from "../ApiError";
import { Product, NewProduct } from "./Product";
import { ProductsRepository } from "./ProductsRepository";

@provide(ProductsService)
export class ProductsService {
  constructor(@inject("ProductsRepository") private productsRepository: ProductsRepository) {}
  public async createProduct(newProduct: NewProduct): Promise<Product> {
    const product = await this.productsRepository.create(newProduct);

    return product;
  }
}
