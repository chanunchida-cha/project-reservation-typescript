const mongoose = require("mongoose");
import { ObjectId } from "mongoose";

type SelfReserv = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
};

type Customer = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
};
export type AllDayReserv = {
  _id: ObjectId;
  reservNumber: string;
  partner_id: ObjectId;
  day: Date;
  start: string;
  end: string;
  amount: string;
  customer?: Customer[];
  self_reserv?: SelfReserv;
  table: string[];
  status: string;
};
const allDayReservs = mongoose.Schema({
  reservNumber: {
    type: String,
    required: true,
  },
  partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  self_reserv: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  table: [],
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("allDayReservs", allDayReservs);
