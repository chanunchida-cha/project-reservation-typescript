"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerController_1 = require("../controller/registerController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/create-admin").post(registerController_1.createAdmin);
router.route("/create-partner").post(registerController_1.createPartner);
router.route("/create-customer").post(registerController_1.createCustomer);
exports.default = router;
