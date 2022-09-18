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
exports.updateStatusPartner = exports.getPartner = void 0;
const adminDB_1 = __importDefault(require("../models/adminDB"));
const partnerDB_1 = __importDefault(require("../models/partnerDB"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getPartner = (req, res) => {
    partnerDB_1.default.find((err, partners) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partners);
        }
    });
};
exports.getPartner = getPartner;
const updateStatusPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const admin = yield adminDB_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_id);
    if (admin !== undefined) {
        partnerDB_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        }, (err, partner) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(partner);
            }
        });
    }
    else {
        res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
    }
});
exports.updateStatusPartner = updateStatusPartner;
