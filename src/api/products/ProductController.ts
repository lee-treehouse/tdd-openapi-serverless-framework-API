import { inject } from "inversify";
import { Body, Controller, Get, Path, Post, Route, SuccessResponse } from "tsoa";

import { provideSingleton } from "../../util/provideSingleton";
import { Product, NewProduct } from "./Product";
import { ProductsService } from "./ProductsService";

export type ProductRequestBody = {
  product: NewProduct;
};

export type ProductResponseBody = {
  product: Product;
};

@Route("product")
@provideSingleton(ProductController)
export class ProductController extends Controller {
  constructor(@inject(ProductsService) private productsService: ProductsService) {
    super();
  }

  @SuccessResponse(201)
  @Post()
  public async postProduct(@Body() reqBody: ProductRequestBody): Promise<ProductResponseBody> {
    const product = await this.productsService.createProduct(reqBody.product);

    return { product };
  }
}
