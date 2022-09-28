import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { partnerStore } from "../../store/partnerStore";
import PartnerRoute from "./PartnerRoute";

const sideBar = observer(() => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const partner = partnerStore.partnerLogin;
  if (!token) {
    navigate("/partner/login");
  }
  return (
    <div className="h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      {/* Header */}
      <div className="fixed w-full flex items-center  text-2xl font-semibold  h-14 text-black z-10">
        <div className="flex pt-4 items-center gap-x-4 justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-white border-none">
          <i className="fa-solid text-red-700 fa-cube"></i>
          <span className="hidden md:block">cubeQue</span>
        </div>
        <div className="fixed-top flex justify-end pr-10 items-center h-14 text-base bg-white w-full">
          {`คุณ${partner?.firstname}  ${partner?.lastname}`}
        </div>
      </div>

      {/* ./Header */}
      {/* Sidebar */}
      <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white dark:bg-gray-900 h-full text-black transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <a
                href="/partner/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-200 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </a>
            </li>

            <li className="md:block text-gray-600">
              <a className="relative flex flex-row items-center h-11 focus:outline-none  dark:hover:bg-gray-600 text-white-600 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-store w-6"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  ข้อมูลทั่วไป
                </span>
              </a>
            </li>
            <li>
              <a
                href={`/partner/information`}
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  ข้อมูลร้านอาหาร
                </span>
              </a>
            </li>
            <li>
              <a
                href={`/partner/menu`}
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  เมนูอาหาร
                </span>
              </a>
            </li>
            <li>
              <a
                href={`/partner/table`}
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  โต๊ะอาหาร
                </span>
              </a>
            </li>
            <li className="md:block text-gray-600">
              <a className="relative flex flex-row items-center h-11 focus:outline-none  dark:hover:bg-gray-600 text-white-600 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-calendar w-6"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  การจอง
                </span>
              </a>
            </li>
            <li>
              <a
                href="/partner/reservation"
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  ข้อมูลการจอง
                </span>
              </a>
            </li>
            <li>
              <a
                href={`/partner/create/reservation/${partner?._id}`}
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  เพิ่มการจอง
                </span>
              </a>
            </li>

            <li>
              <a
                href="/partner/report"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-200 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-chart-column w-6"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  รายงาน
                </span>
              </a>
            </li>
            <li className="md:block text-gray-600">
              <a className="relative flex flex-row items-center h-11 focus:outline-none  dark:hover:bg-gray-600 text-white-600 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-gear w-6"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  ตั้งค่า
                </span>
              </a>
            </li>
            <li>
              <a
                href="/partner/edit/password"
                className="relative flex flex-row items-center text-sm h-11 focus:outline-none hover:bg-blue-200 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500  pr-6"
              >
                <span className="inline-flex justify-center items-center ml-10 tracking-wide truncate">
                  เปลี่ยนรหัสผ่าน
                </span>
              </a>
            </li>

            <li>
              <a
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-200 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                onClick={() => {
                  partnerStore.logout();
                  navigate("/");
                }}
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  ออกจากระบบ
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* ./Sidebar */}
      <div className=" h-full ml-14 mt-12  md:ml-64  bg-gray-100 ">
        <div className="px-20 py-6 pt-10 bg-gray-100">
          <PartnerRoute />
        </div>
      </div>
    </div>
  );
});

export default sideBar;
