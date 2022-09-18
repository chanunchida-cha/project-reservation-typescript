import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { partnerStore } from "../../../store/partnerStore";
import CreateInfotmation from "./CreateInformation";
import InformationData from "./InformationData";

const Information = observer(() => {
  useEffect(() => {
    const getInformation = async () => {
      await partnerStore.getInfoRestaurant();
    };
    getInformation();
    console.log(partnerStore.partnerInfo);
  }, []);

  if (!partnerStore.partnerInfo) {
    return (
      <div>
        <CreateInfotmation />
      </div>
    );
  } else {
    return (
      <div>
        <InformationData />
      </div>
    );
  }
});

export default Information;
