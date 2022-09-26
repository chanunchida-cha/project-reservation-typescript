import admins from "../models/adminDB";
import partners from "../models/partnerDB";
import Users from "../models/userDB";
const allDayReservs = require("./../models/allDayReservDB");
const roundReservs = require("./../models/roundReservDB");
const restaurants = require("../models/restaurantDB");
const { mongoose } = require("mongoose");
import { Response, Request } from "express";

export const countCustomer = async (req: Request, res: Response) => {
  try {
    const response = await Users.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

export const countPartner = async (req: Request, res: Response) => {
  try {
    const response = await partners.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

export const countAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admins.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

export const countRestInfo = async (req: Request, res: Response) => {
  try {
    const response = await restaurants.aggregate([
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
export const countPartnerVerification = async (req: Request, res: Response) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "verification" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
export const countPartnerApprove = async (req: Request, res: Response) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "approve" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
export const countPartnerDisApprove = async (req: Request, res: Response) => {
  try {
    const response = await partners.aggregate([
      {
        $match: { status: "disapprove" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

export const groupPartnerByTypeAllDay = async (req: Request, res: Response) => {
  try {
    const response = await restaurants.aggregate([
      {
        $match: { type_rest: "allDay" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};
export const groupPartnerByTypeRound = async (req: Request, res: Response) => {
  try {
    const response = await restaurants.aggregate([
      {
        $match: { type_rest: "rounds" },
      },
      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
  } catch (err) {
    console.log(err);
  }
};

export const groupReservByPartnerForWeek = async (
  req: Request,
  res: Response
) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const groupReservByPartnerForMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },

      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
export const groupReservByPartnerForYear = async (
  req: Request,
  res: Response
) => {
  try {
    const response1 = await allDayReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);
    const response2 = await roundReservs.aggregate([
      {
        $group: {
          _id: {
            partner_id: "$partner_id",

            year: { $year: "$day" },
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "partners",
          localField: "_id.partner_id",
          foreignField: "_id",
          as: "information",
        },
      },
      {
        $unwind: "$information",
      },
    ]);

    const response = response1.concat(response2);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
