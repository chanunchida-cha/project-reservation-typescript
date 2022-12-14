import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getToken } from "../../../services/authorize";
import ReactPaginate from "react-paginate";

type Resualt = {
  _id: {
    year: number;
    month: number;
  };
  count: number;
  information: {
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    confirmPass: string;
    restaurantName?: string;
    address?: string;
  };
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
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ReportMonth() {
  const [type, setType] = useState<string>("all");
  const [year, setYear] = useState(startYear);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: countReservPerMonth,
    error: errorReservPerMonth,
    isValidating: loadingReservPerMonth,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-reserv-per-month`,

    fetcher
  );

  if (errorReservPerMonth) return <div>failed to load</div>;
  if (loadingReservPerMonth) {
    return <div>Loading...</div>;
  }
  

  const sortLabelsMonth = countReservPerMonth
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.month - b._id.month);
  const sortLabelsYear = sortLabelsMonth
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.year - b._id.year);

  const dataSets = sortLabelsYear.filter((label: Resualt) => {
    let found = false;

    if (Number(year) === label._id.year) {
      found = true;
    }

    return found;
  });

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setType(event.target.value);
  }
  const dataPerPage = 15;
  const pagesVisited = pageNumber * dataPerPage;
  const pageCount = Math.ceil(countReservPerMonth.length / dataPerPage);
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
                ???????????????/??????
              </th>
              <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                ???????????????????????????????????????
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
                ?????????????????????????????????
              </th>
            </tr>
          </thead>
          <tbody>
            {(type === "all" ? sortLabelsYear : dataSets).slice(pagesVisited, pagesVisited + dataPerPage).map(
              (count: Resualt, index: number) => {
                return (
                  <tr key={index}>
                    <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {`???????????????????????? ${count._id.month}/${count._id.year}
            `}
                      </p>
                    </td>
                    <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {`???????????? ${count.information.restaurantName}
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

  )

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
              ???????????????????????????????????????
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
              ????????????????????????????????????????????????????????????
            </label>
          </div>
        </div>
      </div>

      {type === "filter" && (
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-2">
            <Listbox value={year} onChange={setYear}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                    ???????????????????????????????????????????????????
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
    {countReservPerMonth.length > 15 && (
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

export default ReportMonth;
