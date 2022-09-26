"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
const reportPartnerController_1 = require("../controller/reportPartnerController");
//--------------------------allday -------------------------------
router
    .route("/partner/get-count-allday-reserv")
    .get(auth, reportPartnerController_1.countAlldayReservByPartner);
router
    .route("/partner/get-count-allday-reserv-today")
    .get(auth, reportPartnerController_1.countAlldayReservTodayByPartner);
router
    .route("/partner/get-count-allday-reserv-last-week")
    .get(auth, reportPartnerController_1.getAlldayReservLastWeek);
router
    .route("/partner/get-count-allday-reserv-next-week")
    .get(auth, reportPartnerController_1.getAlldayReservNextWeek);
router
    .route("/partner/get-count-allday-reserv-per-day")
    .get(auth, reportPartnerController_1.getAlldayReservPerDay);
router
    .route("/partner/get-count-allday-reserv-per-week")
    .get(auth, reportPartnerController_1.getAlldayReservPerWeek);
router
    .route("/partner/get-count-allday-reserv-per-month")
    .get(auth, reportPartnerController_1.getAlldayReservPerMonth);
router
    .route("/partner/get-count-allday-reserv-per-year")
    .get(auth, reportPartnerController_1.getAlldayReservPerYear);
router
    .route("/partner/get-count-allday-reserv-pending")
    .get(auth, reportPartnerController_1.getAlldayReservPending);
router
    .route("/partner/get-count-allday-reserv-arrived")
    .get(auth, reportPartnerController_1.getAlldayReservArrived);
router
    .route("/partner/get-count-allday-reserv-check-out")
    .get(auth, reportPartnerController_1.getAlldayReservCheckOut);
router
    .route("/partner/get-count-allday-reserv-cancel")
    .get(auth, reportPartnerController_1.getAlldayReservCancel);
//--------------------------round -------------------------------
router
    .route("/partner/get-count-round-reserv")
    .get(auth, reportPartnerController_1.countRoundReservByPartner);
router
    .route("/partner/get-count-round-reserv-today")
    .get(auth, reportPartnerController_1.countRoundReservTodayByPartner);
router
    .route("/partner/get-count-round-reserv-last-week")
    .get(auth, reportPartnerController_1.getRoundReservLastWeek);
router
    .route("/partner/get-count-round-reserv-next-week")
    .get(auth, reportPartnerController_1.getRoundReservNextWeek);
router
    .route("/partner/get-count-round-reserv-per-day")
    .get(auth, reportPartnerController_1.getRoundReservPerDay);
router
    .route("/partner/get-count-round-reserv-per-week")
    .get(auth, reportPartnerController_1.getRoundReservPerWeek);
router
    .route("/partner/get-count-round-reserv-per-month")
    .get(auth, reportPartnerController_1.getRoundReservPerMonth);
router
    .route("/partner/get-count-round-reserv-per-year")
    .get(auth, reportPartnerController_1.getRoundReservPerYear);
router
    .route("/partner/get-count-round-reserv-pending")
    .get(auth, reportPartnerController_1.getRoundReservPending);
router
    .route("/partner/get-count-round-reserv-arrived")
    .get(auth, reportPartnerController_1.getRoundReservArrived);
router
    .route("/partner/get-count-round-reserv-check-out")
    .get(auth, reportPartnerController_1.getRoundReservCheckOut);
router
    .route("/partner/get-count-round-reserv-cancel")
    .get(auth, reportPartnerController_1.getRoundReservCancel);
exports.default = router;
