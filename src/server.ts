import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import user_routes from "./handlers/users";
import product_routes from "./handlers/product";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.CORSE_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

user_routes(app);
product_routes(app);

app.listen(port, function () {
  console.log(`starting app at:  localhost:${port}`);
});
