import {
  createInfoRestaurant,
  updateInfoRestaurant,
  getInfoRestaurantByRest,
  getInfoRestaurantById,
  getAllInfoRestaurant,
  resetPassword,
} from "./../controller/partnerController";
import { Router } from "express";
const router = Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.route("/get-all-info").get(getAllInfoRestaurant);
router.route("/get-info").get(auth, getInfoRestaurantByRest);
router.route("/get-info/:id").get(getInfoRestaurantById);
router.route("/create-info").post(auth, upload, createInfoRestaurant);
router.route("/update-info").put(upload, auth, updateInfoRestaurant);
router.put("/reset-password", auth, resetPassword);

export default router;
