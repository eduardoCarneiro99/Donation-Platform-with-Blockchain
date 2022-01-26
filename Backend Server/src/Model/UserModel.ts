import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserModel extends Document {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, ref: "Land", required: true },
});

export default mongoose.model<IUserModel>("User", userSchema);
