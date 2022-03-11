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
const port = process.env.PORT || 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  app.use("/v0/api", router);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
