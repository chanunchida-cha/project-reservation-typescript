import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { customerStore } from "../../store/customerStore";
import SearchText from "../searchText/SearchText";
import ReactPaginate from "react-paginate";

const HistoryReserv = observer(() => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dataPerPage = 3;
  const pagesVisited = pageNumber * dataPerPage;

  useEffect(() => {
    const getHistory = async () => {
      await customerStore.getAllDayReservPending();
      await customerStore.getAllDayReservArrived();
      await customerStore.getAllDayReservHistory();
      await customerStore.getRoundReservPending();
      await customerStore.getRoundReservArrived();
      await customerStore.getRoundReservHistory();
    };
    getHistory();
  }, []);

  const allHistory = [
    ...customerStore.allDayHistory,
    ...customerStore.roundHistory,
  ];
  const pageCount = Math.ceil(allHistory.length / dataPerPage);
  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };
  const displayData = allHistory
    .filter((reserv) => {
      return (
        reserv.partner.restaurantName?.includes(searchText)
      );
    })
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((reserv) => {
      return (
        <div
          className="hover:bg-gray-50 border border-gray-200 shadow-md my-2 px-4 py-4"
          onClick={() => {
            navigate(`/history/allDay/${reserv._id}/${reserv.partner._id}`);
          }}
        >
          <div className="font-semibold">{reserv.partner.restaurantName}</div>
          <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
          <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
            "en-GB"
          )}`}</div>
          <div>{reserv.status}</div>
        </div>
      );
    });
  return (
    <div className="bg-white ">
      <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div>
          <h4 className="text-xl font-extrabold tracking-tight text-gray-900 px-4 sm:text-xl">
            การจองของฉัน
          </h4>
          <div className="grid grid-cols-4 md:grid md:grid-cols-4 bg-white  rounded-md px-4 py-4 w-96">
            <div className="col-span-2 font-semibold">ชื่อ - นามสกุล</div>
            <div className="col-span-2">
              {`${customerStore.customerLogin?.firstname}  ${customerStore.customerLogin?.lastname}`}
            </div>
            <div className="col-span-2 font-semibold">อีเมลล์</div>
            <div className="col-span-2 ">{`${customerStore.customerLogin?.email}`}</div>
            <div className="col-span-2 font-semibold">เบอร์โทรศัพท์</div>
            <div className="col-span-2">{`${customerStore.customerLogin?.phoneNumber}`}</div>
          </div>
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-2 h-full gap-4 sm:gap-6 lg:gap-8 ">
          <div className="col-span-2 bg-blue-300 rounded-md py-4 px-4">
            <div className=" sm:grid sm:grid-cols-2">
              <div className="col-span-1 text-base font-semibold ">
                จำนวนการจองทั้งหมด
              </div>
              <div className="col-span-1 text-base font-semibold flex justify-end ">
                {customerStore.allDayHistory.length +
                  customerStore.roundHistory.length}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 border-t border-gray-200 ">
          <div className="col-span-2 pt-4 font-semibold">
            การจองที่กำลังจะเกิดขึ้น
          </div>
          {customerStore.allDayReservPending.length === 0 &&
            customerStore.roundReservPending.length === 0 && (
              <div className="text-red-500">ไม่มีการจองที่กำลังจะเกิดขึ้น</div>
            )}
          {(customerStore.allDayReservPending.length > 0 ||
            customerStore.roundReservPending.length > 0) && (
            <div className="col-span-1">
              {customerStore.allDayReservPending.map((reserv) => {
                return (
                  <div
                    className="hover:bg-gray-50 border border-gray-200 shadow-md my-2 px-4 py-4"
                    onClick={() => {
                      navigate(
                        `/history/allDay/${reserv._id}/${reserv.partner._id}`
                      );
                    }}
                  >
                    <div className="font-semibold">
                      {reserv.partner.restaurantName}
                    </div>
                    <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                    <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                      "en-GB"
                    )}`}</div>
                    <div>{reserv.amount} ที่นั่ง</div>
                    <div>{reserv.status}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="col-span-1 ">
            {customerStore.roundReservPending.map((reserv) => {
              return (
                <div
                  className=" hover:bg-gray-50 border border-gray-200 rounded-md shadow-md my-4 px-4 py-4"
                  onClick={() => {
                    navigate(
                      `/history/rounds/${reserv._id}/${reserv.partner._id}`
                    );
                  }}
                >
                  <div className="font-semibold">
                    {reserv.partner.restaurantName}
                  </div>
                  <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                  <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                    "en-GB"
                  )}`}</div>
                  <div>{reserv.amount} ที่นั่ง</div>
                  <div>{reserv.status}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold">การจองที่กำลังดำเนินอยู่</div>
          <div className="col-span-2 pt-4">
            {customerStore.allDayReservArrived.length === 0 &&
              customerStore.roundReservArrived.length === 0 && (
                <div className="text-red-500">
                  ***ไม่มีการจองที่กำลังดำเนินอยู่***
                </div>
              )}
          </div>
          <div className="col-span-1">
            {customerStore.allDayReservArrived.map((reserv) => {
              return (
                <div
                  className="hover:bg-gray-50 border border-gray-200 shadow-md my-2 px-4 py-4"
                  onClick={() => {
                    navigate(
                      `/history/allDay/${reserv._id}/${reserv.partner._id}`
                    );
                  }}
                >
                  <div className="font-semibold">
                    {reserv.partner.restaurantName}
                  </div>
                  <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                  <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                    "en-GB"
                  )}`}</div>
                  <div>{reserv.status}</div>
                </div>
              );
            })}
          </div>
          <div className="col-span-1 ">
            {customerStore.roundReservArrived.map((reserv) => {
              return (
                <div
                  className="hover:bg-gray-50 border border-gray-200 rounded-md shadow-md my-4 px-4 py-4"
                  onClick={() => {
                    navigate(
                      `/history/rounds/${reserv._id}/${reserv.partner._id}`
                    );
                  }}
                >
                  <div className="font-semibold">
                    {reserv.partner.restaurantName}
                  </div>
                  <div>{`หมายเลขการจอง ${reserv.reservNumber}`}</div>
                  <div>{`วันที่ ${new Date(reserv.day).toLocaleDateString(
                    "en-GB"
                  )}`}</div>
                  <div>{reserv.status}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold">ประวัติการจอง</div>
          <div className="col-span-2 pt-4">
            {customerStore.allDayHistory.length === 0 &&
              customerStore.roundHistory.length === 0 && (
                <div className="text-red-500">***ไม่มีประวัติการจอง***</div>
              )}
          </div>
          <div className="mt-4">
            <SearchText value={searchText} onChangeValue={setSearchText} />
          </div>
          <div className="col-span-1">{displayData}</div>
          {allHistory.length > 3 && (
            <>
              {" "}
              <div className="border-b-2 border-gray-200" />
              <div className="flex justify-center">
                <ReactPaginate
                  previousLabel={<i className="fa-solid fa-angles-left"></i>}
                  nextLabel={<i className="fa-solid fa-angles-right"></i>}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default HistoryReserv;
