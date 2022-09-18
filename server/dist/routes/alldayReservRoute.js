"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alldayReservController_1 = require("./../controller/alldayReservController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
router.route("/customer/all-day-reserv").post(alldayReservController_1.customerAllDayReserv);
router.route("/customer/update-all-day-reserv/:id").put(alldayReservController_1.updateCustomerAllDayReserv);
//--------------------self--------------------------------------------------
router.route("/self/all-day-reserv").post(alldayReservController_1.selfAllDayReserv);
router.route("/self/update-all-day-reserv/:id").put(alldayReservController_1.updateSelfAllDayReserv);
//------------------get------------------------------------------------------------
router.route("/get-all-day-reservs").get(auth, alldayReservController_1.getAllDayReserv);
router.route("/get-all-day-reservs-today").get(auth, alldayReservController_1.getAllDayReservToday);
router.route("/get-all-day-reserv-by-id/:id").get(alldayReservController_1.getAllDayReservByID);
//---------------------delete------------------------------------------------
router.route("/delete-all-day-reserv/:id").delete(alldayReservController_1.deleteAllDay);
//---------------------update status-----------------------------------------
router.route("/update-status-all-day-reserv/:id").put(alldayReservController_1.updateStatusAllDay);
exports.default = router;
