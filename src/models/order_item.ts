import Client from "../database";

export type OrderItem = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderItemStore {
  async index(): Promise<OrderItem[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM order_items";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order items. Error: ${err}`);
    }
  }

  async show(id: number): Promise<OrderItem> {
    try {
      const sql = "SELECT * FROM order_items WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order item ${id}. Error: ${err}`);
    }
  }

  async create(order_item: OrderItem): Promise<OrderItem> {
    try {
      const sql =
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [
        order_item.order_id,
        order_item.product_id,
        order_item.quantity,
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(
        `Could not add new order item ${order_item.id}. Error: ${err}`
      );
    }
  }

  async update(id: number, order_item: OrderItem): Promise<OrderItem> {
    try {
      const sql =
        "UPDATE order_items SET order_id=($1), product_id=($2), quantity=($3) WHERE id=($4) RETURNING *";

      const conn = await Client.connect();
      const result = await conn.query(sql, [
        order_item.order_id,
        order_item.product_id,
        order_item.quantity,
        id,
      ]);
      const updatedOrderItem = result.rows[0];
      conn.release();
      return updatedOrderItem;
    } catch (err) {
      throw new Error(`Could not update order item ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<OrderItem> {
    try {
      const sql = "DELETE FROM order_items WHERE id=($1) RETURNING *";

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
