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
exports.deleteTable = exports.getTableById = exports.getTableByRest = exports.updateTable = exports.createTable = void 0;
const { mongoose } = require("mongoose");
const tables = require("../models/tableDB");
const createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { table_no, seat } = req.body;
        const partnerId = mongoose.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id);
        const table = yield tables.create({
            partner_id: partnerId,
            table_no: table_no,
            seat: seat,
        });
        res.status(200).json(table);
    }
    catch (err) {
        res.status(400).json({
            err,
        });
        console.log(err);
    }
});
exports.createTable = createTable;
const updateTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const { table_no, seat } = req.body;
    const tableInRest = yield tables.find({
        partner_id: mongoose.Types.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b.partner_id),
        _id: mongoose.Types.ObjectId(id),
    });
    if (tableInRest.length > 0) {
        tables.findByIdAndUpdate(id, {
            $set: {
                table_no: table_no,
                seat: seat,
            },
        }, (err, table) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(table);
            }
        });
    }
    else {
        res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
    }
});
exports.updateTable = updateTable;
const getTableByRest = (req, res) => {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id;
    tables
        .find({
        partner_id: mongoose.Types.ObjectId(id),
    })
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getTableByRest = getTableByRest;
const getTableById = (req, res) => {
    const { id } = req.params;
    tables.findById(id, (err, table) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(table);
        }
    });
};
exports.getTableById = getTableById;
const deleteTable = (req, res) => {
    const { id } = req.params;
    tables.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json({
                status: "delete success",
            });
        }
    });
};
exports.deleteTable = deleteTable;
