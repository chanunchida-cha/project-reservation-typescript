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
exports.deleteMenu = exports.getMenuById = exports.getMenuByRestId = exports.getMenuByRest = exports.updateMenu = exports.createMenu = void 0;
const { mongoose } = require("mongoose");
const menus = require("../models/menuDB");
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, description, price } = req.body;
        const partnerId = mongoose.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id);
        const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        const menu = yield menus.create({
            partner_id: partnerId,
            name: name,
            description: description,
            price: price,
            image: image,
        });
        res.status(200).json(menu);
    }
    catch (err) {
        res.status(400).json({
            err,
        });
        console.log(err);
    }
});
exports.createMenu = createMenu;
const updateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const { name, description, price } = req.body;
    const menuInRest = yield menus.find({
        _id: mongoose.Types.ObjectId(id),
        partner_id: mongoose.Types.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c.partner_id),
    });
    if (menuInRest.length > 0) {
        if (req.file) {
            const image = req.file.filename;
            menus.findByIdAndUpdate(id, {
                $set: {
                    name: name,
                    description: description,
                    price: price,
                    image: image,
                },
            }, (err, menu) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(menu);
                }
            });
        }
        else {
            menus.findByIdAndUpdate(id, {
                $set: {
                    name: name,
                    description: description,
                    price: price,
                },
            }, (err, menu) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(menu);
                }
            });
        }
    }
    else {
        res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
    }
});
exports.updateMenu = updateMenu;
const getMenuByRest = (req, res) => {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id;
    menus
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
exports.getMenuByRest = getMenuByRest;
const getMenuByRestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield menus
        .find({
        partner_id: mongoose.Types.ObjectId(id),
    })
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.getMenuByRestId = getMenuByRestId;
const getMenuById = (req, res) => {
    const { id } = req.params;
    menus.findById(id, (err, menu) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(menu);
        }
    });
};
exports.getMenuById = getMenuById;
const deleteMenu = (req, res) => {
    const { id } = req.params;
    menus.findByIdAndDelete(id, (err) => {
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
exports.deleteMenu = deleteMenu;
