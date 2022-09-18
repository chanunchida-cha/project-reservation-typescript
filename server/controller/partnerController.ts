import { Response, Request } from "express";
const restaurants = require("../models/restaurantDB");
const { mongoose } = require("mongoose");
import { Info } from "../models/restaurantDB";

//----------------------------information------------------------------------------------------------------
export const createInfoRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      description,
      contact,
      address,
      type_rest,
      time_length,
      openday,
      rounds,
    } = req.body;
    const partnerId = mongoose.Types.ObjectId(req.user?.partner_id);
    const image = req.file?.filename;

    const restaurant = await restaurants.create({
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
  } catch (err) {
    console.log(err);
  }
};

export const updateInfoRestaurant = async (req: Request, res: Response) => {
  const {
    description,
    contact,
    address,
    type_rest,
    time_length,
    openday,
    rounds,
  } = req.body;

  const restInfo = await restaurants.aggregate([
    {
      $match: {
        partner_id: mongoose.Types.ObjectId(req.user?.partner_id),
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
      restaurants.findByIdAndUpdate(
        restInfo[0]._id,
        {
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
        },
        (err: any, restaurant: Info) => {
          if (err) {
            console.log(err);
          } else {
            res.json(restaurant);
          }
        }
      );
    } else {
      restaurants.findByIdAndUpdate(
        restInfo[0]._id,
        {
          $set: {
            description: description,
            contact: contact,
            address: address,
            type_rest: type_rest,
            time_length: time_length,
            openday: openday,
            rounds: rounds,
          },
        },
        (err: any, restaurant: Info) => {
          if (err) {
            console.log(err);
          } else {
            res.json(restaurant);
          }
        }
      );
    }
  } else {
    res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
  }
  console.log(restInfo[0]._id);
};

export const getAllInfoRestaurant = (req: Request, res: Response) => {
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
    .then((response: Info[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getInfoRestaurantById = (req: Request, res: Response) => {
  const id = req.user?.partner_id;
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
    .then((response: Info[]) => {
      res.json(response[0]);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
