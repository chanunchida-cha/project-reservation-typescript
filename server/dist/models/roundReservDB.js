"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const roundsReservs = mongoose.Schema({
    reservNumber: {
        type: String,
        required: true,
    },
    partner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    table: [],
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
    status: {
        type: String,
        default: "pending",
    },
});
module.exports = mongoose.model("roundsReservs", roundsReservs);
