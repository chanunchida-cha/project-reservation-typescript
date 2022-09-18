import {
  createAdmin,
  createPartner,
  createCustomer,
} from "../controller/registerController";
import { Router } from "express";
const router = Router();

router.route("/create-admin").post(createAdmin);
router.route("/create-partner").post(createPartner);
router.route("/create-customer").post(createCustomer);

export default router;
