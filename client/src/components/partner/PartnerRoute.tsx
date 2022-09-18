import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateInfotmation from "./CrudInformation/CreateInformation";
import EditInformation from "./CrudInformation/EditInformation";
import Information from "./CrudInformation/Information";
import CreateMenu from "./CrudMenu/CreateMenu";
import EditMenu from "./CrudMenu/EditMenu";
import MenuData from "./CrudMenu/MenuData";
import AllDayAllData from "./CrudReserv/AllDayAllData";
import CreateReserv from "./CrudReserv/CreateReserv";
import EditAllDayReserv from "./CrudReserv/EditAllDayReserv";
import EditRoundReserv from "./CrudReserv/EditRoundReserv";
import ReservData from "./CrudReserv/ReservData";
import CreateTable from "./CrudTable/CreateTable";
import EditTable from "./CrudTable/EditTable";
import TableData from "./CrudTable/TableData";
function PartnerRoute() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/partner/information" element={<Information />} />
        <Route path="/partner/edit/information" element={<EditInformation />} />
        <Route path="/partner/menu" element={<MenuData />} />
        <Route path="/partner/create/menu" element={<CreateMenu />} />
        <Route path="/partner/edit/menu/:id" element={<EditMenu />} />
        <Route path="/partner/table" element={<TableData />} />
        <Route path="/partner/create/table" element={<CreateTable />} />
        <Route path="/partner/edit/table/:id" element={<EditTable />} />
        <Route path="/partner/reservation" element={<ReservData />} />
        <Route
          path="/partner/create/reservation/:id"
          element={<CreateReserv />}
        />
        <Route
          path="/partner/reservationdata/allday/edit/:partner_id/:reserv_id"
          element={<EditAllDayReserv />}
        />
               <Route
          path="/partner/reservationdata/round/edit/:partner_id/:reserv_id"
          element={<EditRoundReserv />}
        />
      </Routes>
    </div>
  );
}

export default PartnerRoute;
