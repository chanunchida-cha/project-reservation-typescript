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
exports.createCustomer = exports.createPartner = exports.createAdmin = void 0;
const adminDB_1 = __importDefault(require("../models/adminDB"));
const partnerDB_1 = __importDefault(require("../models/partnerDB"));
const userDB_1 = __importDefault(require("../models/userDB"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//----------------------------------admin-------------------------------------
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, email, phoneNumber, password, confirmPass, } = req.body;
        if (!(username && email && phoneNumber && password && confirmPass)) {
            return res.status(400).json({ error: "All input is requires" });
        }
        const oldAdmin = yield adminDB_1.default.findOne({ email, username });
        if (oldAdmin) {
            return res.status(400).json({ error: "บัญชีนี้มีผู้ใช้งานแล้ว" });
        }
        if (password != confirmPass) {
            return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่าน" });
        }
        const encrytedPassword = yield bcrypt.hash(password, 10);
        const encrytedConfirmPassword = yield bcrypt.hash(confirmPass, 10);
        const admin = yield adminDB_1.default.create({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            phoneNumber: phoneNumber,
            password: encrytedPassword,
            confirmPass: encrytedConfirmPassword,
        });
        //creat token
        const token = jwt.sign({ admin_id: admin._id, email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        admin.token = token;
        res.status(200).json(admin);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAdmin = createAdmin;
//------------------partner----------------------------------------------
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantName, firstname, lastname, username, email, password, confirmPass, phoneNumber, address, } = req.body;
        if (!(restaurantName &&
            firstname &&
            lastname &&
            username &&
            email &&
            password &&
            confirmPass &&
            phoneNumber &&
            address)) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
        }
        const oldAdmin = yield partnerDB_1.default.findOne({ email, username });
        if (oldAdmin) {
            return res.status(400).json({ error: "มีผู้ใช้งานแล้ว" });
        }
        if (password != confirmPass) {
            return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง" });
        }
        const encrytedPassword = yield bcrypt.hash(password, 10);
        const encrytedConfirmPassword = yield bcrypt.hash(confirmPass, 10);
        const partner = yield partnerDB_1.default.create({
            restaurantName: restaurantName,
            firstname: firstname,
            lastname: lastname,
            username: username.toLowerCase(),
            password: encrytedPassword,
            confirmPass: encrytedConfirmPassword,
            email: email.toLowerCase(),
            phoneNumber: phoneNumber,
            address: address,
        });
        //creat token
        const token = jwt.sign({ partner_id: partner._id, email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        partner.token = token;
        res.status(200).json(partner);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPartner = createPartner;
//------------------------customer-------------------------------------
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, email, phoneNumber, password, confirmPass, } = req.body;
        if (!(username && email && phoneNumber && password && confirmPass)) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
        }
        const oldUser = yield userDB_1.default.findOne({ email, username });
        if (oldUser) {
            return res.status(400).json({ error: "มีผู้ใช้แล้ว" });
        }
        if (password != confirmPass) {
            return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง" });
        }
        const encrytedPassword = yield bcrypt.hash(password, 10);
        const encrytedConfirmPassword = yield bcrypt.hash(confirmPass, 10);
        const user = yield userDB_1.default.create({
            username: username.toLowerCase(),
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            phoneNumber: phoneNumber,
            password: encrytedPassword,
            confirmPass: encrytedConfirmPassword,
        });
        //creat token
        const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        user.token = token;
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
    }
});
exports.createCustomer = createCustomer;
