import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export type User = {
  _id: ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
};

const users = new mongoose.Schema({
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
});

const Users = mongoose.model("Users", users);
export default Users;
