"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
const reservHistoryController_1 = require("./../controller/reservHistoryController");
//---------------get round --------------------------------------------
router
    .route("/get-round-reserv-pending")
    .get(auth, reservHistoryController_1.getRoundReservByCustomerPending);
router
    .route("/get-round-reserv-arrived")
    .get(auth, reservHistoryController_1.getRoundReservByCustomerArrived);
router
    .route("/get-round-reserv-history")
    .get(auth, reservHistoryController_1.getRoundReservByCustomerHistory);
//--------------get allDay-----------------------------------------------
router
    .route("/get-all-day-reserv-pending")
    .get(auth, reservHistoryController_1.getAlldayReservByCustomerPending);
router
    .route("/get-all-day-reserv-arrived")
    .get(auth, reservHistoryController_1.getAlldayReservByCustomerArrived);
router
    .route("/get-all-day-reserv-history")
    .get(auth, reservHistoryController_1.getAlldayReservByCustomerHistory);
exports.default = router;
