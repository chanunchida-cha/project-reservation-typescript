import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { partnerStore } from "../../store/partnerStore";
import { reservStore } from "../../store/reservStore";
import { useParams, useNavigate } from "react-router-dom";

const SingleHistory=observer(()=> {
    const navigate = useNavigate();
  const { type,reserv_id,partner_id } = useParams();
  useEffect(() => {
    const getReserv = async () => {
      if (type === "rounds") {
        await reservStore.getRoundReservById(reserv_id!);
      } else if (type === "allDay") {
        await reservStore.getAllDayReservById(reserv_id!);
      }
    };
    getReserv();
    const getInfoData = async () => {
      await partnerStore.getInfoRestaurantById(partner_id!);
    };
    getInfoData();
  }, []);
  const partnerInfo = partnerStore.partnerInfoById;
  const reserv =
    type === "allDay" ? reservStore.allDayReserv : reservStore.roundReserv;
  return (
    <div className="mt-20 mx-full sm:mt-32 sm:mx-96 md:mt-32 md:mx-20 lg:mt-32 lg:mx-96 ">
    <div
      className="bg-white shadow overflow-hidden sm:bg-white sm:shadow sm:overflow-hidden sm:rounded-lg "
      key={partnerInfo._id}
    >
      <div
        className={
          reserv.status === "cancel"
            ? "px-4 bg-[#5c5959] py-4 sm:px-6"
            : "px-4 bg-blue-700 py-4 sm:px-6"
        }
      >
        <h3 className="text-lg leading-6 font-medium text-white">
          ประวัติการจอง
        </h3>
       
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-2 text-base  sm:px-4">รายละเอียดการจอง</div>
        <div className="px-4 py-2  sm:px-4">
          {`ร้าน${partnerInfo.information.restaurantName}`}
        </div>
        <div className="px-4 py-2   sm:px-4">{`หมายเลขการจอง: ${reserv.reservNumber}`}</div>
        {reserv.self_reserv && (
          <>
            <div className="px-4 py-2   sm:px-4">
              {`ชื่อ-นามสกุล: ${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
            </div>
            <div className="px-4 py-2   sm:px-4">
              {`เบอร์โทรศัพท์: ${reserv.self_reserv.phoneNumber} `}
            </div>
          </>
        )}
        {reserv.customer!.length > 0 && (
          <div className="px-4 py-2   sm:px-4">
            {reserv.customer?.map((customer) => {
              return `ชื่อ-นามสกุล: ${customer.firstname}  ${customer.lastname} `;
            })}
          </div>
        )}
        <div className="px-4 py-2   sm:px-4">{`วัน/เดือน/ปี:  ${new Date(
          reserv.day
        ).toLocaleDateString("en-GB")}`}</div>
        <div className="px-4 py-2   sm:px-4">{`เวลา:   ${reserv.start} - ${reserv.end}`}</div>
        <div className="px-4 py-2   sm:px-4">{`จำนวน:   ${reserv.amount}`}</div>
        <div className="px-4 py-2  sm:px-4 text-gray-500">{`ติดต่อสอบถาม  ${partnerInfo.contact}`}</div>
      
      </div>
    </div>
  </div>
  )
}
)
export default SingleHistory