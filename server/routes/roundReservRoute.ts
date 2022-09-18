import {
  customerRoundReserv,
  updateCustomerRoundReserv,
  selfRoundReserv,
  updateSelfRoundReserv,
  getRoundReserv,
  getRoundReservToday,
  getRoundReservByID,
  deleteRound,
  updateStatusRound,
} from "./../controller/roundReservController";
import { Router } from "express";
const router = Router();
const auth = require("../middleware/auth");

router.route("/customer/round-reserv").post(customerRoundReserv);
router
  .route("/customer/update-round-reserv/:id")
  .put(updateCustomerRoundReserv);
//--------------------self--------------------------------------------------
router.route("/self/round-reserv").post(selfRoundReserv);
router.route("/self/update-round-reserv/:id").put(updateSelfRoundReserv);
//------------------get------------------------------------------------------------
router.route("/get-round-reservs").get(auth, getRoundReserv);
router.route("/get-round-reservs-today").get(auth, getRoundReservToday);
router.route("/get-round-reserv-by-id/:id").get(getRoundReservByID);
//---------------------delete------------------------------------------------
router.route("/delete-round-reserv/:id").delete(deleteRound);
//---------------------update status-----------------------------------------
router.route("/update-status-round-reserv/:id").put(updateStatusRound);

export default router;
