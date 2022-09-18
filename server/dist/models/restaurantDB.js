"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const info_openday = {
    type: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
};
const restaurants = new mongoose_1.default.Schema({
    partner_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    type_rest: {
        type: String,
    },
    time_length: {
        type: String,
    },
    rounds: {
        type: Array,
    },
    openday: {
        monday: info_openday,
        tuesday: info_openday,
        wednesday: info_openday,
        thursday: info_openday,
        friday: info_openday,
        saturday: info_openday,
        sunday: info_openday,
    },
});
module.exports = mongoose_1.default.model("restaurants", restaurants);
