import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { reservStore } from "../../../store/reservStore";

const SingleAllDayReserv = observer(() => {
  const { id } = useParams();
  useEffect(() => {
    const getAllDayReservById = async () => {
      await reservStore.getAllDayReservById(id!);
    };
    getAllDayReservById();
  }, []);
  const {
    _id,
    reservNumber,
    self_reserv,
    customer,
    amount,
    day,
    start,
    end,
    table,
  } = reservStore.allDayReserv;
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium mb-4 border-b-2 pb-4">
          ข้อมูลการจอง
        </h1>
      </div>

      <div
        key={_id}
        className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
      >
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-base leading-6 font-medium text-gray-900">
            หมายเลขการจอง {`${reservNumber}`}
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ชื่อ-นามสกุล
              </dt>
              {self_reserv && (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {`${self_reserv.firstname}  ${self_reserv.lastname}`}
                </dd>
              )}
              {customer!.length > 0 && (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer!.map((customer) => {
                    return `${customer.firstname}  ${customer.lastname} `;
                  })}
                </dd>
              )}
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ข้อมูลติดต่อ
              </dt>
              {self_reserv && (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {`${self_reserv.phoneNumber} `}
                </dd>
              )}
              {customer!.length > 0 && (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer!.map((customer) => {
                    return `${customer.phoneNumber} `;
                  })}
                </dd>
              )}
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                วัน/เดือน/ปี
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(day).toLocaleDateString("en-GB")}
              </dd>
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">เวลา</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${start} - ${end}`}
              </dd>
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">จำนวนคน</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {amount}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">โต๊ะ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {table.map((table) => {
                  return `${table} `;
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
});
export default SingleAllDayReserv;
