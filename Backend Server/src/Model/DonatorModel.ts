import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDonatorModel extends Document {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  country: string;
  donationsCounter: number;
  totalCoinDonated: number;
}

const landSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  donationsCounter: { type: Number, required: true },
  totalCoinDonated: { type: Number, required: true },
});

export default mongoose.model<IDonatorModel>("Donator", landSchema);
