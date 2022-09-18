import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import SideBar from "./components/partner/SideBar"
import SideBarAdmin from "./components/admin/Sidebar"


type Props = {
  children: React.ReactNode;
};

function LayOut(props: Props) {
  const location = useLocation();
  const partner = location.pathname.startsWith("/partner")
  const admin = location.pathname.startsWith("/admin")
  return (
    <div className="wrapper">
     {location.pathname === "/partner/login"? <Navbar/>:location.pathname === "/partner/register"? <Navbar/>: location.pathname === "/admin/login"?null:partner   ? <SideBar/> : admin ?<SideBarAdmin/> :<Navbar />}
      <main>{props.children}</main>
    </div>
  );
}

export default LayOut;
