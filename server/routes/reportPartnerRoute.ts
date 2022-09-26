import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");
import {
  countAlldayReservByPartner,
  countAlldayReservTodayByPartner,
  getAlldayReservLastWeek,
  getAlldayReservNextWeek,
  getAlldayReservPerDay,
  getAlldayReservPerWeek,
  getAlldayReservPerMonth,
  getAlldayReservPerYear,
  getAlldayReservPending,
  getAlldayReservArrived,
  getAlldayReservCheckOut,
  getAlldayReservCancel,
  countRoundReservByPartner,
  countRoundReservTodayByPartner,
  getRoundReservLastWeek,
  getRoundReservNextWeek,
  getRoundReservPerDay,
  getRoundReservPerWeek,
  getRoundReservPerMonth,
  getRoundReservPerYear,
  getRoundReservPending,
  getRoundReservArrived,
  getRoundReservCheckOut,
  getRoundReservCancel,
} from "../controller/reportPartnerController";

//--------------------------allday -------------------------------
router
  .route("/partner/get-count-allday-reserv")
  .get(auth, countAlldayReservByPartner);
router
  .route("/partner/get-count-allday-reserv-today")
  .get(auth, countAlldayReservTodayByPartner);
router
  .route("/partner/get-count-allday-reserv-last-week")
  .get(auth, getAlldayReservLastWeek);
router
  .route("/partner/get-count-allday-reserv-next-week")
  .get(auth, getAlldayReservNextWeek);
router
  .route("/partner/get-count-allday-reserv-per-day")
  .get(auth, getAlldayReservPerDay);
router
  .route("/partner/get-count-allday-reserv-per-week")
  .get(auth, getAlldayReservPerWeek);
router
  .route("/partner/get-count-allday-reserv-per-month")
  .get(auth, getAlldayReservPerMonth);
router
  .route("/partner/get-count-allday-reserv-per-year")
  .get(auth, getAlldayReservPerYear);
router
  .route("/partner/get-count-allday-reserv-pending")
  .get(auth, getAlldayReservPending);
router
  .route("/partner/get-count-allday-reserv-arrived")
  .get(auth, getAlldayReservArrived);
router
  .route("/partner/get-count-allday-reserv-check-out")
  .get(auth, getAlldayReservCheckOut);
router
  .route("/partner/get-count-allday-reserv-cancel")
  .get(auth, getAlldayReservCancel);

//--------------------------round -------------------------------
router
  .route("/partner/get-count-round-reserv")
  .get(auth, countRoundReservByPartner);
router
  .route("/partner/get-count-round-reserv-today")
  .get(auth, countRoundReservTodayByPartner);
router
  .route("/partner/get-count-round-reserv-last-week")
  .get(auth, getRoundReservLastWeek);
router
  .route("/partner/get-count-round-reserv-next-week")
  .get(auth, getRoundReservNextWeek);
router
  .route("/partner/get-count-round-reserv-per-day")
  .get(auth, getRoundReservPerDay);
router
  .route("/partner/get-count-round-reserv-per-week")
  .get(auth, getRoundReservPerWeek);
router
  .route("/partner/get-count-round-reserv-per-month")
  .get(auth, getRoundReservPerMonth);
router
  .route("/partner/get-count-round-reserv-per-year")
  .get(auth, getRoundReservPerYear);
router
  .route("/partner/get-count-round-reserv-pending")
  .get(auth, getRoundReservPending);
router
  .route("/partner/get-count-round-reserv-arrived")
  .get(auth, getRoundReservArrived);
router
  .route("/partner/get-count-round-reserv-check-out")
  .get(auth, getRoundReservCheckOut);
router
  .route("/partner/get-count-round-reserv-cancel")
  .get(auth, getRoundReservCancel);

export default router;
