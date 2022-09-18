import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { rudStore } from "../../../store/rudStore";

const SingleCustomerData=observer(()=> {
    const { id } = useParams();
  useEffect(() => {
    const getCustomerById = async () => {
      await rudStore.getCustomerByID(id!);
    };
    getCustomerById();
  }, [id]);
  const { _id, username, firstname, lastname, email, phoneNumber } =
  rudStore.customer;
  return (
    <div>
    <div>
      <h1 className="text-lg font-medium mb-4 border-b-2 pb-4">
        ข้อมูลผู้ดูแลระบบ
      </h1>
    </div>
    
    <div
        key={_id}
        className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
      >
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-base leading-6 font-medium text-gray-900">
            คุณ {`${firstname}  ${lastname}`}
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                ชื่อ-นามสกุล
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${firstname}  ${lastname}`}
              </dd>
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {username}
              </dd>
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">อีเมล</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                เบอร์โทรศัพท์
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {phoneNumber}
              </dd>
            </div>
          </dl>
        </div>
      </div>
  </div>
  )
})

export default SingleCustomerData