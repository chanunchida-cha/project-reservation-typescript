import {
  getCustomerById,
  editCustomerByAdmin,
  editCustomerByCustomer,
  deleteCustomer,
  getAllPartner,
  getPartnerVerify,
  getPartnerApprove,
  getPartnerDisApprove,
  getPartnerById,
  editPartnerByAdmin,
  editPartnerByPartner,
  deletePartner,
  getAdminById,
  editAdminByAdmin,
  editAdminBySelf,
  deleteAdmin,
  getAllAdmins,
  updateStatusPartner,
  getCustomers,
} from "./../controller/rudUserController";
import { Router } from "express";

const router = Router();
const auth = require("../middleware/auth");

//----------------customer---------------------------------------------
router.route("/get-all-customers").get(getCustomers);
router.route("/get-customer/:id").get(getCustomerById);
router.route("/edit-customer-by-admin/:id").put(auth, editCustomerByAdmin);
router.route("/edit-customer-by-customer").put(auth, editCustomerByCustomer);
router.route("/delete-customer/:id").delete(deleteCustomer);

//----------------partner-------------------------------------------------
router.route("/get-all-partner").get(getAllPartner);
router.route("/get-partner-verify").get(getPartnerVerify);
router.route("/get-partner-approve").get(getPartnerApprove);
router.route("/get-partner-disapprove").get(getPartnerDisApprove);
router.route("/get-partner/:id").get(getPartnerById);
router.route("/update-status-partner/:id").put(auth, updateStatusPartner);
router.route("/edit-partner-by-admin/:id").put(auth, editPartnerByAdmin);
router.route("/edit-partner-by-partner").put(auth, editPartnerByPartner);
router.route("/delete-partner/:id").delete(deletePartner);

//---------------------admin---------------------------------------------------
router.route("/get-all-admin").get(getAllAdmins);
router.route("/get-admin/:id").get(getAdminById);
router.route("/edit-admin-by-admin/:id").put(auth, editAdminByAdmin);
router.route("/edit-admin-by-self").put(auth, editAdminBySelf);
router.route("/delete-admin/:id").delete(deleteAdmin);

export default router;
