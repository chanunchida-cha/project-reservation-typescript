import { Response, Request } from "express";
const { mongoose } = require("mongoose");
import { Menu } from "../models/menuDB";
const menus = require("../models/menuDB");

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const partnerId = mongoose.Types.ObjectId(req.user?.partner_id);
    const image = req.file?.filename;

    const menu = await menus.create({
      partner_id: partnerId,
      name: name,
      description: description,
      price: price,
      image: image,
    });
    res.status(200).json(menu);
  } catch (err) {
    res.status(400).json({
      err,
    });
    console.log(err);
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const menuInRest = await menus.find({
    _id: mongoose.Types.ObjectId(id),
    partner_id: mongoose.Types.ObjectId(req.user?.partner_id),
  });

  if (menuInRest.length > 0) {
    if (req.file) {
      const image = req.file.filename;
      menus.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name,
            description: description,
            price: price,
            image: image,
          },
        },
        (err: any, menu: Menu) => {
          if (err) {
            console.log(err);
          } else {
            res.json(menu);
          }
        }
      );
    } else {
      menus.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name,
            description: description,
            price: price,
          },
        },
        (err: any, menu: Menu) => {
          if (err) {
            console.log(err);
          } else {
            res.json(menu);
          }
        }
      );
    }
  } else {
    res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
  }
};

export const getMenuByRest = (req: Request, res: Response) => {
  const id = req.user?.partner_id;
  menus
    .find({
      partner_id: mongoose.Types.ObjectId(id),
    })
    .then((response: Menu[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
export const getMenuByRestId = async (req: Request, res: Response) => {
  const { id } = req.params;
  await menus
    .find({
      partner_id: mongoose.Types.ObjectId(id),
    })
    .then((response: Menu[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getMenuById = (req: Request, res: Response) => {
  const { id } = req.params;
  menus.findById(id, (err: any, menu: Menu) => {
    if (err) {
      console.log(err);
    } else {
      res.json(menu);
    }
  });
};

export const deleteMenu = (req: Request, res: Response) => {
  const { id } = req.params;
  menus.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};
