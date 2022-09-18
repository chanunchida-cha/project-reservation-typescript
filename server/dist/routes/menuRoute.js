"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menuController_1 = require("../controller/menuController");
const router = (0, express_1.Router)();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
router.route("/create-menu").post(auth, upload, menuController_1.createMenu);
router.route("/update-menu/:id").put(auth, upload, menuController_1.updateMenu);
router.route("/get-menu-by-rest").get(auth, menuController_1.getMenuByRest);
router.route("/get-menu-by-id/:id").get(menuController_1.getMenuById);
router.route("/delete-menu/:id").delete(menuController_1.deleteMenu);
exports.default = router;