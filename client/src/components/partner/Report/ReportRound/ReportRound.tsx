import React, { useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import TableReportDay from "./TableReportDay";
import TableReportWeek from "./TableReportWeek";
import TableReportMonth from "./TableReportMonth";
import TableReportYear from "./TableReportYear";

const labelsType = ["รายวัน", "รายสัปดาห์", "รายเดือน", "รายปี"];
function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}
function ReportRound() {
  const [type, setType] = useState(labelsType[0]);
  return (
    <div className="mt-3 md:mt-0 md:col-span-2">
    <div className=" grid grid-cols-6">
      <div className="col-span-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          รายงาน
        </h3>
      </div>
    </div>
    <div className="border-t border-gray-300" />
    <div className="grid grid-cols-6">
      <div className="col-span-1 mt-4">
        <Listbox value={type} onChange={setType}>
          {({ open }) => (
            <>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="flex items-center">{type}</span>
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
                    {labelsType.map((type, index) => (
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
                        value={type}
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
                                {type}
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
    <div className="  ">
      {type === "รายวัน" ? (
        <TableReportDay />
      ) : type === "รายสัปดาห์" ? (
        <TableReportWeek />
      ) : type === "รายเดือน" ? (
        <TableReportMonth />
      ) :<TableReportYear/>}
    </div>
  </div>
  )
}

export default ReportRound