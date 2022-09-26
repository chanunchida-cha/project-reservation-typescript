import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");
import {
  getRoundReservByCustomerPending,
  getRoundReservByCustomerArrived,
  getRoundReservByCustomerHistory,
  getAlldayReservByCustomerPending,
  getAlldayReservByCustomerArrived,
  getAlldayReservByCustomerHistory,
} from "./../controller/reservHistoryController";

//---------------get round --------------------------------------------
router
  .route("/get-round-reserv-pending")
  .get(auth, getRoundReservByCustomerPending);
router
  .route("/get-round-reserv-arrived")
  .get(auth, getRoundReservByCustomerArrived);
router
  .route("/get-round-reserv-history")
  .get(auth, getRoundReservByCustomerHistory);

//--------------get allDay-----------------------------------------------
router
  .route("/get-all-day-reserv-pending")
  .get(auth, getAlldayReservByCustomerPending);
router
  .route("/get-all-day-reserv-arrived")
  .get(auth, getAlldayReservByCustomerArrived);
router
  .route("/get-all-day-reserv-history")
  .get(auth, getAlldayReservByCustomerHistory);

export default router;
