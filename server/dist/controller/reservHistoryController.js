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
exports.getAlldayReservByCustomerHistory = exports.getAlldayReservByCustomerArrived = exports.getAlldayReservByCustomerPending = exports.getRoundReservByCustomerHistory = exports.getRoundReservByCustomerArrived = exports.getRoundReservByCustomerPending = void 0;
const roundReservs = require("./../models/roundReservDB");
const allDayReservs = require("./../models/allDayReservDB");
const mongoose = require("mongoose");
//---------------------round-------------------------------------------------
const getRoundReservByCustomerPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
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
exports.getRoundReservByCustomerPending = getRoundReservByCustomerPending;
const getRoundReservByCustomerArrived = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id;
    const date = new Date().toISOString().split("T", 1);
    roundReservs
        .aggregate([
        {
            $match: {
                customer_id: mongoose.Types.ObjectId(id),
                day: { $gte: new Date(String(date)) },
                status: "arrived",
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
exports.getRoundReservByCustomerArrived = getRoundReservByCustomerArrived;
const getRoundReservByCustomerHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user_id;
    roundReservs
        .aggregate([
        {
            $match: {
                customer_id: mongoose.Types.ObjectId(id),
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
exports.getRoundReservByCustomerHistory = getRoundReservByCustomerHistory;
//------------------------------allDay-----------------------------------------
const getAlldayReservByCustomerPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.user_id;
    const date = new Date().toISOString().split("T", 1);
    allDayReservs
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
exports.getAlldayReservByCustomerPending = getAlldayReservByCustomerPending;
const getAlldayReservByCustomerArrived = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = (_e = req.user) === null || _e === void 0 ? void 0 : _e.user_id;
    const date = new Date().toISOString().split("T", 1);
    allDayReservs
        .aggregate([
        {
            $match: {
                customer_id: mongoose.Types.ObjectId(id),
                day: { $gte: new Date(String(date)) },
                status: "arrived",
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
exports.getAlldayReservByCustomerArrived = getAlldayReservByCustomerArrived;
const getAlldayReservByCustomerHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = (_f = req.user) === null || _f === void 0 ? void 0 : _f.user_id;
    allDayReservs
        .aggregate([
        {
            $match: {
                customer_id: mongoose.Types.ObjectId(id),
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
exports.getAlldayReservByCustomerHistory = getAlldayReservByCustomerHistory;
