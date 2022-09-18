import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { partnerStore } from "../../../store/partnerStore";
import CreateAllDayReserv from "./CreateAllDayReserv";
import CreateRoundReserv from "./CreateRoundReserv";

const CreateReserv = observer(() => {
  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInfoRestaurant();
    };
    getInfo();
  }, []);
  return (
    <>
    {
        partnerStore.partnerInfo.type_rest === "allDay"? <CreateAllDayReserv/> : <CreateRoundReserv/>
    }
    </>
  );
});

export default CreateReserv;
