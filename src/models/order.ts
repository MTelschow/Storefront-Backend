// @ts-ignore
import Client from "../database";

export type Order = {
  id?: Number;
  user_id: Number;
  status: "active" | "completed";
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [order.user_id, order.status]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new order ${order.id}. Error: ${err}`);
    }
  }

  async update(id: number, order: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [order.user_id, order.status, id]);

      const updatedOrder = result.rows[0];

      conn.release();

      return updatedOrder;
    } catch (err) {
      throw new Error(`Could not update order ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
