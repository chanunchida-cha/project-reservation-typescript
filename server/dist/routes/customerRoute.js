"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
const customerController_1 = require("./../controller/customerController");
router.put("/reset-password", auth, customerController_1.resetPassword);
router.put("/profile/edit", auth, customerController_1.editCustomer);
exports.default = router;
