import { Response, Request } from "express";
import { Admin } from "../models/adminDB";
import admins from "../models/adminDB"

const bcrypt = require("bcrypt");

export const editAdmin = async (req: Request, res: Response) => {
    admins.findByIdAndUpdate(
      req.user?.admin_id,
      {
        $set: req.body,
      },
      (err: any, data: Admin) => {
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
      const admin = await admins.findById(req.user?.admin_id);
  
      if (newPassWord != confirmNewPassWord) {
        return res
          .status(404)
          .json({ error: "รหัสผ่านไม่ตรงกัน กรุณาเช็ครหัสผ่านใหม่อีกครั้ง" });
      }
      const encrytedPassword = await bcrypt.hash(newPassWord, 10);
      if (await bcrypt.compare(oldPassWord, admin?.password)) {
        await admins.findByIdAndUpdate(
          {
            _id: req.user?.admin_id,
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