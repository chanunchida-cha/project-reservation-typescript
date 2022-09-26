"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
const adminController_1 = require("./../controller/adminController");
router.put("/reset-password", auth, adminController_1.resetPassword);
router.put("/profile/edit", auth, adminController_1.editAdmin);
exports.default = router;
