import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { reservStore } from "../../../store/reservStore";
const TableAllDay=observer(()=> {
  useEffect(() => {
    const getAllDayReservs = async () => {
      await reservStore.getAllDayReservToday();
    };
    getAllDayReservs();
  }, []);
  return (
    <div>
    <div className=" py-2">
    
          <div className=" overflow-x-auto">
            <div className="  overflow-x-auto rounded-lg ">
              <div className="inline-block  rounded-lg ">
                <table className="w-full table-auto leading-normal">
                  <thead>
                    <tr>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-white text-center text-md font-semibold text-gray-700 uppercase tracking-wider">
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
                    </tr>
                  </thead>
                  <tbody>
                    {reservStore.allDayReservsToday.map((reserv, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-1 py-2 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                          
                                {reserv.reservNumber}
                             
                            </p>
                          </td>
                          <td className="px-3 py-2 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap ">
                              {new Date(reserv.day).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${reserv.start} - ${reserv.end}`}
                            </p>
                          </td>
                          <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.amount}
                            </p>
                          </td>
                          <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.table
                                .map((table) => {
                                  return table;
                                })
                                .join(", ")}
                            </p>
                          </td>
                          {reserv.self_reserv && (
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {`${reserv.self_reserv.firstname}  ${reserv.self_reserv.lastname}`}
                              </p>
                            </td>
                          )}
                          {reserv.customer!.length > 0 && (
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {reserv.customer!.map((customer) => {
                                  return `${customer.firstname}  ${customer.lastname} `;
                                })}
                              </p>
                            </td>
                          )}
                          <td className="px-2 py-3 border-b border-gray-200 bg-white text-sm text-center ">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {reserv.status}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
)
export default TableAllDay