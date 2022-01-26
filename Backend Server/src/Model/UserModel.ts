import mongoose, { Schema, Document, Model } from "mongoose";
import AssociationModel, { IAssociationModel } from "./AssociationModel";
import DonatorModel, { IDonatorModel } from "./DonatorModel";

export interface IUserModel extends Document {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  donator: IDonatorModel,
  association: IAssociationModel,
}

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  donator: DonatorModel,
  association: AssociationModel
});

export default mongoose.model<IUserModel>("User", userSchema);
