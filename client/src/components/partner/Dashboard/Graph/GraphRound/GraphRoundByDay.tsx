import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getToken } from "../../../../../services/authorize";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
    day: number;
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

function GraphRoundByDay() {
  const thisMonth = new Date().getMonth();
  const [value, setValue] = useState(month[thisMonth]);
  const [year, setYear] = useState(startYear);
  const {
    data: countReservPerDay,
    error: errorReservPerDay,
    isValidating: loadingReservPerDay,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-per-day`,
    fetcher
  );
  if (errorReservPerDay) return <div>failed to load</div>;
  if (loadingReservPerDay) {
    return <div>Loading...</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        suggestedMin: 0,

        suggestedMax: 100,
        ticks: {
          // forces step size to be 50 units
          stepSize: 10,
        },
      },
    },
  } as const;

  const sortLabelsYear = countReservPerDay
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.year - b._id.year);
  const sortLabelsMonth = sortLabelsYear
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.month - b._id.month);
  const sortLabelsDay = sortLabelsMonth
    .slice()
    .sort((a: Resualt, b: Resualt) => a._id.day - b._id.day);

  let dataSets = [];
  const labels = [];
  const datas = [];
  dataSets = sortLabelsDay.filter((label: Resualt) => {
    let found = false;

    if (
      Number(value.key) === label._id.month &&
      Number(year) === label._id.year
    ) {
      found = true;
    }

    return found;
  });
  for (const count of dataSets) {
    labels.push(`${count._id.day}/${count._id.month}/${count._id.year}`);
    datas.push(count.count);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "จำนวนการจอง / วัน",
        data: datas,
        backgroundColor: "#6295EF",
      },
    ],
  };
  return (
    <div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-3">
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
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {month.i18n}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text--[#189bff] ",
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
        <div className="col-span-3">
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
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {year}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text--[#189bff] ",
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
      <div className="w-full mt-4">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default GraphRoundByDay;
