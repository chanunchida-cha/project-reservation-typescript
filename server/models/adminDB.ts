import mongoose from 'mongoose';
import { ObjectId } from "mongoose";

export type Admin = {
  _id: ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
};

const adminSchema =new mongoose.Schema({
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
        unique: true,
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
      token: {
        type: String,
      },
})

const admins = mongoose.model("admins", adminSchema);
export default admins