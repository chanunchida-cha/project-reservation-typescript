import { User } from "./../models/userDB";
import Users from "../models/userDB";
import { Response, Request } from "express";

const bcrypt = require("bcrypt");

export const editCustomer = async (req: Request, res: Response) => {
  Users.findByIdAndUpdate(
    req.user?.user_id,
    {
      $set: req.body,
    },
    (err: any, data: User) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassWord, newPassWord, confirmNewPassWord } = req.body;
    // encrytedPassword = await bcrypt.hash(oldPassWord, 10);
    const user = await Users.findById(req.user?.user_id);

    if (newPassWord != confirmNewPassWord) {
      return res
        .status(404)
        .json({ error: "รหัสผ่านไม่ตรงกัน กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
    }
    const encrytedPassword = await bcrypt.hash(newPassWord, 10);
    if (await bcrypt.compare(oldPassWord, user?.password)) {
      await Users.findByIdAndUpdate(
        {
          _id: req.user?.user_id,
        },
        {
          password: encrytedPassword,
        }
      );
      return res.status(200).json({ msg: "reset password " });
    }
    res.status(404).json({ error: "กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
  } catch (err) {
    console.log(err);
  }
};
