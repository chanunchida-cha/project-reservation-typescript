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
exports.getRoundReservCancel = exports.getRoundReservCheckOut = exports.getRoundReservArrived = exports.getRoundReservPending = exports.getRoundReservPerYear = exports.getRoundReservPerMonth = exports.getRoundReservPerWeek = exports.getRoundReservPerDay = exports.getRoundReservNextWeek = exports.getRoundReservLastWeek = exports.countRoundReservTodayByPartner = exports.countRoundReservByPartner = exports.getAlldayReservCancel = exports.getAlldayReservCheckOut = exports.getAlldayReservArrived = exports.getAlldayReservPending = exports.getAlldayReservPerYear = exports.getAlldayReservPerMonth = exports.getAlldayReservPerWeek = exports.getAlldayReservPerDay = exports.getAlldayReservNextWeek = exports.getAlldayReservLastWeek = exports.countAlldayReservTodayByPartner = exports.countAlldayReservByPartner = void 0;
const allDayReservs = require("./../models/allDayReservDB");
const roundReservs = require("./../models/roundReservDB");
const mongoose = require("mongoose");
//---------------------------report allday--------------------------------------------
const countAlldayReservByPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: { partner_id: partnerId },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.countAlldayReservByPartner = countAlldayReservByPartner;
const countAlldayReservTodayByPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
        const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: { partner_id: partnerId, day: new Date(date) },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date().toLocaleDateString());
    }
    catch (err) {
        console.log(err);
    }
});
exports.countAlldayReservTodayByPartner = countAlldayReservTodayByPartner;
const getAlldayReservLastWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const today = new Date();
        const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    $and: [
                        {
                            day: {
                                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
                            },
                        },
                        { day: { $lt: new Date(today) } },
                    ],
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservLastWeek = getAlldayReservLastWeek;
const getAlldayReservNextWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const today = new Date();
        const id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    $and: [
                        { day: { $gt: new Date(today) } },
                        {
                            day: {
                                $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
                            },
                        },
                    ],
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservNextWeek = getAlldayReservNextWeek;
const getAlldayReservPerDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = (_e = req.user) === null || _e === void 0 ? void 0 : _e.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$day" },
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservPerDay = getAlldayReservPerDay;
const getAlldayReservPerWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const id = (_f = req.user) === null || _f === void 0 ? void 0 : _f.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                        week: {
                            $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
                        },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservPerWeek = getAlldayReservPerWeek;
const getAlldayReservPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const id = (_g = req.user) === null || _g === void 0 ? void 0 : _g.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservPerMonth = getAlldayReservPerMonth;
const getAlldayReservPerYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const id = (_h = req.user) === null || _h === void 0 ? void 0 : _h.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: { $year: "$day" },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservPerYear = getAlldayReservPerYear;
const getAlldayReservPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const id = (_j = req.user) === null || _j === void 0 ? void 0 : _j.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "pending",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservPending = getAlldayReservPending;
const getAlldayReservArrived = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const id = (_k = req.user) === null || _k === void 0 ? void 0 : _k.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "arrived",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservArrived = getAlldayReservArrived;
const getAlldayReservCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        const id = (_l = req.user) === null || _l === void 0 ? void 0 : _l.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "check out",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservCheckOut = getAlldayReservCheckOut;
const getAlldayReservCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    try {
        const id = (_m = req.user) === null || _m === void 0 ? void 0 : _m.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield allDayReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "cancel",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAlldayReservCancel = getAlldayReservCancel;
//---------------------------report round--------------------------------------------
const countRoundReservByPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    try {
        const id = (_o = req.user) === null || _o === void 0 ? void 0 : _o.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: { partner_id: partnerId },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.countRoundReservByPartner = countRoundReservByPartner;
const countRoundReservTodayByPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    try {
        const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
        const id = (_p = req.user) === null || _p === void 0 ? void 0 : _p.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: { partner_id: partnerId, day: new Date(date) },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date().toLocaleDateString());
    }
    catch (err) {
        console.log(err);
    }
});
exports.countRoundReservTodayByPartner = countRoundReservTodayByPartner;
const getRoundReservLastWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _q;
    try {
        const today = new Date();
        const id = (_q = req.user) === null || _q === void 0 ? void 0 : _q.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    $and: [
                        {
                            day: {
                                $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
                            },
                        },
                        { day: { $lt: new Date(today) } },
                    ],
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservLastWeek = getRoundReservLastWeek;
const getRoundReservNextWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _r;
    try {
        const today = new Date();
        const id = (_r = req.user) === null || _r === void 0 ? void 0 : _r.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    $and: [
                        { day: { $gt: new Date(today) } },
                        {
                            day: {
                                $lte: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
                            },
                        },
                    ],
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
        console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservNextWeek = getRoundReservNextWeek;
const getRoundReservPerDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _s;
    try {
        const id = (_s = req.user) === null || _s === void 0 ? void 0 : _s.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$day" },
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservPerDay = getRoundReservPerDay;
const getRoundReservPerWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    try {
        const id = (_t = req.user) === null || _t === void 0 ? void 0 : _t.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                        week: {
                            $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
                        },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservPerWeek = getRoundReservPerWeek;
const getRoundReservPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _u;
    try {
        const id = (_u = req.user) === null || _u === void 0 ? void 0 : _u.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservPerMonth = getRoundReservPerMonth;
const getRoundReservPerYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _v;
    try {
        const id = (_v = req.user) === null || _v === void 0 ? void 0 : _v.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                },
            },
            {
                $group: {
                    _id: { $year: "$day" },
                    count: { $count: {} },
                },
            },
        ]);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservPerYear = getRoundReservPerYear;
const getRoundReservPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _w;
    try {
        const id = (_w = req.user) === null || _w === void 0 ? void 0 : _w.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "pending",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservPending = getRoundReservPending;
const getRoundReservArrived = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _x;
    try {
        const id = (_x = req.user) === null || _x === void 0 ? void 0 : _x.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "arrived",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservArrived = getRoundReservArrived;
const getRoundReservCheckOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _y;
    try {
        const id = (_y = req.user) === null || _y === void 0 ? void 0 : _y.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "check out",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservCheckOut = getRoundReservCheckOut;
const getRoundReservCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _z;
    try {
        const id = (_z = req.user) === null || _z === void 0 ? void 0 : _z.partner_id;
        const partnerId = yield mongoose.Types.ObjectId(id);
        const response = yield roundReservs.aggregate([
            {
                $match: {
                    partner_id: partnerId,
                    status: "cancel",
                },
            },
            {
                $count: "count",
            },
        ]);
        res.json(response[0]);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRoundReservCancel = getRoundReservCancel;
