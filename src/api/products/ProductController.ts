import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";

import { provideSingleton } from "../../util/provideSingleton";
import { v4 } from "uuid";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}

export interface NewProduct extends Omit<Product, "id" | "createdAt"> {}

export type ProductRequestBody = {
  product: NewProduct;
};

export type ProductResponseBody = {
  product: Product;
};

@Route("product")
@provideSingleton(ProductController)
export class ProductController extends Controller {
  @SuccessResponse(201)
  @Post()
  public async postProduct(@Body() reqBody: ProductRequestBody): Promise<ProductResponseBody> {
    return Promise.resolve({ product: { ...reqBody.product, id: v4(), createdAt: new Date() } });
  }
}
