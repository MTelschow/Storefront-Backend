// @ts-ignore
import Client from "../database";

export type User = {
  id?: Number;
  first_name: String;
  last_name: String;
  hash: String;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, hash) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.first_name, b.last_name, b.hash]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(
        `Could not add new user ${b.first_name} ${b.last_name}. Error: ${err}`
      );
    }
  }

  async update(id: number, updates: User): Promise<User> {
    try {
      const { first_name, last_name, hash } = updates;
      const sql =
        "UPDATE users SET first_name=($1), last_name=($2), hash=($3) WHERE id=($4) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [first_name, last_name, hash, id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
