import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { rudStore } from "../../../store/rudStore";
import { useNavigate } from "react-router-dom";

const SinglePartner = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [addNote, setAddNote] = useState<string>("");
  useEffect(() => {
    const getPartnerById = async () => {
      await rudStore.getPartnerByID(id!);
    };
    getPartnerById();
  }, [id]);
  const {
    _id,
    username,
    firstname,
    lastname,
    email,
    phoneNumber,
    address,
    restaurantName,
    status,
    note,
  } = rudStore.partner;

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function onNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setAddNote(event.target.value);
  }

  function updateStatus(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    rudStore.updateStatusPartner(_id!, value, addNote);
    if (value === "approve") {
      navigate("/admin/partner/approve");
    } else if (value === "disapprove") {
      navigate("/admin/partner/disapprove");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-lg font-medium mb-4 border-b-2 pb-4">
          ข้อมูลร้านอาหาร
        </h1>
      </div>

      <div
        key={_id}
        className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
      >
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-base leading-6 font-medium text-gray-900">
            ร้าน {`${restaurantName}`}
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
            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">ที่อยู่</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${address}`}
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
            {status === "disapprove" && (
              <>
                {" "}
                <div className="border-t border-gray-200" />
                <div className="px-4 py-2 sm:px-6">
                  <p className="mt-1 max-w-2xl text-sm text-red-500">
                    หมายเหตุ* {note}
                  </p>
                </div>
              </>
            )}
            <div className="border-t border-gray-200" />
            {status === "verification" && (
              <div className="ml-6 mt-3 mb-3">
                <form onSubmit={updateStatus}>
                  <div className="flex">
                    <div className="flex items-center mr-4">
                      <input
                        id="approve"
                        type="radio"
                        name="radio-group"
                        className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
                        value={"approve"}
                        onChange={onChangeInput}
                      />
                      <label
                        htmlFor="approve"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        อนุมัติ
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="disapprove"
                        type="radio"
                        name="radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                        value={"disapprove"}
                        onChange={onChangeInput}
                      />
                      <label
                        htmlFor="disapprove"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        ไม่อนุมัติ
                      </label>
                    </div>
                  </div>
                  {value === "disapprove" && (
                    <div className="mr-5 mt-4">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {" "}
                        หมายเหตุ{" "}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={4}
                          className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="หมายเหตุ"
                          onChange={onNoteChange}
                        ></textarea>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    บันทึก
                  </button>
                </form>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
});

export default SinglePartner;
