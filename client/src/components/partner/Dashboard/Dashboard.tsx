import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { partnerStore } from "../../../store/partnerStore";
import DashboardAllDay from "./DashboardAllDay";
import DashboardRound from "./DashboardRound";

const Dashboard = observer(() => {
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInfoRestaurant();
    };
    getInfo();
  }, []);
  return <div>
    {partnerStore.partnerInfo.type_rest === "allDay" ? <DashboardAllDay/> : <DashboardRound/>}
  </div>;
});
export default Dashboard;
