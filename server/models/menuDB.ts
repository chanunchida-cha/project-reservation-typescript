import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export type Menu = {
  _id: ObjectId;
  partner_id: ObjectId;
  name: string;
  description: string;
  price: string;
  image: string;
};

const menus = new mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("menus", menus);
