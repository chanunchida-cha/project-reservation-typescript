"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    },
});
const filerFilter = (req, file, callback) => {
    callback(null, true);
};
let upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: filerFilter,
});
module.exports = upload.single("image");
