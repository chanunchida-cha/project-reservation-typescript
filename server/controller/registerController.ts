import { Response, Request } from "express";
import admins from "../models/adminDB";
import partners from "../models/partnerDB";
import Users from "../models/userDB";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//----------------------------------admin-------------------------------------
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = req.body;
    if (!(username && email && phoneNumber && password && confirmPass)) {
      return res.status(400).json({ error: "All input is requires" });
    }
    const oldAdmin = await admins.findOne({ email, username });
    if (oldAdmin) {
      return res.status(400).json({ error: "บัญชีนี้มีผู้ใช้งานแล้ว" });
    }
    if (password != confirmPass) {
      return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่าน" });
    }

    const encrytedPassword = await bcrypt.hash(password, 10);
    const encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    const admin = await admins.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
    });

    //creat token

    const token = jwt.sign(
      { admin_id: admin._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    admin.token = token;
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
  }
};
//------------------partner----------------------------------------------
export const createPartner = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPass,
      phoneNumber,
      address,
    } = req.body;
    if (
      !(
        restaurantName &&
        firstname &&
        lastname &&
        username &&
        email &&
        password &&
        confirmPass &&
        phoneNumber &&
        address
      )
    ) {
      return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }
    const oldAdmin = await partners.findOne({ email, username });
    if (oldAdmin) {
      return res.status(400).json({ error: "มีผู้ใช้งานแล้ว" });
    }
    if (password != confirmPass) {
      return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง" });
    }

    const encrytedPassword = await bcrypt.hash(password, 10);
    const encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    const partner = await partners.create({
      restaurantName: restaurantName,
      firstname: firstname,
      lastname: lastname,
      username: username.toLowerCase(),
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      address: address,
    });

    //creat token

    const token = jwt.sign(
      { partner_id: partner._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    partner.token = token;
    res.status(200).json(partner);
  } catch (error) {
    console.log(error);
  }
};
//------------------------customer-------------------------------------
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = req.body;
    if (!(username && email && phoneNumber && password && confirmPass)) {
      return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }
    const oldUser = await Users.findOne({ email, username });
    if (oldUser) {
      return res.status(400).json({ error: "มีผู้ใช้แล้ว" });
    }
    if (password != confirmPass) {
      return res.status(400).json({ error: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง" });
    }

    const encrytedPassword = await bcrypt.hash(password, 10);
    const encrytedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    const user = await Users.create({
      username: username.toLowerCase(),
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      password: encrytedPassword,
      confirmPass: encrytedConfirmPassword,
    });

    //creat token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
