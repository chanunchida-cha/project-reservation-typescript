
const allDayReservs = require("./../models/allDayReservDB");
const mongoose = require("mongoose");
import { Response, Request } from "express";
const restaurants = require("../models/restaurantDB");
const tables = require("../models/tableDB");
import { AllDayReserv } from "../models/allDayReservDB";
import { Table } from "../models/tableDB";

import { Info } from "../models/restaurantDB";

//--------------reserv by customer ---------------------------------------------------
export const customerAllDayReserv = async (req: Request, res: Response) => {
  try {
    const { partner_id, day, start, amount, customer_id } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);
    const customerId = mongoose.Types.ObjectId(customer_id);
    const partnerInfo:Info = await restaurants.findOne({
      partner_id: partnerId,
    });
    const endTime =
      new Date(start).getTime() + Number(partnerInfo.time_length) * 60 * 1000;
    const end = new Date(endTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservtotal: AllDayReserv[] = await allDayReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);
    const reservs: AllDayReserv[] = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });

    const alltables: Table[] = await tables.find({
      partner_id: partnerId,
    });
    const reserved_tables: string[] = [];
    const allTable: Table[] = [];
    const table: string[] = [];
    let seatAmount: number = Number(amount);
    reservs.forEach((reserv: AllDayReserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    alltables.forEach((tables) => {
      allTable.push(tables);
    });
    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    const reservedTable: (n: number, remaining_tables: Table[]) => any = (
      n: number,
      remaining_tables: Table[]
    ) => {
      const max_reamaining: number[] = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + prev,
        0
      );

      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (Number(remaining_table.seat) >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= Number(maxSeats.seat);
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };
    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }

    reservedTable(seatAmount, remaining_tables);
    const allDayReserv = await allDayReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      customer_id: customerId,
      day: new Date(day).toISOString(),
      start: new Date(start).toLocaleTimeString("it-IT"),
      end: end,
      amount: amount,
      table: table,
    });

    res.status(200).json(allDayReserv);
  } catch (err) {
    console.log(err);
  }
};

export const updateCustomerAllDayReserv = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, amount, customer_id, table } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);

    const partnerInfo:Info = await restaurants.findOne({
      partner_id: partnerId,
    });
    const endTime =
      new Date(start).getTime() + Number(partnerInfo.time_length) * 60 * 1000;
    const end = new Date(endTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservs: AllDayReserv[] = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });

    const alltables: Table[] = await tables.find({
      partner_id: partnerId,
    });
    const myReservTables: AllDayReserv[] = await allDayReservs.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const reserved_tables: string[] = [];
    const remain_n: string[] = [];
    const myReservTable: string[] = [];

    let newTables: string[] = [];
    let seatAmount = Number(amount);

    reservs.forEach((reserv: AllDayReserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });

    myReservTables.forEach((reservTable) => {
      myReservTable.push(...reservTable.table);
    });

    let isReservTable: string[] = [];
    //เอาโต๊ะของรอบจองนี้ออก
    let dupArrs: string[] = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });
    if (
      new Date(myReservTables[0].day).toISOString() ===
        new Date(day).toISOString() &&
      (myReservTables[0].start >= new Date(start).toLocaleTimeString("it-IT") ||
        myReservTables[0].end > new Date(start).toLocaleTimeString("it-IT")) &&
      (myReservTables[0].start < end || myReservTables[0].end <= end)
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }

    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });

    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });
    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
    });

    const reservedTable: (n: number, remaining_tables: Table[]) => any = (
      n: number,
      remaining_tables: Table[]
    ) => {
      const max_reamaining: number[] = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + prev,
        0
      );

      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (Number(remaining_table.seat) >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= Number(maxSeats.seat);
        newTables.push(maxSeats.table_no);

        const remain_nn = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_nn);
      }
    };

    if (amount !== myReservTables[0].amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    allDayReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          customer_id: customer_id,
          day: new Date(day).toISOString(),
          start: new Date(start).toLocaleTimeString("it-IT"),
          end: end,
          amount: amount,
          table: newTables,
        },
      },
      (err: any, update: AllDayReserv) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
  } catch (err: any) {
    console.log(err);
  }
};
//--------------reserv by customer ---------------------------------------------------
export const selfAllDayReserv = async (req: Request, res: Response) => {
  try {
    const { partner_id, day, start, amount, self_reserv } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);

    const partnerInfo:Info = await restaurants.findOne({
      partner_id: partnerId,
    });
    const endTime =
      new Date(start).getTime() + Number(partnerInfo.time_length) * 60 * 1000;
    const end = new Date(endTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservtotal: AllDayReserv[] = await allDayReservs.aggregate([
      { $match: { partner_id: partnerId } },
    ]);
    const reservs: AllDayReserv[] = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });

    const alltables: Table[] = await tables.find({
      partner_id: partnerId,
    });
    const reserved_tables: string[] = [];
    const allTable: Table[] = [];
    const table: string[] = [];
    let seatAmount: number = Number(amount);
    reservs.forEach((reserv: AllDayReserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });
    alltables.forEach((tables) => {
      allTable.push(tables);
    });
    const remaining_tables = allTable.filter((tableNo) => {
      let found = false;
      for (const reservedTable of reserved_tables) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });
    const reservedTable: (n: number, remaining_tables: Table[]) => any = (
      n: number,
      remaining_tables: Table[]
    ) => {
      const max_reamaining: number[] = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + prev,
        0
      );

      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (Number(remaining_table.seat) >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        table.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= Number(maxSeats.seat);
        table.push(maxSeats.table_no);

        const remain_n = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_n);
      }
    };
    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remaining_tables.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    }

    reservedTable(seatAmount, remaining_tables);
    const allDayReserv = await allDayReservs.create({
      reservNumber: `cq${reservtotal.length + 1}`,
      partner_id: partnerId,
      self_reserv: self_reserv,
      day: new Date(day).toISOString(),
      start: new Date(start).toLocaleTimeString("it-IT"),
      end: end,
      amount: amount,
      table: table,
    });

    res.status(200).json(allDayReserv);
  } catch (err) {
    console.log(err);
  }
};

export const updateSelfAllDayReserv = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { partner_id, day, start, amount, self_reserv, table } = req.body;
    const partnerId = mongoose.Types.ObjectId(partner_id);

    const partnerInfo:Info = await restaurants.findOne({
      partner_id: partnerId,
    });
    const endTime =
      new Date(start).getTime() + Number(partnerInfo.time_length) * 60 * 1000;
    const end = new Date(endTime).toLocaleTimeString("it-IT");
    const dayOfWeekName = new Date(day).toLocaleString("default", {
      weekday: "long",
    });
    const reservs: AllDayReserv[] = await allDayReservs.find({
      $and: [
        { partner_id: partnerId },
        { day: new Date(day).toISOString() },
        {
          $or: [
            { start: { $gte: new Date(start).toLocaleTimeString("it-IT") } },
            {
              end: { $gt: new Date(start).toLocaleTimeString("it-IT") },
            },
          ],
        },

        {
          $or: [
            {
              start: { $lt: end },
            },
            {
              end: { $lte: end },
            },
          ],
        },
        {
          $or: [{ status: "pending" }, { status: "arrived" }],
        },
      ],
    });

    const alltables: Table[] = await tables.find({
      partner_id: partnerId,
    });
    const myReservTables: AllDayReserv = await allDayReservs.findById({
      _id: mongoose.Types.ObjectId(id),
    });
    const reserved_tables: string[] = [];
    const remain_n: string[] = [];
    const myReservTable: string[] = [];

    let newTables: string[] = [];
    let seatAmount = Number(amount);
  
    reservs.forEach((reserv: AllDayReserv) => {
      reserv.table.forEach((table) => {
        reserved_tables.push(table);
      });
    });

    myReservTables.table.forEach((table) => {
      myReservTable.push(table);
    });

    let isReservTable: string[] = [];
    //เอาโต๊ะของรอบจองนี้ออก
    let dupArrs: string[] = reserved_tables.filter((dupArr, index) => {
      return reserved_tables.indexOf(dupArr) !== index;
    });
    if (
      new Date(myReservTables.day).toISOString() ===
        new Date(day).toISOString() &&
      (myReservTables.start >= new Date(start).toLocaleTimeString("it-IT") ||
        myReservTables.end > new Date(start).toLocaleTimeString("it-IT")) &&
      (myReservTables.start < end || myReservTables.end <= end)
    ) {
      isReservTable = reserved_tables.filter((reservedTable) => {
        let found = false;
        for (const myTable of myReservTable) {
          if (reservedTable === myTable) {
            found = true;
          }
        }
        return !found;
      });
      if (dupArrs.length > 0) {
        isReservTable.push(...dupArrs);
      }
    } else {
      isReservTable = [...reserved_tables];
    }

    const remaining_tables = alltables.filter((tableNo) => {
      let found = false;
      for (const reservedTable of isReservTable) {
        if (tableNo.table_no === reservedTable) {
          found = true;
        }
      }
      return !found;
    });

    remaining_tables.forEach((remaining_table) => {
      remain_n.push(remaining_table.table_no);
    });
    const duplicateTable = isReservTable.filter((remain) => {
      let found = false;
      for (const theTable of table) {
        if (theTable === remain) {
          found = true;
        }
      }
      return found;
    });

    const reservedTable: (n: number, remaining_tables: Table[]) => any = (
      n: number,
      remaining_tables: Table[]
    ) => {
      const max_reamaining: number[] = [];
      remaining_tables.forEach((remaining_table) => {
        max_reamaining.push(Number(remaining_table.seat));
      });

      const maxSeat = Math.max(...max_reamaining);
      const total_reamining_n = remaining_tables.reduce(
        (prev, cur) => Number(cur.seat) + prev,
        0
      );

      if (n <= 0) {
        return res.status(400).json({ error: "กรุณากรอกจำนวนคนใหม่" });
      } else if (n > total_reamining_n) {
        return res.status(400).json({ error: "โต๊ะไม่พอรองรับ" });
      } else if (n <= maxSeat) {
        const Numseats = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (Number(remaining_table.seat) >= seatAmount) {
            found = true;
          }
          return found;
        });

        const minSeats = Numseats.reduce((prev, cur) =>
          Number(cur.seat) < Number(prev.seat) ? cur : prev
        );

        newTables.push(minSeats.table_no);
      } else if (n > maxSeat) {
        const maxSeats = remaining_tables.reduce((prev, cur) =>
          Number(cur.seat) > Number(prev.seat) ? cur : prev
        );

        seatAmount -= Number(maxSeats.seat);
        newTables.push(maxSeats.table_no);

        const remain_nn = remaining_tables.filter((remaining_table) => {
          let found = false;
          if (maxSeats.table_no === remaining_table.table_no) {
            found = true;
          }

          return !found;
        });

        return reservedTable(seatAmount, remain_nn);
      }
    };

    if (amount !== myReservTables.amount) {
      reservedTable(seatAmount, remaining_tables);
    } else newTables = [...table];

    if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].type === "close"
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด1" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].end <=
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด2" });
    } else if (
      partnerInfo.openday[dayOfWeekName.toLocaleLowerCase()].start >
      new Date(start).toLocaleTimeString("it-IT")
    ) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถจองคิวได้ เนื่องจากร้านปิด3" });
    } else if (remain_n.length === 0) {
      return res.status(400).json({ error: "รอบเวลานี้ โต๊ะเต็มแล้ว" });
    } else if (duplicateTable.length >= 1) {
      return res.status(400).json({ error: "โต๊ะนี้ถูกจองแล้ว" });
    }

    allDayReservs.findByIdAndUpdate(
      id,
      {
        $set: {
          self_reserv: self_reserv,
          day: new Date(day).toISOString(),
          start: new Date(start).toLocaleTimeString("it-IT"),
          end: end,
          amount: amount,
          table: newTables,
        },
      },
      (err: any, update: AllDayReserv) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(update);
        }
      }
    );
  } catch (err: any) {
    console.log(err);
  }
};
//------------------------- get reserv allday--------------------------------------
export const getAllDayReserv = async (req: Request, res: Response) => {
  const id = mongoose.Types.ObjectId(req.user?.partner_id);
  allDayReservs
    .aggregate([
      {
        $match: {
          partner_id: id,
        },
      },
    
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
        
      },
    
    ])
    .then((response: AllDayReserv[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getAllDayReservToday = (req: Request, res: Response) => {
  const id = req.user?.partner_id;
  const date = `${new Date().toLocaleDateString().split("/").join("-")}z`;
  allDayReservs
    .aggregate([
      {
        $match: {
          partner_id: mongoose.Types.ObjectId(id),
          day: new Date(date),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
    ])
    .then((response: AllDayReserv[]) => {
      res.json(response);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getAllDayReservByID = (req: Request, res: Response) => {
  const { id } = req.params;
  allDayReservs
    .aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      }
      
    ])
    .then((response: AllDayReserv[]) => {
      res.json(response[0]);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
//-----------------update status -------------------------------------
export const updateStatusAllDay = (req: Request, res: Response) => {
  const { id } = req.params;
  allDayReservs.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    (err: any, response: AllDayReserv) => {
      if (err) {
        console.log(err);
      } else {
        res.json(response);
      }
    }
  );
};

//-------------------delete-------------------------------------------
export const deleteAllDay = (req: Request, res: Response) => {
  const { id } = req.params;
  allDayReservs.findByIdAndDelete(id, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        status: "delete success",
      });
    }
  });
};
