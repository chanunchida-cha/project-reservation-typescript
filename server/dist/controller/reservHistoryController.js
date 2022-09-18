"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const roundReservs = require("./../models/roundReservDB");
const allDayReservs = require("./../models/allDayReservDB");
const mongoose = require("mongoose");
//---------------------round-------------------------------------------------
const getRoundReservByCustomerPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const date = new Date().toISOString().split("T", 1);
    roundReservs
        .aggregate([
        {
            $match: {
                customer_id: mongoose.Types.ObjectId(id),
                day: { $gte: new Date(String(date)) },
                status: "pending",
            },
        },
        {
            $lookup: {
                from: "partners",
                localField: "partner_id",
                foreignField: "_id",
                as: "partner",
            },
        },
        {
            $unwind: "$partner",
        },
    ])
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err);
    });
});
