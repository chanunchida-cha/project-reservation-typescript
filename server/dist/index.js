"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const rudUserRoute_1 = __importDefault(require("./routes/rudUserRoute"));
const partnerRoute_1 = __importDefault(require("./routes/partnerRoute"));
const tableRoute_1 = __importDefault(require("./routes/tableRoute"));
const menuRoute_1 = __importDefault(require("./routes/menuRoute"));
const alldayReservRoute_1 = __importDefault(require("./routes/alldayReservRoute"));
const roundReservRoute_1 = __importDefault(require("./routes/roundReservRoute"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
//connect DB
mongoose
    .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
})
    .then(() => {
    console.log("connect success");
})
    .catch((error) => {
    console.log(error);
});
//middleware
app.use(express_1.default.json());
app.use(cors());
app.use(morgan());
//route
app.use("/register", registerRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/rud", rudUserRoute_1.default);
app.use("/partner", partnerRoute_1.default);
app.use("/table", tableRoute_1.default);
app.use("/menu", menuRoute_1.default);
app.use("/reserv", alldayReservRoute_1.default);
app.use("/reserv", roundReservRoute_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
