import { Response, Request } from "express";
import admins from "../models/adminDB";
import partners from "../models/partnerDB";
import Users from "../models/userDB";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//----------customer------------------------

export const customerLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }

    const user = await Users.findOne({
      username: username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(404).json({ error: "กรุณาตรวจสอบ username และ รหัสผ่าน" });
  } catch (err) {
    console.log(err);
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.user?.user_id);
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e: any) {
    res.status(400).json({ msg: e.message });
  }
};

//----------partner------------------------

export const partnerLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }

    const partner = await partners.findOne({
      username: username,
    });

    if (partner && (await bcrypt.compare(password, partner.password))) {
      const token = jwt.sign(
        { partner_id: partner._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      partner.token = token;
      res.status(200).json(partner);
    }
    res.status(404).json({ error: "กรุณาตรวจสอบ username และ รหัสผ่าน " });
  } catch (err) {
    console.log(err);
  }
};

export const getPartner = async (req: Request, res: Response) => {
  try {
    const partner = await partners.findById(req.user?.partner_id);
    if (!partner) throw Error("User does not exist");
    res.json(partner);
  } catch (e: any) {
    res.status(400).json({ msg: e.message });
  }
};

//----------admin------------------------

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      res.status(400).json({ error: "All input is requires" });
    }

    const admin = await admins.findOne({
      username: username,
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { admin_id: admin._id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      admin.token = token;
      res.status(200).json(admin);
    }
    res.status(404).json({ error: "check username or password " });
  } catch (err) {
    console.log(err);
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await admins.findById(req.user?.admin_id);
    if (!admin) throw Error("User does not exist");
    res.json(admin);
  } catch (e: any) {
    res.status(400).json({ msg: e.message });
  }
};
