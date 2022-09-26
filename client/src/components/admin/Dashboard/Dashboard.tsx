import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import GraphCreateInfoPercen from "./Graph/GraphCreateInfoPercen";
import GraphByWeek from "./Graph/GraphByWeek";
import GraphByMonth from "./Graph/GraphByMonth";
import GraphByYear from "./Graph/GraphByYear";

const labelsButton = ["รายสัปดาห์", "รายเดือน", "รายปี"];
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Dashboard() {
  const [type, setType] = useState(labelsButton[0]);
  const {
    data: countCustomer,
    error: errorCustomer,
    isValidating: loadingCustomer,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-customer`,
    fetcher
  );
  const {
    data: countPartner,
    error: errorPartner,
    isValidating: loadingPartner,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner`,
    fetcher
  );
  const {
    data: countAdmin,
    error: errorAdmin,
    isValidating: loadingAdmin,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-admin`,
    fetcher
  );
  const {
    data: countPartnerTypeAllday,
    error: errorPartnerTypeAllday,
    isValidating: loadingPartnerTypeAllday,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner-type-allday`,
    fetcher
  );
  const {
    data: countPartnerTypeRound,
    error: errorPartnerTypeRound,
    isValidating: loadingPartnerTypeRound,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner-type-round`,
    fetcher
  );
  const {
    data: partnerVerification,
    error: errorPartnerVerification,
    isValidating: loadingPartnerVerification,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner-varification`,
    fetcher
  );
  const {
    data: partnerApprove,
    error: errorPartnerApprove,
    isValidating: loadingPartnerApprove,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner-approve`,
    fetcher
  );
  const {
    data: partnerDisApprove,
    error: errorPartnerDisApprove,
    isValidating: loadingPartnerDisApprove,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner-disapprove`,
    fetcher
  );

  if (
    errorCustomer ||
    errorPartner ||
    errorPartnerTypeRound ||
    errorPartnerTypeAllday ||
    errorPartnerVerification ||
    errorPartnerApprove ||
    errorPartnerDisApprove ||
    errorAdmin
  )
    return <div>failed to load</div>;
  if (
    loadingCustomer ||
    loadingPartner ||
    loadingPartnerTypeRound ||
    loadingPartnerTypeAllday ||
    loadingPartnerVerification ||
    loadingPartnerApprove ||
    loadingPartnerDisApprove ||
    loadingAdmin
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 rounded-md mx-4 mt-4 mb-2">
        <div className="col-span-4 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
          <div className="grid grid-cols-4">
            <div className="col-span-3 font-semibold">ลูกค้า</div>
            <div className="col-span-1 flex justify-end">
              {countCustomer.count === undefined ? "0" : countCustomer.count}
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
          <div className="grid grid-cols-4">
            <div className="col-span-3 font-semibold">ร้านอาหาร</div>
            <div className="col-span-1 flex justify-end">
              {countPartner.count === undefined ? "0" : countPartner.count}
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
          <div className="grid grid-cols-4">
            <div className="col-span-3 font-semibold">ผู้ดูแลระบบ</div>
            <div className="col-span-1 flex justify-end ">
              {countAdmin.count === undefined ? "0" : countAdmin.count}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" grid grid-cols-12  gap-4  rounded-md px-4 py-4">
          <div className="col-span-6 grid grid-rows-4 gap-4  rounded-lg">
            <div className="row-span-1 bg-white rounded-md px-4 py-4">
              <div className="font-semibold">จำนวนร้านอาหารแยกตามสถานะ</div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-[#5292ff4e] px-2 py-4 rounded-md ">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 font-semibold">รอตรวจสอบ</div>
                    <div className="col-span-1 flex justify-end">
                      {partnerVerification.count === undefined
                        ? "0"
                        : partnerVerification.count}
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffd485a1] px-2 py-4 rounded-md ">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 font-semibold">อนุมัติ</div>
                    <div className="col-span-1 flex justify-end">
                      {partnerApprove.count === undefined
                        ? "0"
                        : partnerApprove.count}
                    </div>
                  </div>
                </div>
                <div className="bg-[#a29ee2c7] px-2 py-4 rounded-md ">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 font-semibold">ไม่อนุมัติ</div>
                    <div className="col-span-1 flex justify-end">
                      {partnerDisApprove.count === undefined
                        ? "0"
                        : partnerDisApprove.count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-1 bg-white rounded-md px-4 py-4">
              <div className="font-semibold">
                จำนวนร้านอาหารแยกตามประเภทร้าน
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-[#F59C88] px-2 py-4 rounded-md ">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 font-semibold">
                      เปิดเป็นรอบเวลา
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {countPartnerTypeRound.count === undefined
                        ? "0"
                        : countPartnerTypeRound.count}
                    </div>
                  </div>
                </div>

                <div className="bg-[#a29ee2c7] px-2 py-4 rounded-md ">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3 font-semibold">เปิดทั้งวัน</div>
                    <div className="col-span-1 flex justify-end">
                      {countPartnerTypeAllday.count === undefined
                        ? "0"
                        : countPartnerTypeAllday.count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-2   w-full   bg-white rounded-md ">
              <div className="px-10 pt-4 grid grid-cols-2">
                <div className="col-span-1 flex justify-start">
                  ร้อยละของร้านอาหารที่ตั้งค่าข้อมูลทั่วไป
                </div>
                <div className="col-span-1 flex justify-end"></div>
              </div>
              <div className="border-t border-gray-300 mt-2 mx-4" />
              <div className="  flex justify-center">
                <GraphCreateInfoPercen />
              </div>
            </div>
          </div>

          <div className="col-span-6 bg-white px-3  py-4 rounded-lg overflow-x-auto">
            <div className="mb-2 flex justify-center font-semibold">
              จำนวนการจองของแต่ละร้านอาหาร
            </div>
            <div className="border-t border-gray-300 mt-2 mx-4" />
            <div className="grid grid-cols-3 gap-2">
              {labelsButton.map((labelButton, index) => {
                return (
                  <div className="col-span-1 flex justify-center" key={index}>
                    <button
                      className={
                        labelButton === type
                          ? "border-b py-2 font-semibold border-[#468CF0] "
                          : "hover:font-semibold"
                      }
                      onClick={() => {
                        setType(labelButton);
                      }}
                    >
                      {labelButton}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-center">{`จำนวนการจอง${type}`}</div>
            <div className="mt-2">
              {type === "รายสัปดาห์" ? (
                <GraphByWeek />
              ) : type === "รายเดือน" ? (
                <GraphByMonth />
              ) : (
                <GraphByYear />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
