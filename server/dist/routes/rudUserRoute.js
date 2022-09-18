"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rudUserController_1 = require("./../controller/rudUserController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth = require("../middleware/auth");
//----------------customer---------------------------------------------
router.route("/get-all-customers").get(rudUserController_1.getCustomers);
router.route("/get-customer/:id").get(rudUserController_1.getCustomerById);
router.route("/edit-customer-by-admin/:id").put(auth, rudUserController_1.editCustomerByAdmin);
router.route("/edit-customer-by-customer").put(auth, rudUserController_1.editCustomerByCustomer);
router.route("/delete-customer/:id").delete(rudUserController_1.deleteCustomer);
//----------------partner-------------------------------------------------
router.route("/get-all-partner").get(rudUserController_1.getAllPartner);
router.route("/get-partner-verify").get(rudUserController_1.getPartnerVerify);
router.route("/get-partner-approve").get(rudUserController_1.getPartnerApprove);
router.route("/get-partner-disapprove").get(rudUserController_1.getPartnerDisApprove);
router.route("/get-partner/:id").get(rudUserController_1.getPartnerById);
router.route("/update-status-partner/:id").put(auth, rudUserController_1.updateStatusPartner);
router.route("/edit-partner-by-admin/:id").put(auth, rudUserController_1.editPartnerByAdmin);
router.route("/edit-partner-by-partner").put(auth, rudUserController_1.editPartnerByPartner);
router.route("/delete-partner/:id").delete(rudUserController_1.deletePartner);
//---------------------admin---------------------------------------------------
router.route("/get-all-admin").get(rudUserController_1.getAllAdmins);
router.route("/get-admin/:id").get(rudUserController_1.getAdminById);
router.route("/edit-admin-by-admin/:id").put(auth, rudUserController_1.editAdminByAdmin);
router.route("/edit-admin-by-self").put(auth, rudUserController_1.editAdminBySelf);
router.route("/delete-admin/:id").delete(rudUserController_1.deleteAdmin);
exports.default = router;
