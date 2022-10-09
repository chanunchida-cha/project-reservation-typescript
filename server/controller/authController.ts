import axios from "axios";
import { Response, Request } from "express";
import admins from "../models/adminDB";
import partners from "../models/partnerDB";
import Users from "../models/userDB";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { OAuth2Client, LoginTicket } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

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
export const facebookLogin = async (req: Request, res: Response) => {
  const { accessToken, userID } = req.body;

  const urlGrapFacebook = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
  try {
    const response: { data: { name: string; id: string; email: string } } =
      await axios.get(urlGrapFacebook);
    console.log(response);

    const { id, name, email } = response.data;
    const user = await Users.findOne({ email: email });

    console.log();

    if (user && !user.facebook_id) {
      res.status(404).json({ error: "อีเมล์นี้ถูกใช้งานแล้ว " });
    } else if (user && user.facebook_id) {
      const token = jwt.sign(
        { user_id: user._id, name },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    } else {
      const password = await bcrypt.hash(name + process.env.JWT_SECRET, 10);
      const confrimPassword = await bcrypt.hash(
        name + process.env.JWT_SECRET,
        10
      );
      const user = await Users.create({
        username: name,
        firstname: name,
        lastname: name,
        email: email,
        password: password,
        confirmPass: confrimPassword,
        facebook_id: id,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId, googleId } = req.body;

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID_GOOGLE,
    });

    const email_verified = response.getPayload()?.email_verified;
    const name = response.getPayload()?.name;
    const email = response.getPayload()?.email;
    console.log(response.getPayload()?.email_verified);

    if (email_verified) {
      const user = await Users.findOne({ email: email });
      if (user && !user.google_id) {
        res.status(404).json({ error: "อีเมล์นี้ถูกใช้งานแล้ว" });
      } else if (user && user.google_id) {
        const token = jwt.sign(
          { user_id: user._id, name },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        );
        user.token = token;
        res.status(200).json(user);
      } else {
        const password = await bcrypt.hash("123456", 10);
        const confrimPassword = await bcrypt.hash("123456", 10);
        const user = await Users.create({
          username: name,
          firstname: name,
          lastname: name,
          email: email,
          password: password,
          confirmPass: confrimPassword,
          google_id: googleId,
        });
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        );
        user.token = token;
        res.status(200).json(user);
      }
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
