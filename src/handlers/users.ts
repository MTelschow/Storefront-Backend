import { Request, Response, Application } from "express";
import { NewUser, UserStore } from "../models/user";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await store.show(Number(id));
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, password } = req.body;
    const newUser: NewUser = {
      first_name,
      last_name,
      password: password,
    };
    const createdUser = await store.create(newUser);
    res.json(createdUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, password } = req.body;
    const updatedUser: NewUser = {
      id: Number(id),
      first_name,
      last_name,
      password: password,
    };
    const updated = await store.update(Number(id), updatedUser);
    if (!updated) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await store.delete(Number(id));
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.put("/users/:id", update);
  app.delete("/users/:id", remove);
};

export default user_routes;
