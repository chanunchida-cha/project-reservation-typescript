import { Router } from "express";
import {
  createMenu,
  updateMenu,
  getMenuByRest,
  getMenuById,
  deleteMenu,
} from "../controller/menuController";
const router = Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.route("/create-menu").post(auth, upload, createMenu);
router.route("/update-menu/:id").put(auth, upload, updateMenu);
router.route("/get-menu-by-rest").get(auth, getMenuByRest);
router.route("/get-menu-by-id/:id").get(getMenuById);
router.route("/delete-menu/:id").delete(deleteMenu);

export default router;
