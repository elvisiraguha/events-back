import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { createClient } from "redis";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index";

config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

main().catch((err) => {
  app.use((req, res) => res.status(500).json({ status: 500, message: err }));
});

async function main() {
  await redisClient.on("error", (err) => {
    app.use((req, res) => res.status(500).json({ status: 500, message: err }));
  });

  await redisClient.connect();

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  app.use("/v0/api", router);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export { redisClient };
