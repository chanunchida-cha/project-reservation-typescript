import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");
import { editAdmin, resetPassword } from "./../controller/adminController";

router.put("/reset-password", auth, resetPassword);
router.put("/profile/edit", auth, editAdmin);

export default router;
