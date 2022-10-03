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
exports.getAdmin = exports.adminLogin = exports.getPartner = exports.partnerLogin = exports.getCustomer = exports.facebookLogin = exports.customerLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const adminDB_1 = __importDefault(require("../models/adminDB"));
const partnerDB_1 = __importDefault(require("../models/partnerDB"));
const userDB_1 = __importDefault(require("../models/userDB"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//----------customer------------------------
const customerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!(username && password)) {
            res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
        }
        const user = yield userDB_1.default.findOne({
            username: username,
        });
        if (user && (yield bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, username }, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            user.token = token;
            res.status(200).json(user);
        }
        res.status(404).json({ error: "กรุณาตรวจสอบ username และ รหัสผ่าน" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.customerLogin = customerLogin;
const facebookLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, userID } = req.body;
    const urlGrapFacebook = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
    try {
        const response = yield axios_1.default.get(urlGrapFacebook);
        console.log(response);
        const { id, name, email } = response.data;
        const user = yield userDB_1.default.findOne({ email: email });
        if (user) {
            const token = jwt.sign({ user_id: user._id, name }, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            user.token = token;
            res.status(200).json(user);
        }
        else {
            const password = yield bcrypt.hash(name + process.env.JWT_SECRET, 10);
            const confrimPassword = yield bcrypt.hash(name + process.env.JWT_SECRET, 10);
            const user = yield userDB_1.default.create({
                username: name,
                firstname: name,
                lastname: name,
                email: email,
                password: password,
                confirmPass: confrimPassword,
                facebook_id: accessToken,
            });
            const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            user.token = token;
            res.status(200).json(user);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.facebookLogin = facebookLogin;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userDB_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id);
        if (!user)
            throw Error("User does not exist");
        res.json(user);
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
exports.getCustomer = getCustomer;
//----------partner------------------------
const partnerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!(username && password)) {
            res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
        }
        const partner = yield partnerDB_1.default.findOne({
            username: username,
        });
        if (partner && (yield bcrypt.compare(password, partner.password))) {
            const token = jwt.sign({ partner_id: partner._id, username }, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            partner.token = token;
            res.status(200).json(partner);
        }
        res.status(404).json({ error: "กรุณาตรวจสอบ username และ รหัสผ่าน " });
    }
    catch (err) {
        console.log(err);
    }
});
exports.partnerLogin = partnerLogin;
const getPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const partner = yield partnerDB_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.partner_id);
        if (!partner)
            throw Error("User does not exist");
        res.json(partner);
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
exports.getPartner = getPartner;
//----------admin------------------------
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!(username && password)) {
            res.status(400).json({ error: "All input is requires" });
        }
        const admin = yield adminDB_1.default.findOne({
            username: username,
        });
        if (admin && (yield bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ admin_id: admin._id, username }, process.env.JWT_SECRET, {
                expiresIn: "5h",
            });
            admin.token = token;
            res.status(200).json(admin);
        }
        res.status(404).json({ error: "check username or password " });
    }
    catch (err) {
        console.log(err);
    }
});
exports.adminLogin = adminLogin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const admin = yield adminDB_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.admin_id);
        if (!admin)
            throw Error("User does not exist");
        res.json(admin);
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});
exports.getAdmin = getAdmin;
