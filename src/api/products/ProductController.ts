import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";

import { provideSingleton } from "../../util/provideSingleton";
import { v4 } from "uuid";
import { CreateTableCommand, DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

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
    const product = { ...reqBody.product, id: v4(), createdAt: new Date() };

    const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });
    await client.send(
      new PutItemCommand({
        TableName: "Products",
        Item: {
          ProductID: { S: product.id },
          Name: { S: product.name },
          Description: { S: product.description },
          Price: { N: String(product.price) },
          CreatedAt: { N: product.createdAt.getTime().toString() },
        },
      }),
    );

    return Promise.resolve({ product });
  }
}
