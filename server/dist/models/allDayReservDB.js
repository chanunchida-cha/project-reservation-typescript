"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
