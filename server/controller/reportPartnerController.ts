const allDayReservs = require("./../models/allDayReservDB");
const roundReservs = require("./../models/roundReservDB");
const mongoose = require("mongoose");
import { Response, Request } from "express";

//---------------------------report allday--------------------------------------------
export const countAlldayReservByPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await allDayReservs.aggregate([
      {
        $match: { partner_id: partnerId },
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

export const countAlldayReservTodayByPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await allDayReservs.aggregate([
      {
        $match: { partner_id: partnerId, day: new Date(date) },
      },

      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
    console.log(new Date().toLocaleDateString());
  } catch (err) {
    console.log(err);
  }
};

export const getAlldayReservLastWeek = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            {
              day: {
                $gte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 7
                ),
              },
            },
            { day: { $lt: new Date(today) } },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAlldayReservNextWeek = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            { day: { $gt: new Date(today) } },
            {
              day: {
                $lte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 7
                ),
              },
            },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    );
  } catch (err) {
    console.log(err);
  }
};
export const getAlldayReservPerDay = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$day" },
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getAlldayReservPerWeek = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },

          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getAlldayReservPerMonth = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getAlldayReservPerYear = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: { $year: "$day" },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
export const getAlldayReservPending = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "pending",
        },
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
export const getAlldayReservArrived = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "arrived",
        },
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
export const getAlldayReservCheckOut = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "check out",
        },
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
export const getAlldayReservCancel = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await allDayReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "cancel",
        },
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
//---------------------------report round--------------------------------------------
export const countRoundReservByPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await roundReservs.aggregate([
      {
        $match: { partner_id: partnerId },
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

export const countRoundReservTodayByPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);
    const response = await roundReservs.aggregate([
      {
        $match: { partner_id: partnerId, day: new Date(date) },
      },

      {
        $count: "count",
      },
    ]);

    res.json(response[0]);
    console.log(new Date().toLocaleDateString());
  } catch (err) {
    console.log(err);
  }
};

export const getRoundReservLastWeek = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            {
              day: {
                $gte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 7
                ),
              },
            },
            { day: { $lt: new Date(today) } },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    );
  } catch (err) {
    console.log(err);
  }
};

export const getRoundReservNextWeek = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          $and: [
            { day: { $gt: new Date(today) } },
            {
              day: {
                $lte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 7
                ),
              },
            },
          ],
        },
      },

      {
        $count: "count",
      },
    ]);
    res.json(response[0]);
    console.log(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    );
  } catch (err) {
    console.log(err);
  }
};
export const getRoundReservPerDay = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$day" },
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getRoundReservPerWeek = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
            week: {
              $floor: { $add: [{ $divide: [{ $dayOfMonth: "$day" }, 7] }, 1] },
            },
          },

          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getRoundReservPerMonth = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$day" },
            month: { $month: "$day" },
          },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

export const getRoundReservPerYear = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
        },
      },

      {
        $group: {
          _id: { $year: "$day" },
          count: { $count: {} },
        },
      },
    ]);
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
export const getRoundReservPending = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "pending",
        },
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
export const getRoundReservArrived = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "arrived",
        },
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
export const getRoundReservCheckOut = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "check out",
        },
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
export const getRoundReservCancel = async (req: Request, res: Response) => {
  try {
    const id = req.user?.partner_id;
    const partnerId = await mongoose.Types.ObjectId(id);

    const response = await roundReservs.aggregate([
      {
        $match: {
          partner_id: partnerId,
          status: "cancel",
        },
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
