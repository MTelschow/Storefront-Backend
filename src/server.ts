import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`starting app on: port ${port}`);
});
