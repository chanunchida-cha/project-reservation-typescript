import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { reservStore } from "../../../store/reservStore";
import { Listbox, Transition } from "@headlessui/react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SettingFilterData from "./SettingFilterData";
import { partnerStore } from "../../../store/partnerStore";
import SearchText from "../../searchText/SearchText";

const initialStatus = ["pending", "arrived", "check out", "cancel"];
const types = [
  {
    key: "allReserv",
    i18n: "การจองทั้งหมด",
  },
  {
    key: "rangeDate",
    i18n: "การจองตามวันที่กำหนด",
  },
];
const AllDayAllData = observer(() => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [type, setType] = useState(types[0]);
  const [selected, setSelected] = useState();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const dataPerPage = 5;
  const pagesVisited = pageNumber * dataPerPage;
  useEffect(() => {
    const getAllDayReservs = async () => {
      await reservStore.getAllDayReserv();
    };
    getAllDayReservs();
  }, []);
  const allDayReservs = reservStore.allDayReservs;
  const partner = partnerStore.partnerLogin;
  console.log(new Date(startDate!));

  const pageCount = Math.ceil(allDayReservs.length / dataPerPage);
  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  const confirmUpdateStatus = (
    reserv_id: string,

    status: string
  ) => {
    console.log(reserv_id);
    console.log(status);
    Swal.fire({
      title: "ยืนยันการแก้ไขสถานะ",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.updateStatusAllDay(reserv_id, status);
      }
    });
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        reservStore.deleteAllDayReserv(id);
      }
    });
  };

  const displayData = (
    <div className="inline-block min-w-full   shadow-md ">
      <table className="w-full table-auto leading-normal ">
        <thead>
          <tr>
            <th className="px-1 py-3 border-b-2 border-gray-200 bg-white  text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              หมายเลขการจอง
            </th>
            <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              วัน/เดือน/ปี
            </th>
            <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              เวลา
            </th>
            <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              จำนวนคน
            </th>
            <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              โต๊ะ
            </th>
            <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              ชื่อ-นามสกุล
            </th>
            <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
              สถานะ
            </th>
            <th className="px-2 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {allDayReservs
            .filter((reserv) => {

              const day = new Date(reserv.day).getTime();
              const start = new Date(startDate!).getTime();
              const end = new Date(endDate!).getTime();
              const dayWithOutTime = new Date(day).setUTCHours(0, 0, 0, 0);
              const startWithOutTime = new Date(start).setUTCHours(0, 0, 0, 0);
              const endWithOutTime = new Date(end).setUTCHours(0, 0, 0, 0);
              const data =
                new Date(dayWithOutTime).getTime() >=
                  new Date(startWithOutTime).getTime() &&
                new Date(dayWithOutTime).getTime() <=
                  new Date(endWithOutTime).getTime();
              if (searchText !== "") {
                return (
                  reserv.reservNumber.includes(searchText) 
                );
              } else if (type.key === "allReserv") {
                return reserv;
              } else if (type.key === "rangeDate") {
                return data;
              }
            })
            .slice(pagesVisited, pagesVisited + dataPerPage)
            .map((reserv, index) => {
              return (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-1 py-2 border-b  border-gray-200   text-sm text-center"
                  >
                    <a className="text-gray-900 whitespace-no-wrap">
                      {reserv.reservNumber}
                    </a>
                  </td>
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-3 py-2 border-b border-gray-200  text-sm text-center"
                  >
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(reserv.day).toLocaleDateString("en-GB")}
                    </p>
                  </td>
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-3 py-3 border-b border-gray-200  text-sm text-center"
                  >
                    <p className="text-gray-900 whitespace-no-wrap">
                      {`${reserv.start} - ${reserv.end}`}
                    </p>
                  </td>
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-2 py-3 border-b border-gray-200  text-sm text-center"
                  >
                    <p className="text-gray-900 whitespace-no-wrap">
                      {reserv.amount}
                    </p>
                  </td>
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-3 py-3 border-b border-gray-200  text-sm text-center"
                  >
                    <p className="text-gray-900 whitespace-no-wrap">
                      {reserv.table
                        .map((table) => {
                          return table;
                        })
                        .join(", ")}
                    </p>
                  </td>
                  {reserv.self_reserv && (
                    <td
                      onClick={() => {
                        navigate(`/partner/reserv/allday/${reserv._id}`);
                      }}
                      className="px-3 py-3 border-b border-gray-200  text-sm text-center"
                    >
                      <p className="text-gray-900 whitespace-no-wrap">
                        {`${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                      </p>
                    </td>
                  )}
                  {reserv.customer!.length > 0 && (
                    <td
                      onClick={() => {
                        navigate(`/partner/reserv/allday/${reserv._id}`);
                      }}
                      className="px-3 py-3 border-b border-gray-200  text-sm text-center"
                    >
                      <p className="text-gray-900 whitespace-no-wrap">
                        {reserv.customer!.map((customer) => {
                          return `${customer.firstname}  ${customer.lastname} `;
                        })}
                      </p>
                    </td>
                  )}
                  <td
                    onClick={() => {
                      navigate(`/partner/reserv/allday/${reserv._id}`);
                    }}
                    className="px-2 py-3 border-b border-gray-200  text-sm text-center "
                  >
                    <div className="flex items-center justify-center p-2">
                      <Listbox
                        as="div"
                        className="space-y-1"
                        value={selected}
                        onChange={setSelected}
                      >
                        {({ open }) => (
                          <>
                            <div className="relative">
                              <span className="inline-block w-full rounded-md shadow-sm">
                                <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                  <span className="block truncate">
                                    {reserv.status}
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg
                                      className="h-5 w-5 text-gray-400"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      stroke="currentColor"
                                    >
                                      <path
                                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </Listbox.Button>
                              </span>

                              <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute  mt-1 w-full rounded-md bg-white shadow-lg"
                              >
                                <Listbox.Options
                                  static
                                  className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                >
                                  {initialStatus.map((type, index) => (
                                    <Listbox.Option
                                      onClick={() => {
                                        confirmUpdateStatus(reserv._id, type);
                                      }}
                                      key={index}
                                      value={type}
                                    >
                                      {({ selected, active }) => (
                                        <div
                                          className={`${
                                            active
                                              ? "text-white bg-gray-400"
                                              : "text-gray-900"
                                          } cursor-default select-none relative py-2 pl-8 pr-4`}
                                        >
                                          <span
                                            className={`${
                                              selected
                                                ? "font-semibold"
                                                : "font-normal"
                                            } block truncate`}
                                          >
                                            {type}
                                          </span>
                                          {selected && (
                                            <span
                                              className={`${
                                                active
                                                  ? "text-white"
                                                  : "text-blue-600"
                                              } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                            >
                                              <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 text-sm ">
                    <button
                      className="z-50 py-1 px-3 mr-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                      onClick={() => {
                        navigate(
                          `/partner/reservationdata/allday/edit/${reserv.partner_id}/${reserv._id}`
                        );
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      className=" z-50 py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800"
                      onClick={() => {
                        confirmDelete(reserv._id);
                      }}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-6 border-b-2 pb-4">
        <div>
          <h1 className="text-lg font-medium ">ข้อมูลการจอง</h1>
        </div>
        <div className=" col-start-6 flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md"
            onClick={() => {
              navigate(`/partner/create/reservation/${partner?._id}`);
            }}
          >
            เพิ่มข้อมูลการจอง
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div>
          <SettingFilterData
            types={types}
            value={type}
            onChangeValue={setType}
          />
        </div>
        {type.key === "rangeDate" && (
          <>
            <div className="bg-white mt-3 col-start-3 ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <div className="bg-white mt-3 ol-start-4">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    onChange={setEndDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </>
        )}
      </div>
      <div className="mt-4">
        <SearchText value={searchText} onChangeValue={setSearchText} />
      </div>
      <div className="h-[450px] mb-7 mt-5 rounded-md">{displayData}</div>
      {allDayReservs.length > 3 && (
        <>
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
  );
});

export default AllDayAllData;
