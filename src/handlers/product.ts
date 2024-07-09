import { Request, Response, Application } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await store.show(Number(id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const newProduct: Product = {
      name,
      price,
      category,
    };
    const createdProduct = await store.create(newProduct);
    res.json(createdProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    const updatedProduct: Product = {
      id: Number(id),
      name,
      price,
      category,
    };
    const updated = await store.update(Number(id), updatedProduct);
    if (!updated) {
      res.status(404).json({ error: "Product not found" });
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
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(deleted);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.put("/products/:id", update);
  app.delete("/products/:id", remove);
};

export default product_routes;
