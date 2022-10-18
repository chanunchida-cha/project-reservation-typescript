import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getToken } from "../../../../services/authorize";
import ReactPaginate from "react-paginate";
const month = [
  { key: "1", i18n: "มกราคม" },
  { key: "2", i18n: "กุมภาพันธ์" },
  { key: "3", i18n: "มีนาคม" },
  { key: "4", i18n: "เมษายน" },
  { key: "5", i18n: "พฤษภาคม" },
  { key: "6", i18n: "มิถุนายน" },
  { key: "7", i18n: "กรกฎาคม" },
  { key: "8", i18n: "สิงหาคม" },
  { key: "9", i18n: "กันยายน" },
  { key: "10", i18n: "ตุลาคม" },
  { key: "11", i18n: "พฤศจิกายน" },
  { key: "12", i18n: "ธันวาคม" },
] as const;
type Resualt = {
  _id: {
    week: number;
    year: number;
    month: number;
  };
  count: number;
};

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}
const startYear = new Date().getFullYear();
const years1 = Array.from(new Array(10), (val, index) => index + startYear);
const years2 = Array.from(new Array(10), (val, index) => startYear - index);
const selectYear = years1.concat(
  years2.filter((item) => years1.indexOf(item) < 0)
);
const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "x-access-token": getToken() },
    })
    .then((res) => res.data);
function TableReportWeek() {
  const thisMonth = new Date().getMonth();
  const [type, setType] = useState<string>("all");
  const [value, setValue] = useState(month[thisMonth]);
  const [year, setYear] = useState(startYear);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: countReservPerWeek,
    error: errorReservPerWeek,
    isValidating: loadingReservPerWeek,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-per-week`,

    fetcher
  );

  if (errorReservPerWeek) return <div>failed to load</div>;
  if (loadingReservPerWeek) {
    return <div>Loading...</div>;
  }

  const sortLabelsDay = countReservPerWeek
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.week - b._id.week);
  const sortLabelsMonth = sortLabelsDay
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.month - b._id.month);
  const sortLabelsYear = sortLabelsMonth
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.year - b._id.year);

  const dataSets = sortLabelsYear.filter((label: Resualt) => {
    let found = false;

    if (
      Number(value.key) === label._id.month &&
      Number(year) === label._id.year
    ) {
      found = true;
    }

    return found;
  });

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setType(event.target.value);
  }
  const dataPerPage = 15;
  const pagesVisited = pageNumber * dataPerPage;
  const pageCount = Math.ceil(countReservPerWeek.length / dataPerPage);
  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  const displayReport = (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="h-[600px]  overflow-x-auto rounded-lg ">
        <div className="inline-block min-w-full shadow-md rounded-lg ">
          <table className="min-w-full table-auto leading-normal">
            <thead>
              <tr>
                <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                  สัปดาห์/เดือน/ปี
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                  จำนวนการจอง
                </th>
              </tr>
            </thead>
            <tbody>
              {(type === "all" ? sortLabelsYear : dataSets).map(
                (count: Resualt, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {`สัปดาห์ที่ ${count._id.week}/${count._id.month}/${count._id.year}
              `}
                        </p>
                      </td>
                      <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {count.count}
                        </p>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return (
    <div className="w-full mt-4">
      <div>
        <div className="flex">
          <div className="flex items-center mr-4">
            <input
              id="all"
              type="radio"
              name="radio-group"
              className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
              value={"all"}
              onChange={onChangeInput}
              checked={type === "all"}
            />
            <label
              htmlFor="approve"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              รายงานทั้งหมด
            </label>
          </div>
          <div className="flex items-center mr-4">
            <input
              id="filter"
              type="radio"
              name="radio-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              value={"filter"}
              onChange={onChangeInput}
              checked={type === "filter"}
            />
            <label
              htmlFor="disapprove"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              เลือกตามเดือนที่ต้องการ
            </label>
          </div>
        </div>
      </div>

      {type === "filter" && (
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-2">
            <Listbox value={value} onChange={setValue}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                    เลือกเดือนที่ต้องการ
                  </Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">{value.i18n}</span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="fa-sharp fa-solid fa-check w-5 h-5"></i>
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {month.map((month, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-[#189bff] "
                                  : " text-gray-900",
                                "cursor-default select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={month}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "ml-3 block truncate"
                                    )}
                                  >
                                    {month.i18n}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? "text-white"
                                        : "text--[#189bff] ",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <i className="fa-sharp fa-solid fa-check w-5 h-5"></i>
                                  </span>
                                ) : null}
                              </>
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
          <div className="col-span-2">
            <Listbox value={year} onChange={setYear}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                    เลือกปีที่ต้องการ
                  </Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">{year}</span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <i className="fa-sharp fa-solid fa-check w-5 h-5"></i>
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-80 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {selectYear.map((year, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-[#189bff] "
                                  : " text-gray-900",
                                "cursor-default select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={year}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "ml-3 block truncate"
                                    )}
                                  >
                                    {year}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? "text-white"
                                        : "text--[#189bff] ",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <i className="fa-sharp fa-solid fa-check w-5 h-5"></i>
                                  </span>
                                ) : null}
                              </>
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
        </div>
      )}
      {displayReport}
      {countReservPerWeek.length > 15 && (
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
  );
}

export default TableReportWeek;
