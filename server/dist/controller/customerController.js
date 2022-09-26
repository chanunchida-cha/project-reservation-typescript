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
exports.resetPassword = exports.editCustomer = void 0;
const userDB_1 = __importDefault(require("../models/userDB"));
const bcrypt = require("bcrypt");
const editCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    userDB_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id, {
        $set: req.body,
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});
exports.editCustomer = editCustomer;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { oldPassWord, newPassWord, confirmNewPassWord } = req.body;
        // encrytedPassword = await bcrypt.hash(oldPassWord, 10);
        const user = yield userDB_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id);
        if (newPassWord != confirmNewPassWord) {
            return res
                .status(404)
                .json({ error: "รหัสผ่านไม่ตรงกัน กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
        }
        const encrytedPassword = yield bcrypt.hash(newPassWord, 10);
        if (yield bcrypt.compare(oldPassWord, user === null || user === void 0 ? void 0 : user.password)) {
            yield userDB_1.default.findByIdAndUpdate({
                _id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.user_id,
            }, {
                password: encrytedPassword,
            });
            return res.status(200).json({ msg: "reset password " });
        }
        res.status(404).json({ error: "กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.resetPassword = resetPassword;
