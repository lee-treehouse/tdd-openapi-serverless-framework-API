export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface NewProduct extends Omit<Product, "id" | "createdAt"> {}
