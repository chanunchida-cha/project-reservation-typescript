import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { partnerStore } from "../../../store/partnerStore";
import AllDayAllData from "./AllDayAllData";
import RoundsAllData from "./RoundsAllData";

const ReservData = observer(() => {
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInfoRestaurant();
    };
    getInfo();
  }, []);
  return (
    <>
      {partnerStore.partnerInfo.type_rest === "allDay" ? (
        <AllDayAllData />
      ) : (
        <RoundsAllData />
      )}
    </>
  );
});

export default ReservData;
