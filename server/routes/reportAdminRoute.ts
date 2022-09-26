import { Router } from "express";
const router = Router();
import {
  countCustomer,
  countPartner,
  countAdmin,
  countRestInfo,
  countPartnerVerification,
  countPartnerApprove,
  countPartnerDisApprove,
  groupPartnerByTypeAllDay,
  groupPartnerByTypeRound,
  groupReservByPartnerForWeek,
  groupReservByPartnerForMonth,
  groupReservByPartnerForYear
} from "../controller/reportAdminController";

router.route("/admin/get-count-customer").get(countCustomer);
router.route("/admin/get-count-partner").get(countPartner);
router.route("/admin/get-count-admin").get(countAdmin);
router.route("/admin/get-count-rest-info").get(countRestInfo);
router.route("/admin/get-count-partner-varification").get(countPartnerVerification);
router.route("/admin/get-count-partner-approve").get(countPartnerApprove);
router.route("/admin/get-count-partner-disapprove").get(countPartnerDisApprove);
router.route("/admin/get-count-partner-type-allday").get(groupPartnerByTypeAllDay);
router.route("/admin/get-count-partner-type-round").get(groupPartnerByTypeRound);
router.route("/admin/get-count-reserv-per-week").get(groupReservByPartnerForWeek);
router.route("/admin/get-count-reserv-per-month").get(groupReservByPartnerForMonth);
router.route("/admin/get-count-reserv-per-year").get(groupReservByPartnerForYear);

export default router;
