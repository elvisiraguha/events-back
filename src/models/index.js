import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  userName: String,
  registeredOn: Date,
  role: String,
  email: String,
  password: String,
});

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  regural: { sits: Number, price: Number },
  vip: { sits: Number, price: Number },
  vvip: { sits: Number, price: Number },
  currency: String,
  createdOn: Date,
  happeningOn: { start: Date, end: Date },
  organizer: String,
});

export const User = mongoose.model("User", userSchema);
export const Event = mongoose.model("Event", eventSchema);
