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
exports.deleteAdmin = exports.editAdminBySelf = exports.editAdminByAdmin = exports.getAdminById = exports.getAllAdmins = exports.deletePartner = exports.editPartnerByPartner = exports.editPartnerByAdmin = exports.updateStatusPartner = exports.getPartnerById = exports.getPartnerDisApprove = exports.getPartnerApprove = exports.getPartnerVerify = exports.getAllPartner = exports.editCustomerByCustomer = exports.editCustomerByAdmin = exports.deleteCustomer = exports.getCustomerById = exports.getCustomers = void 0;
const adminDB_1 = __importDefault(require("../models/adminDB"));
const partnerDB_1 = __importDefault(require("../models/partnerDB"));
const userDB_1 = __importDefault(require("../models/userDB"));
//-------------------------customer---------------------------------
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userDB_1.default.find((err, users) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});
exports.getCustomers = getCustomers;
const getCustomerById = (req, res) => {
    const { id } = req.params;
    userDB_1.default.findById(id, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
};
exports.getCustomerById = getCustomerById;
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    userDB_1.default.findByIdAndDelete(id, (err) => {
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
exports.deleteCustomer = deleteCustomer;
const editCustomerByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const admin = yield adminDB_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_id);
    if (admin !== undefined) {
        userDB_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        }, (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(user);
            }
        });
    }
    else {
        res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
    }
});
exports.editCustomerByAdmin = editCustomerByAdmin;
const editCustomerByCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    userDB_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id, {
        $set: req.body,
    }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
        }
        else {
            res.json(user);
        }
    });
});
exports.editCustomerByCustomer = editCustomerByCustomer;
//-----------------------partner-------------------------------------------
const getAllPartner = (req, res) => {
    partnerDB_1.default.find((err, partners) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partners);
        }
    });
};
exports.getAllPartner = getAllPartner;
const getPartnerVerify = (req, res) => {
    partnerDB_1.default.find({ status: "verification" }, (err, partners) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partners);
        }
    });
};
exports.getPartnerVerify = getPartnerVerify;
const getPartnerApprove = (req, res) => {
    partnerDB_1.default.find({ status: "approve" }, (err, partners) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partners);
        }
    });
};
exports.getPartnerApprove = getPartnerApprove;
const getPartnerDisApprove = (req, res) => {
    partnerDB_1.default.find({ status: "disapprove" }, (err, partners) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partners);
        }
    });
};
exports.getPartnerDisApprove = getPartnerDisApprove;
const getPartnerById = (req, res) => {
    const { id } = req.params;
    partnerDB_1.default.findById(id, (err, partner) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partner);
        }
    });
};
exports.getPartnerById = getPartnerById;
const updateStatusPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const admin = yield adminDB_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.admin_id);
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
const editPartnerByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    const admin = yield adminDB_1.default.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d.admin_id);
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
exports.editPartnerByAdmin = editPartnerByAdmin;
const editPartnerByPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    partnerDB_1.default.findByIdAndUpdate((_e = req.user) === null || _e === void 0 ? void 0 : _e.partner_id, {
        $set: req.body,
    }, (err, partner) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(partner);
        }
    });
});
exports.editPartnerByPartner = editPartnerByPartner;
const deletePartner = (req, res) => {
    const { id } = req.params;
    partnerDB_1.default.findByIdAndDelete(id, (err) => {
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
exports.deletePartner = deletePartner;
//-------------------admin-------------------------------------------------
const getAllAdmins = (req, res) => {
    adminDB_1.default.find((err, admin) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(admin);
        }
    });
};
exports.getAllAdmins = getAllAdmins;
const getAdminById = (req, res) => {
    const { id } = req.params;
    adminDB_1.default.findById(id, (err, admin) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(admin);
        }
    });
};
exports.getAdminById = getAdminById;
const editAdminByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { id } = req.params;
    const admin = yield adminDB_1.default.findById((_f = req.user) === null || _f === void 0 ? void 0 : _f.admin_id);
    if (admin !== undefined) {
        adminDB_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        }, (err, admin) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(admin);
            }
        });
    }
    else {
        res.status(400).json({ err: "ไม่มีสิทธิแก้ไข" });
    }
});
exports.editAdminByAdmin = editAdminByAdmin;
const editAdminBySelf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    adminDB_1.default.findByIdAndUpdate((_g = req.user) === null || _g === void 0 ? void 0 : _g.admin_id, {
        $set: req.body,
    }, (err, admin) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(admin);
        }
    });
});
exports.editAdminBySelf = editAdminBySelf;
const deleteAdmin = (req, res) => {
    const { id } = req.params;
    adminDB_1.default.findByIdAndDelete(id, (err) => {
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
exports.deleteAdmin = deleteAdmin;
