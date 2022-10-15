"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users = new mongoose_1.default.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPass: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    facebook_id: {
        type: String,
    },
    google_id: {
        type: String,
    },
});
const Users = mongoose_1.default.model("Users", users);
exports.default = Users;
