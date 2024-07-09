import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import user_routes from "./handlers/users";
import product_routes from "./handlers/product";

dotenv.config();

const port = process.env.PORT;
const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", async function (req: Request, res: Response) {
  res.send("Server working");
});

user_routes(app);
product_routes(app);

app.listen(port, function () {
  console.log(`starting app at:  localhost:${port}`);
});
