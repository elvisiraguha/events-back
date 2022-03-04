import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index";

config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");

  app.use("/v0/api", router);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
