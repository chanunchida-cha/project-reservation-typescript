import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import GraphRoundByDay from "./Graph/GraphRound/GraphRoundByDay";
import GraphRounByWeek from "./Graph/GraphRound/GraphRounByWeek";
import GraphRoundByMonth from "./Graph/GraphRound/GraphRoundByMonth";
import TableRound from "./TableRound";
import GraphRoundByYear from "./Graph/GraphRound/GraphRoundByYear";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "x-access-token": getToken() },
    })
    .then((res) => res.data);

const labelsButton = ["รายวัน", "รายสัปดาห์", "รายเดือน", "รายปี"];
function useDashboardAlldatyData() {
 
  const {
    data: countTodayReserv,
    error: errorTodayReserv,
    isValidating: loadingTodayReserv,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-today`,
    fetcher
  );

  const {
    data: countAllReserv,
    error: errorAllReserv,
    isValidating: loadingAllReserv,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv`,
    fetcher
  );
  const {
    data: countReservLastWeek,
    error: errorReservLastWeek,
    isValidating: loadingReservLastWeek,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-last-week`,
    fetcher
  );
  const {
    data: countReservNextWeek,
    error: errorReservNextWeek,
    isValidating: loadingReservNextWeek,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-next-week`,
    fetcher
  );

  const {
    data: pending,
    error: errorpending,
    isValidating: loadingpending,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-pending`,
    fetcher
  );

  const {
    data: arrived,
    error: errorarrived,
    isValidating: loadingarrived,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-arrived`,
    fetcher
  );

  const {
    data: checkOut,
    error: errorcheckOut,
    isValidating: loadingcheckOut,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-check-out`,
    fetcher
  );
  const {
    data: cancel,
    error: errorcancel,
    isValidating: loadingcancel,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-cancel`,
    fetcher
  );

  return {
    countAllReserv,
    countTodayReserv,
    countReservLastWeek,
    countReservNextWeek,
    pending,
    arrived,
    cancel,
    checkOut,
    err:
      errorAllReserv ||
      errorTodayReserv ||
      errorReservLastWeek ||
      errorReservNextWeek ||
      errorpending ||
      errorarrived ||
      errorcheckOut ||
      errorcancel,
    loading:
      loadingAllReserv ||
      loadingTodayReserv ||
      loadingReservLastWeek ||
      loadingReservNextWeek ||
      loadingpending ||
      loadingarrived ||
      loadingcheckOut ||
      loadingcancel,
  };
}
function DashboardRound() {
  const navigate = useNavigate()
  const [type, setType] = useState(labelsButton[0]);
  const data = useDashboardAlldatyData();

  if (data.err) return <div>failed to load</div>;
  if (data.loading) {
    return <div>Loading...</div>;
  }
  return    <div>
  <div className="grid grid-cols-12 gap-4 rounded-md mx-4 my-4">
    <div className="col-span-3 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
      <div className="grid grid-cols-4">
        <div className="col-span-3 font-semibold">จำนวนการจองวันนี้</div>
        <div className="col-span-1 flex justify-end">
          {data.countTodayReserv.count === undefined
            ? "0"
            : data.countTodayReserv.count}
        </div>
      </div>
    </div>
    <div className="col-span-3 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
      <div className="grid grid-cols-4">
        <div className="col-span-3 font-semibold">
          จำนวนการจองสัปดาห์ที่ผ่านมา
        </div>
        <div className="col-span-1 flex justify-end">
          {data.countReservLastWeek.count === undefined
            ? "0"
            : data.countReservLastWeek.count}
        </div>
      </div>
    </div>
    <div className="col-span-3 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
      <div className="grid grid-cols-4">
        <div className="col-span-3 font-semibold">
          จำนวนการจองสัปดาห์หน้า
        </div>
        <div className="col-span-1 flex justify-end">
          {data.countReservNextWeek.count === undefined
            ? "0"
            : data.countReservNextWeek.count}
        </div>
      </div>
    </div>
    <div className="col-span-3 bg-[#85b1fea4] shadow-md px-3 py-4 rounded-lg">
      <div className="grid grid-cols-4">
        <div className="col-span-3 font-semibold">จำนวนการจองทั้งหมด</div>
        <div className="col-span-1 flex justify-end">
          {data.countAllReserv.count === undefined
            ? "0"
            : data.countAllReserv.count}
        </div>
      </div>
    </div>
  </div>
  {/* ------------------- */}
  <div>
    <div className="mt-2 grid grid-cols-12 grid-rows-2 gap-4  rounded-md px-4 py-4">
      <div className="col-span-6 grid grid-rows-3 gap-4  rounded-lg">
        <div className="row-span-1 bg-white rounded-md px-4 py-4">
          <div className="font-semibold">จำนวนการจองแยกตามสถานะ</div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="bg-[#5292ff4e] px-2 py-4 rounded-md ">
              <div className="grid grid-cols-4">
                <div className="col-span-3 font-semibold">Pending</div>
                <div className="col-span-1 flex justify-end">
                  {data.pending.count === undefined
                    ? "0"
                    : data.pending.count}
                </div>
              </div>
            </div>
            <div className="bg-[#ffd485a1] px-2 py-4 rounded-md ">
              <div className="grid grid-cols-4">
                <div className="col-span-3 font-semibold">Arrived</div>
                <div className="col-span-1 flex justify-end">
                  {data.arrived.count === undefined
                    ? "0"
                    : data.arrived.count}
                </div>
              </div>
            </div>
            <div className="bg-[#a29ee2c7] px-2 py-4 rounded-md ">
              <div className="grid grid-cols-4">
                <div className="col-span-3 font-semibold">Check out</div>
                <div className="col-span-1 flex justify-end">
                  {data.checkOut.count === undefined
                    ? "0"
                    : data.checkOut.count}
                </div>
              </div>
            </div>
            <div className="bg-[#e18eac95]  px-2 py-4 rounded-md ">
              <div className="grid grid-cols-4">
                <div className="col-span-3 font-semibold">Cancel</div>
                <div className="col-span-1 flex justify-end">
                  {data.cancel.count === undefined
                    ? "0"
                    : data.cancel.count}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-2   w-full   bg-white rounded-md ">
          <div className="px-10 pt-4 grid grid-cols-2">
            <div className="col-span-1 flex justify-start">
              ข้อมูลการจองวันนี้
            </div>
            <div className="col-span-1 flex justify-end">
              <button
                className=" border-b  border-[#468CF0] hover:font-semibold"
                onClick={() => {
                  navigate(`/partner/reservation`);
                }}
              >
                ดูเพิ่มเติม
              </button>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-2 mx-4" />
          <div className=" flex justify-center">
            <TableRound />
          </div>
        </div>
      </div>

      <div className="col-span-6 bg-white px-3  py-4 rounded-lg overflow-x-auto">
        <div className="grid grid-cols-4 gap-2">
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
          {type === "รายวัน" ? (
            <GraphRoundByDay />
          ) : type === "รายสัปดาห์" ? (
            <GraphRounByWeek />
          ) : type === "รายเดือน" ? (
            <GraphRoundByMonth />
          ) : (
            <GraphRoundByYear />
          )}
        </div>
      </div>
    </div>
  </div>
</div>;
}

export default DashboardRound