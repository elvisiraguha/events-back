import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { User, Event } from "./models/index";

config();
const app = express();
app.use(bodyParser.json());
const port = 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/users", (req, res) => {
    const user = new User(req.body);
    user.save();
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
// `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@eventsbooking.ailnr.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
