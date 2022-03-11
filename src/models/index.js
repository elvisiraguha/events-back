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
  active: Boolean,
});

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  regural: { sits: Number, price: Number },
  vip: { sits: Number, price: Number },
  vvip: { sits: Number, price: Number },
  currency: String,
  createdAt: Date,
  happeningAt: { start: Date, end: Date },
  organizer: String,
});

const bookingSchema = new mongoose.Schema({
  event: String,
  attendee: String,
  paid: String,
  paidAmount: Number,
  sits: { regular: Number, vip: Number, vvip: Number },
  currency: String,
  createdAt: Date,
  happeningAt: { start: Date, end: Date },
});

const organizerRequestSchema = new mongoose.Schema({
  user: String,
  comment: String,
  requestedAt: Date,
});

export const User = mongoose.model("User", userSchema);
export const Event = mongoose.model("Event", eventSchema);
export const Booking = mongoose.model("Booking", bookingSchema);
export const OrganizerRequest = mongoose.model(
  "OrganizerRequest",
  organizerRequestSchema
);
