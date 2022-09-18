import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export type Table = {
  _id: ObjectId;
  partner_id: ObjectId;
  table_no: string;
  seat: string;
};

const tables = new mongoose.Schema({
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  table_no: {
    type: String,
    required: true,
  },
  seat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tables", tables);
