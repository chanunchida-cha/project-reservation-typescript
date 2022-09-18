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
exports.getInfoRestaurantById = exports.getAllInfoRestaurant = exports.updateInfoRestaurant = exports.createInfoRestaurant = void 0;
const restaurants = require("../models/restaurantDB");
const { mongoose } = require("mongoose");
//----------------------------information------------------------------------------------------------------
const createInfoRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { description, contact, address, type_rest, time_length, openday, rounds, } = req.body;
        const partnerId = mongoose.Types.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id);
        const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        const restaurant = yield restaurants.create({
            partner_id: partnerId,
            description: description,
            contact: contact,
            address: address,
            type_rest: type_rest,
            time_length: time_length,
            openday: openday,
            rounds: rounds,
            image: image,
        });
        res.status(200).json(restaurant);
    }
    catch (err) {
        console.log(err);
    }
});
exports.createInfoRestaurant = createInfoRestaurant;
const updateInfoRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { description, contact, address, type_rest, time_length, openday, rounds, } = req.body;
    const restInfo = yield restaurants.aggregate([
        {
            $match: {
                partner_id: mongoose.Types.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c.partner_id),
            },
        },
        {
            $lookup: {
                from: "partners",
                localField: "partner_id",
                foreignField: "_id",
                as: "information",
            },
        },
    ]);
    if (restInfo.length > 0) {
        if (req.file) {
            const image = req.file.filename;
            restaurants.findByIdAndUpdate(restInfo[0]._id, {
                $set: {
                    description: description,
                    contact: contact,
                    address: address,
                    type_rest: type_rest,
                    time_length: time_length,
                    openday: openday,
                    rounds: rounds,
                    image: image,
                },
            }, (err, restaurant) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(restaurant);
                }
            });
        }
        else {
            restaurants.findByIdAndUpdate(restInfo[0]._id, {
                $set: {
                    description: description,
                    contact: contact,
                    address: address,
                    type_rest: type_rest,
                    time_length: time_length,
                    openday: openday,
                    rounds: rounds,
                },
            }, (err, restaurant) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(restaurant);
                }
            });
        }
    }
    else {
        res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
    }
    console.log(restInfo[0]._id);
});
exports.updateInfoRestaurant = updateInfoRestaurant;
const getAllInfoRestaurant = (req, res) => {
    restaurants
        .aggregate([
        {
            $lookup: {
                from: "partners",
                localField: "partner_id",
                foreignField: "_id",
                as: "information",
            },
        },
        {
            $unwind: "$information",
        },
    ])
        .then((response) => {
        res.json(response);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getAllInfoRestaurant = getAllInfoRestaurant;
const getInfoRestaurantById = (req, res) => {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.partner_id;
    restaurants
        .aggregate([
        {
            $match: {
                partner_id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "partners",
                localField: "partner_id",
                foreignField: "_id",
                as: "information",
            },
        },
        {
            $unwind: "$information",
        },
    ])
        .then((response) => {
        res.json(response[0]);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getInfoRestaurantById = getInfoRestaurantById;
