"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roundReservController_1 = require("./../controller/roundReservController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
router.route("/customer/round-reserv").post(roundReservController_1.customerRoundReserv);
router
    .route("/customer/update-round-reserv/:id")
    .put(roundReservController_1.updateCustomerRoundReserv);
//--------------------self--------------------------------------------------
router.route("/self/round-reserv").post(roundReservController_1.selfRoundReserv);
router.route("/self/update-round-reserv/:id").put(roundReservController_1.updateSelfRoundReserv);
//------------------get------------------------------------------------------------
router.route("/get-round-reservs").get(auth, roundReservController_1.getRoundReserv);
router.route("/get-round-reservs-today").get(auth, roundReservController_1.getRoundReservToday);
router.route("/get-round-reserv-by-id/:id").get(roundReservController_1.getRoundReservByID);
//---------------------delete------------------------------------------------
router.route("/delete-round-reserv/:id").delete(roundReservController_1.deleteRound);
//---------------------update status-----------------------------------------
router.route("/update-status-round-reserv/:id").put(roundReservController_1.updateStatusRound);
exports.default = router;
