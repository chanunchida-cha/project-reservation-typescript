import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export type Partner = {
  _id: ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
  address?: string;
  restaurantName?: string;
  note?: string;
  status?: string;
};

const partnerSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPass: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "verification",
  },
  note: {
    type: String,
  },
  token: {
    type: String,
  },
});

const partners = mongoose.model("partners", partnerSchema);
export default partners;
