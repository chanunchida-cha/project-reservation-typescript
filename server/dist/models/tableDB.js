"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tables = new mongoose_1.default.Schema({
    partner_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    table_no: {
        type: String,
        required: true,
    },
    seat: {
        type: String,
        required: true,
    },
});
module.exports = mongoose_1.default.model("tables", tables);
