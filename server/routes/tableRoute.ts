import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");
import {
  createTable,
  updateTable,
  getTableByRest,
  getTableById,
  getTableByRestId,
  deleteTable,
} from "../controller/tableController";

router.route("/create-table").post(auth, createTable);
router.route("/update-table/:id").put(auth, updateTable);
router.route("/get-table-by-rest").get(auth, getTableByRest);
router.route("/get-table-by-rest-id/:id").get(getTableByRestId);
router.route("/get-table-by-id/:id").get(getTableById);
router.route("/delete-table/:id").delete(deleteTable);

export default router;
