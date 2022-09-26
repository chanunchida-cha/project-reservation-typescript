import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");
import {
  editCustomer,
  resetPassword,
} from "./../controller/customerController";

router.put("/reset-password", auth, resetPassword);
router.put("/profile/edit", auth, editCustomer);

export default router;
