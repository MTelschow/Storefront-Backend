import Client from "../database";
import { hashPassword } from "../utils/hashing";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  password_digest: string;
};

export type NewUser = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
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

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(newUser: NewUser): Promise<User> {
    try {
      const { first_name, last_name, password } = newUser;

      const hash = hashPassword(password);

      const sql =
        "INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [first_name, last_name, hash]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async update(id: number, updates: NewUser): Promise<User> {
    try {
      const { first_name, last_name, password } = updates;

      const hash = hashPassword(password);

      const sql =
        "UPDATE users SET first_name=($1), last_name=($2), password_digest=($3) WHERE id=($4) RETURNING *";

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
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
