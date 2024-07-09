import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import user_routes from "./handlers/users";
import product_routes from "./handlers/product";
import { PORT } from "./utils/env";
import { application } from "express";

const app: Application = express();

const corsOptions = {
  origin: process.env.CORSE_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

user_routes(app);
product_routes(app);

app.listen(PORT, function () {
  console.log(`starting app at:  localhost:${PORT}`);
});
