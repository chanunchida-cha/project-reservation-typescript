import { Response, Request } from "express";
const roundReservs = require("./../models/roundReservDB");
import { RoundReserv } from "../models/roundReservDB";
const allDayReservs = require("./../models/allDayReservDB");
import { AllDayReserv } from "../models/allDayReservDB";
const mongoose = require("mongoose");

//---------------------round-------------------------------------------------
export const getRoundReservByCustomerPending = async (
  req: Request,
  res: Response
) => {
  const id = req.user?.user_id;
  const date: string[] = new Date().toISOString().split("T", 1);
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
    .then((response: RoundReserv[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getRoundReservByCustomerArrived = async (
  req: Request,
  res: Response
) => {
  const id = req.user?.user_id;
  const date = new Date().toISOString().split("T", 1);
  roundReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(String(date)) },
          status: "arrived",
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
    .then((response: RoundReserv[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getRoundReservByCustomerHistory = async (req :Request, res:Response) => {
  const id = req.user?.user_id;

  roundReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
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

//------------------------------allDay-----------------------------------------

export const getAlldayReservByCustomerPending = async (req:Request, res:Response) => {
  const id = req.user?.user_id;
  const date = new Date().toISOString().split("T", 1);
  allDayReservs
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
    .then((response:AllDayReserv[]) => {
      res.json(response);
    })
    .catch((err:any) => {
      console.log(err);
    });
};

export const getAlldayReservByCustomerArrived = async (req:Request, res:Response) => {
  const id = req.user?.user_id;
  const date = new Date().toISOString().split("T", 1);
  allDayReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
          day: { $gte: new Date(String(date)) },
          status: "arrived",
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
    .then((response:AllDayReserv[]) => {
      res.json(response);
    })
    .catch((err:any) => {
      console.log(err);
    });
};

export const getAlldayReservByCustomerHistory = async (req:Request, res:Response) => {
  const id = req.user?.user_id;

  allDayReservs
    .aggregate([
      {
        $match: {
          customer_id: mongoose.Types.ObjectId(id),
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
    .then((response:AllDayReserv[]) => {
      res.json(response);
    })
    .catch((err:any) => {
      console.log(err);
    });
};