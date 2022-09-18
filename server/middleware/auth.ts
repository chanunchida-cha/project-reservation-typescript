import { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongoose";
const jwt = require("jsonwebtoken");
const config = process.env;

type User = {
  user_id?: ObjectId;
  partner_id?: ObjectId;
  admin_id?: ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("token is require for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = verifyToken;
