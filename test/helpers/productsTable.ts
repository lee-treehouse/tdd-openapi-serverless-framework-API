import { CreateTableCommand, DeleteTableCommand, DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

export const createProductsTable = async () => {
  await client.send(
    new CreateTableCommand({
      TableName: "Products",
      AttributeDefinitions: [{ AttributeName: "ProductID", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "ProductID", KeyType: "HASH" }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    }),
  );
};

export const getProduct = async (id: string) => {
  return await client.send(
    new GetItemCommand({
      TableName: "Products",
      Key: { ProductID: { S: id } },
    }),
  );
};

export const deleteProductsTable = async () => {
  await client.send(new DeleteTableCommand({ TableName: "Products" }));
};
