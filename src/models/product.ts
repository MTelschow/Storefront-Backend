import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: string;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new book ${b.name}. Error: ${err}`);
    }
  }

  async update(id: number, updatedProduct: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        updatedProduct.name,
        updatedProduct.price,
        updatedProduct.category,
        id,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id = $1 RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
