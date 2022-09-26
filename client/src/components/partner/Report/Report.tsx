import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { partnerStore } from "../../../store/partnerStore";
import ReportAllDay from "./ReportAllDay/ReportAllDay";
import ReportRound from "./ReportRound/ReportRound";

const Report = observer(() => {
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInfoRestaurant();
    };
    getInfo();
  }, []);
  return <div>{
    partnerStore.partnerInfo.type_rest === "allDay"?<ReportAllDay/>:<ReportRound/>}</div>;
});
export default Report;
