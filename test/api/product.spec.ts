import { createProduct } from "../helpers/createProduct";
import { v4 } from "uuid";
import { request } from "../helpers/app";
import { getAuthToken } from "../helpers/auth";
// import { iocContainer } from "../../src/ioc";
// import { ArticlesRepository } from "../../src/api/articles/ArticlesRepository";
// import { ArticleController } from "../../src/api/articles/ArticleController";

describe("Products", () => {
  describe("POST /products", () => {
    it("responds with 201 status code and newly created product data if product has been created successfully", async () => {
      const requestBody = {
        product: {
          name: `product-name-${v4()}`,
          price: Math.random() * 50,
        },
      };

      const expectedResponseBody = {
        product: {
          ...requestBody.product,
          id: expect.anything(),
          createdAt: expect.anything(),
        },
      };

      const response = await request.post("/product").send(requestBody);

      expect(response.body).toEqual(expectedResponseBody);
      expect(typeof response.body.id).toEqual("string");
      expect(new Date().getTime() - new Date(response.body.createdAt).getTime()).toBeLessThan(1000);
      expect(response.statusCode).toEqual(201);
    });
  });
});
