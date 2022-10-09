"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
//---------------customer---------------------------
router.route("/login-customer").post(authController_1.customerLogin);
router.route("/login-facebook").post(authController_1.facebookLogin);
router.route("/login-google").post(authController_1.googleLogin);
router.route("/get-customer").get(auth, authController_1.getCustomer);
//---------------partner---------------------------
router.route("/login-partner").post(authController_1.partnerLogin);
router.route("/get-partner").get(auth, authController_1.getPartner);
//---------------admin---------------------------
router.route("/login-admin").post(authController_1.adminLogin);
router.route("/get-admin").get(auth, authController_1.getAdmin);
exports.default = router;
