import {
  createInfoRestaurant,
  updateInfoRestaurant,
  getInfoRestaurantById,
  getAllInfoRestaurant,
} from "./../controller/partnerController";
import { Router } from "express";
const router = Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.route("/get-all-info").get(getAllInfoRestaurant);
router.route("/get-info").get(auth, getInfoRestaurantById);
router.route("/create-info").post(auth,upload, createInfoRestaurant);
router.route("/update-info").put(upload, auth, updateInfoRestaurant);

export default router;
