import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminData from "./CrudAdmin/AdminData";
import CreateAdmin from "./CrudAdmin/CreateAdmin";
import EditAdmin from "./CrudAdmin/EditAdmin";
import SingleAdminData from "./CrudAdmin/SingleAdminData";
import CreateCustomer from "./CrudCustomer/CreateCustomer";
import CustomerData from "./CrudCustomer/CustomerData";
import EditCustomer from "./CrudCustomer/EditCustomer";
import SingleCustomerData from "./CrudCustomer/SingleCustomerData";
import CreatePartner from "./CrudPartner/CreatePartner";
import EditPartner from "./CrudPartner/EditPartner";
import PartnerApprove from "./CrudPartner/PartnerApprove";
import PartnerDisApprove from "./CrudPartner/PartnerDisApprove";
import PartnerVerification from "./CrudPartner/PartnerVerification";
import SinglePartner from "./CrudPartner/SinglePartner";
import Dashboard from "./Dashboard/Dashboard";
import GraphByMonth from "./Dashboard/Graph/GraphByMonth";
import EditProfile from "./Profile/EditProfile";
import ResetPassword from "./Profile/ResetPassword";
import Report from "./Report/Report";

function AdminRoute() {
  return (
    <div>
      <Routes>
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/admin/partner/verification"
          element={<PartnerVerification />}
        />
        <Route path="/admin/partner/approve" element={<PartnerApprove />} />
        <Route
          path="/admin/partner/disapprove"
          element={<PartnerDisApprove />}
        />
        <Route path="/admin/adminsdata" element={<AdminData />} />
        <Route path="/admin/adminsdata/:id" element={<SingleAdminData />} />
        <Route path="/admin/customersdata" element={<CustomerData />} />
        <Route path="/admin/customerdata/:id" element={<SingleCustomerData />} />
        <Route path="/admin/create/admin" element={<CreateAdmin />} />
        <Route path="/admin/edit/admin/:id" element={<EditAdmin />} />

        <Route path="/admin/create/customer" element={<CreateCustomer />} />
        <Route path="/admin/edit/customer/:id" element={<EditCustomer />} />
        <Route path="/admin/create/partner" element={<CreatePartner />} />
        <Route path="/admin/partner/:status/:id" element={<SinglePartner/>}/>
        <Route path="/admin/edit/partner/:id" element={<EditPartner />} />
        <Route path="/admin/edit/password" element={<ResetPassword />} />
        <Route path="/admin/edit/profile" element={<EditProfile />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
