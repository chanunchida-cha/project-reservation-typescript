import express, { Express, Request, Response } from "express";
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
import registerRoute from "./routes/registerRoute";
import authRoute from "./routes/authRoute";
import rudUserRoute from "./routes/rudUserRoute";
import partnerRoute from "./routes/partnerRoute";
import tableRoute from "./routes/tableRoute";
import menuRoute from "./routes/menuRoute";
import alldayReservRoute from "./routes/alldayReservRoute";
import roundReservRoute from "./routes/roundReservRoute";

require("dotenv").config();

const app: Express = express();
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
  .catch((error: any) => {
    console.log(error);
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan());

//route
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/rud", rudUserRoute);
app.use("/partner", partnerRoute);
app.use("/table", tableRoute);
app.use("/menu", menuRoute);
app.use("/reserv", alldayReservRoute);
app.use("/reserv", roundReservRoute);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
