import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { partnerStore } from "../../../store/partnerStore";
import { useNavigate } from "react-router-dom";

const days = [
  {
    key: "monday",
    i18n: "วันจันทร์",
  },
  {
    key: "tuesday",
    i18n: "วันอังคาร",
  },
  {
    key: "wednesday",
    i18n: "วันพุธ",
  },
  {
    key: "thursday",
    i18n: "วันพฤหัสบดี",
  },
  {
    key: "friday",
    i18n: "วันศุกร์",
  },
  {
    key: "saturday",
    i18n: "วันเสาร์",
  },
  {
    key: "sunday",
    i18n: "วันอาทิตย์",
  },
  
] as const;



const InformationData = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    const getInfo = async () => {
    await  partnerStore.getInfoRestaurant();
    };
    getInfo();
  }, []);
  const daykey = "monday";
  console.log("1", partnerStore.partnerInfo.openday[daykey].type);
console.log(partnerStore.partnerInfo.type_rest);

  
  return (
    <div className=" mt-3 bg-white shadow overflow-hidden sm:rounded-lg mx-20">
      <div className="grid grid-cols-2 ">
        <div className="px-4 py-3 sm:px-6   ">
          <h3 className="text-lg leading-6 font-medium text-gray-900 ">
            ร้าน {`${partnerStore.partnerInfo.information.restaurantName} `}
          </h3>
        </div>
        <div className="px-4 py-3 text-right">
          <button className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
            onClick={() => {
              navigate("/partner/edit/information");
            }}>
            แก้ไข
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50  px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              รายละเอียดร้าน
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {partnerStore.partnerInfo.description}
            </dd>
          </div>
          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              ที่ตั้งร้านอาหาร
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {partnerStore.partnerInfo.address}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">ข้อมูลติดต่อ</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {partnerStore.partnerInfo.contact}
            </dd>
          </div>
          <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
              ประเภทร้านอาหาร
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {partnerStore.partnerInfo.type_rest === "rounds"
                ? "เปิดเป็นรอบเวลา"
                : "เปิดทั้งวัน"}
            </dd>
          </div>
          {partnerStore.partnerInfo.type_rest === "rounds" ? (
            <>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  วันเปิด-ปิดร้านอาหาร
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {days.map((day) => {
                    return (
                      <div className="mb-3" key={day.key}>
                        {day.i18n}:
                        {partnerStore.partnerInfo.openday[day.key].type ===
                        "open"
                          ? "  เปิด"
                          : "  ปิด"}
                      </div>
                    );
                  })}
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  รอบเวลาที่เปิด
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {partnerStore.partnerInfo.rounds?.map((round, index) => {
                    return (
                      <div className="mb-3" key={index}>
                        {`รอบที่ ${index + 1} เวลา ${round.start} - ${
                          round.end
                        } น.`}
                      </div>
                    );
                  })}
                </dd>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  ระยะเวลาขั้นต่ำ/รอบการจอง
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {partnerStore.partnerInfo.time_length} นาที
                </dd>
              </div>

              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  เวลาเปิด-ปิดร้านอาหาร
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {days.map((day) => {
                            return (
                              <div className="mb-3" key={day.key}>
                                {day.i18n}:
                                {partnerStore.partnerInfo.openday[day.key].type === "open"
                                  ? "  เปิด"
                                  : "  ปิด"}
                                <div>
                                  {partnerStore.partnerInfo.openday[day.key].type ===
                                  "open" ? (
                                    <>
                                      {" "}
                                      เวลา {
                                        partnerStore.partnerInfo.openday[day.key].start
                                      }{" "}
                                      น. - {partnerStore.partnerInfo.openday[day.key].end} น.{" "}
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </dd>
              </div>
            </>
          )}
          <div className=" bg-gray-50 px-4 py-3 sm:px-6  align-middle  ">
                    <dt className="text-sm font-medium text-gray-900">
                      รูปภาพร้านอาหาร
                    </dt>
                    <img
                      className=" mt-4 rounded object-cover h-48 w-96"
                      src={`http://localhost:5500/uploads/${partnerStore.partnerInfo.image}`}
                    />
                  </div>
        </dl>
      </div>
    </div>
  );
});
export default InformationData;
