import { Response, Request } from "express";
import { Table } from "../models/tableDB";
const { mongoose } = require("mongoose");
const tables = require("../models/tableDB");

export const createTable = async (req: Request, res: Response) => {
  try {
    const { table_no, seat } = req.body;
    const partnerId = mongoose.Types.ObjectId(req.user?.partner_id);

    const table = await tables.create({
      partner_id: partnerId,
      table_no: table_no,
      seat: seat,
    });
    res.status(200).json(table);
  } catch (err) {
    res.status(400).json({
      err,
    });
    console.log(err);
  }
};

export const updateTable = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { table_no, seat } = req.body;
  const tableInRest = await tables.find({
    partner_id: mongoose.Types.ObjectId(req.user?.partner_id),
    _id: mongoose.Types.ObjectId(id),
  });

  if (tableInRest.length > 0) {
    tables.findByIdAndUpdate(
      id,
      {
        $set: {
          table_no: table_no,
          seat: seat,
        },
      },
      (err: any, table: Table) => {
        if (err) {
          console.log(err);
        } else {
          res.json(table);
        }
      }
    );
  } else {
    res.status(400).json({ error: "ไม่มีสิทธิแก้ไข" });
  }
};

export const getTableByRest = (req: Request, res: Response) => {
  const id = req.user?.partner_id;
  tables
    .find({
      partner_id: mongoose.Types.ObjectId(id),
    })
    .then((response: Table[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getTableByRestId = (req: Request, res: Response) => {
  const { id } = req.params;
  tables
    .find({
      partner_id: mongoose.Types.ObjectId(id),
    })
    .then((response: Table[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getTableById = (req: Request, res: Response) => {
  const { id } = req.params;
  tables.findById(id, (err: any, table: Table) => {
    if (err) {
      console.log(err);
    } else {
      res.json(table);
    }
  });
};

export const deleteTable = (req: Request, res: Response) => {
  const { id } = req.params;
  tables.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};
