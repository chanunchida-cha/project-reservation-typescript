import {
  customerAllDayReserv,
  updateCustomerAllDayReserv,
  selfAllDayReserv,
  updateSelfAllDayReserv,
  getAllDayReserv,
  getAllDayReservToday,
  getAllDayReservByID,
  deleteAllDay,
  updateStatusAllDay
} from "./../controller/alldayReservController";
import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");

router.route("/customer/all-day-reserv").post(customerAllDayReserv);
router.route("/customer/update-all-day-reserv/:id").put(updateCustomerAllDayReserv);
//--------------------self--------------------------------------------------
router.route("/self/all-day-reserv").post(selfAllDayReserv);
router.route("/self/update-all-day-reserv/:id").put(updateSelfAllDayReserv);
//------------------get------------------------------------------------------------
router.route("/get-all-day-reservs").get(auth, getAllDayReserv);
router.route("/get-all-day-reservs-today").get(auth, getAllDayReservToday);
router.route("/get-all-day-reserv-by-id/:id").get(getAllDayReservByID);
//---------------------delete------------------------------------------------
router.route("/delete-all-day-reserv/:id").delete(deleteAllDay);
//---------------------update status-----------------------------------------
router.route("/update-status-all-day-reserv/:id").put(updateStatusAllDay)
export default router;
