import { Response, Request } from "express";
const roundReservs = require("./../models/roundReservDB");
import { RoundReserv } from "../models/roundReservDB";
const allDayReservs = require("./../models/allDayReservDB");
import { AllDayReserv } from "../models/allDayReservDB";
const mongoose = require("mongoose");

//---------------------round-------------------------------------------------
const getRoundReservByCustomerPending = async (req: Request, res: Response) => {
  const { id } = req.params;
  const date:string[] = new Date().toISOString().split("T", 1);
  roundReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(String(date)) },
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "partner_id",
          foreignField: "_id",
          as: "partner",
        },
      },
      {
        $unwind: "$partner",
      },
    ])
    .then((response:RoundReserv[]) => {
      res.json(response);
    })
    .catch((err:any) => {
      console.log(err);
    });
};
