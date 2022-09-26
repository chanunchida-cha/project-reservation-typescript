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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupReservByPartnerForYear = exports.groupReservByPartnerForMonth = exports.groupReservByPartnerForWeek = exports.groupPartnerByTypeRound = exports.groupPartnerByTypeAllDay = exports.countPartnerDisApprove = exports.countPartnerApprove = exports.countPartnerVerification = exports.countRestInfo = exports.countAdmin = exports.countPartner = exports.countCustomer = void 0;
const adminDB_1 = __importDefault(require("../models/adminDB"));
const partnerDB_1 = __importDefault(require("../models/partnerDB"));
const userDB_1 = __importDefault(require("../models/userDB"));
const allDayReservs = require("./../models/allDayReservDB");
const roundReservs = require("./../models/roundReservDB");
const restaurants = require("../models/restaurantDB");
const { mongoose } = require("mongoose");
const countCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userDB_1.default.aggregate([
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
exports.countCustomer = countCustomer;
const countPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield partnerDB_1.default.aggregate([
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
exports.countPartner = countPartner;
const countAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield adminDB_1.default.aggregate([
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
exports.countAdmin = countAdmin;
const countRestInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield restaurants.aggregate([
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
exports.countRestInfo = countRestInfo;
const countPartnerVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield partnerDB_1.default.aggregate([
            {
                $match: { status: "verification" },
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
exports.countPartnerVerification = countPartnerVerification;
const countPartnerApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield partnerDB_1.default.aggregate([
            {
                $match: { status: "approve" },
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
exports.countPartnerApprove = countPartnerApprove;
const countPartnerDisApprove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield partnerDB_1.default.aggregate([
            {
                $match: { status: "disapprove" },
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
exports.countPartnerDisApprove = countPartnerDisApprove;
const groupPartnerByTypeAllDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield restaurants.aggregate([
            {
                $match: { type_rest: "allDay" },
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
exports.groupPartnerByTypeAllDay = groupPartnerByTypeAllDay;
const groupPartnerByTypeRound = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield restaurants.aggregate([
            {
                $match: { type_rest: "rounds" },
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
exports.groupPartnerByTypeRound = groupPartnerByTypeRound;
const groupReservByPartnerForWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response1 = yield allDayReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                        week: {
                            $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
                        },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response2 = yield roundReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                        week: {
                            $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
                        },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response = response1.concat(response2);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.groupReservByPartnerForWeek = groupReservByPartnerForWeek;
const groupReservByPartnerForMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response1 = yield allDayReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response2 = yield roundReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                        month: { $month: "$day" },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response = response1.concat(response2);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.groupReservByPartnerForMonth = groupReservByPartnerForMonth;
const groupReservByPartnerForYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response1 = yield allDayReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response2 = yield roundReservs.aggregate([
            {
                $group: {
                    _id: {
                        partner_id: "$partner_id",
                        year: { $year: "$day" },
                    },
                    count: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "partners",
                    localField: "_id.partner_id",
                    foreignField: "_id",
                    as: "information",
                },
            },
            {
                $unwind: "$information",
            },
        ]);
        const response = response1.concat(response2);
        res.json(response);
    }
    catch (err) {
        console.log(err);
    }
});
exports.groupReservByPartnerForYear = groupReservByPartnerForYear;
