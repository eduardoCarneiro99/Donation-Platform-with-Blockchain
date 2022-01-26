import mongoose, { Schema, Document, Model } from "mongoose";
import { IExpenditureModel } from "./ExpenditureModel";

export interface IAssociationModel extends Document {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  description: string;
  donationsCounter: number;
  totalCoinReceived: number;
  expenditureList: Array<IExpenditureModel>;
}

const landSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  donationsCounter: { type: Number, required: true },
  totalCoinReceived: { type: Number, required: true },
  expenditureList: { type: Array, ref: "Expenditure", required: true },
});

export default mongoose.model<IAssociationModel>("Association", landSchema);
