import { Router } from "express";
import {
  customerLogin,
  getCustomer,
  partnerLogin,
  getPartner,
  adminLogin,
  getAdmin,
  facebookLogin,
  googleLogin
} from "../controller/authController";
const router = Router();
const auth = require("../middleware/auth");

//---------------customer---------------------------
router.route("/login-customer").post(customerLogin);
router.route("/login-facebook").post(facebookLogin);
router.route("/login-google").post(googleLogin);
router.route("/get-customer").get(auth, getCustomer);

//---------------partner---------------------------
router.route("/login-partner").post(partnerLogin);
router.route("/get-partner").get(auth, getPartner);

//---------------admin---------------------------
router.route("/login-admin").post(adminLogin);
router.route("/get-admin").get(auth, getAdmin);

export default router;
