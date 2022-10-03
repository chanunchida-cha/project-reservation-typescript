import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { customerStore } from "../../store/customerStore";
import { partnerStore } from "../../store/partnerStore";
import { observer } from "mobx-react-lite";
import { reservStore } from "../../store/reservStore";
import ModalReserv from "./ModalReserv";

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
type Partner = {
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
type Round = {
  start: string;
  end: string;
};
type Openday = {
  type: string;
  start?: string;
  end?: string;
};

type OpenDayInfo = {
  monday: Openday;
  tuesday: Openday;
  wednesday: Openday;
  thursday: Openday;
  friday: Openday;
  saturday: Openday;
  sunday: Openday;
};

type Info = {
  _id: string;
  partner_id: string;
  description: string;
  contact: string;
  address: string;
  image: string;
  type_rest: string;
  time_length?: string;
  rounds?: Round[];
  openday: OpenDayInfo;
  information: Partner;
};

const SingleRestaurant = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selfReserv, setSelfReserv] = useState<{
    firstname: string;
    lastname: string;
    phoneNumber: string;
  }>({
    firstname: customerStore.customerLogin?.firstname
      ? customerStore.customerLogin?.firstname
      : "",
    lastname: customerStore.customerLogin?.lastname
      ? customerStore.customerLogin?.lastname
      : "",
    phoneNumber: customerStore.customerLogin?.phoneNumber
      ? customerStore.customerLogin?.phoneNumber
      : "",
  });
  const [navbar, setNavbar] = useState(true);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [reservModal, setReservModal] = useState(false);
  const [start, setStart] = useState("");
  const [timeRound, setTimeRound] = useState({
    start: "",
    end: "",
  });
  const scrollNav = () => {
    if (window.scrollY > 200) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  useEffect(() => {
    const getSingleRestaurant = async () => {
      await partnerStore.getMenuByRestId(id!);
      await partnerStore.getInfoRestaurantById(id!);
      await partnerStore.getTableByRestId(id!);
    };
    getSingleRestaurant();
    window.addEventListener("scroll", scrollNav);
    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, []);

  const info = partnerStore.partnerInfoById;
  const menus = partnerStore.menusByRestId;
  const tables = partnerStore.tablesById;
  console.log("tables", tables);

  console.log(menus);

  console.log(info);
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelfReserv((prevSelfReserv) => {
      return {
        ...prevSelfReserv,
        [name]: value,
      };
    });
  };

  const dateTime = new Date();
  const dateSent = new Date(date!).toISOString().split("T");
  const day = `${dateSent[0]}z`;
  const startTime = `${dateTime.getFullYear()}  ${
    dateTime.getMonth() + 1
  } ${dateTime.getDate()} ${start} GMT+0700 (Indochina Time)`;

  //-------reserv function
  const createReserv = async (
    event: MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.preventDefault();
    try {
      if (type === "allDay" && !customerStore.customerLogin?.username) {
        await reservStore.selfAllDayReserv(
          id!,
          selfReserv,
          amount,
          day,
          startTime
        );
      } else if (type === "allDay" && customerStore.customerLogin?.username) {
        await reservStore.customerAllDayReserv(
          id!,
          customerStore.customerLogin._id!,
          amount,
          day,
          startTime
        );
      } else if (type === "rounds" && !customerStore.customerLogin?.username) {
        await reservStore.selfRoundReserv(
          id!,
          selfReserv,
          amount,
          day,
          timeRound.start,
          timeRound.end
        );
      } else if (type === "rounds" && customerStore.customerLogin?.username) {
        await reservStore.customerRoundReserv(
          id!,
          customerStore.customerLogin._id!,
          amount,
          day,
          timeRound.start,
          timeRound.end
        );
      }
      navigate(
        `/myreservation/${type}/${reservStore.thisReserv.partner_id}/${reservStore.thisReserv._id} `
      );
    } catch (err) {
      console.log(err);
    }
  };

  let reservElement = null;
  if (reservModal) {
    reservElement = (
      <ModalReserv
        setReservModal={setReservModal}
        setStep={setStep}
        setSelfReserv={setSelfReserv}
        setAmount={setAmount}
        setStart={setStart}
        setTimeRound={setTimeRound}
        step={step}
        amount={amount}
        onChangeAmount={onChangeAmount}
        date={date}
        start={start}
        setDate={setDate}
        timeRound={timeRound}
        selfReserv={selfReserv}
        onChangeValue={onChangeValue}
        createReserv={createReserv}
        info={info}
      />
    );
  }

  return (
    <div className="bg-white  " key={info._id}>
      {reservElement}
      <div
        className={
          navbar
            ? "hidden sm:fixed sm:top-40 sm:m-2 sm:w-1/4 sm:left-2/4 sm:ml-56 bg-white border border-gray-200 shadow-lg p-2 rounded-lg lg:grid "
            : "hidden sm:fixed sm:top-0 sm:m-2 sm:w-1/4 sm:left-2/4 sm:ml-56 bg-white  border border-gray-200 shadow-lg p-2 rounded-lg lg:grid"
        }
      >
        <div
          className={
            step === 1
              ? "grid p-2 h-40 grid-cols-5 sm:grid sm:grid-cols-6 sm:grid-rows-3"
              : "grid p-2 grid-cols-5 sm:grid sm:grid-cols-6 sm:grid-rows-4"
          }
        >
          <div className="text-base  border-b border-gray-300 pt-4 text-center grid col-span-6 font-semibold ">
            จองคิวร้านอาหาร
          </div>
          {step === 1 && (
            <div className="text-base  justify-center pt-4 text-center  col-span-6 font-semibold ">
              {tables.length > 0 ? (
                <button
                  className=" py-1 px-4 border border-transparent text-sm h-10 w-48 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 "
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  จองคิวร้านอาหาร
                </button>
              ) : (
                <div className="text-red-700">
                  *** ร้านอาหารยังไม่พร้อมให้บริการ ***
                </div>
              )}
            </div>
          )}
          {step > 1 && (
            <>
              <div
                className={
                  step === 2
                    ? "mt-2 col-span-2 flex justify-center text-blue-700 "
                    : "mt-2 col-span-2 flex justify-center "
                }
              >
                <i className="fa-sharp fa-solid fa-user w-5 h-5"></i>
              </div>
              <div
                className={
                  step === 3
                    ? "mt-2 col-span-2 flex justify-center text-blue-700 "
                    : "mt-2 col-span-2 flex justify-center "
                }
              >
                <i className="fa-sharp fa-solid fa-calendar w-5 h-5"></i>
              </div>
              <div
                className={
                  step === 4
                    ? "mt-2 col-span-2 flex justify-center text-blue-700 "
                    : "mt-2 col-span-2 flex justify-center "
                }
              >
                <i className="fa-sharp fa-solid fa-id-card w-5 h-5"></i>
              </div>
            </>
          )}
          {step === 2 && (
            <div className="pb-2 text-center col-span-6 font-semibold ">
              <div>ระบุจำนวนคน</div>
              <div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={onChangeAmount}
                  autoComplete="family-name"
                  className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="col-span-6 flex justify-center">
                ระบุวันที่และเวลา
              </div>
              <div className="col-span-6 ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2}>
                    <DesktopDatePicker
                      label="วัน/เดือน/ปี ต้องการจอง"
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={setDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="mt-3 col-span-6 ">
                {info.type_rest === "allDay" && (
                  <Stack>
                    <TextField
                      label="เวลาที่ต้องการจอง"
                      name="start"
                      id="time"
                      type="time"
                      value={start}
                      onChange={(e) => {
                        setStart(e.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </Stack>
                )}
              </div>

              {info.type_rest === "rounds" && (
                <>
                  {info.rounds?.map((round: Round, index: number) => {
                    return (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setTimeRound({
                            start: round.start,
                            end: round.end,
                          });
                        }}
                        className={
                          timeRound.start === round.start
                            ? " py-2  border col-span-2 mt-2 mx-2 border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                            : "py-2  border col-span-2 mt-2 mx-2 border-transparent text-sm font-medium rounded-md text-black bg-[#ffffff] hover:bg-[#d5d5d5] "
                        }
                      >
                        {`${round.start} - ${round.end}`}
                      </button>
                    );
                  })}
                </>
              )}
            </>
          )}
          {step === 4 && (
            <>
              <>
                {" "}
                <div className="text-center col-span-6 font-semibold">
                  ข้อมูลส่วนตัว
                </div>
                {!customerStore.customerLogin && (
                  <div className="text-center col-span-6 ">
                    <button
                      className="py-1 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 "
                      onClick={() => {
                        navigate("/customer/login");
                      }}
                    >
                      เข้าสู่ระบบ/สมัครสมาชิก
                    </button>
                  </div>
                )}
                <div className="col-span-2 pt-2">ชื่อ:</div>
                <div className="col-span-4">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="ชื่อ"
                    value={selfReserv.firstname}
                    onChange={onChangeValue}
                    autoComplete="given-name"
                    className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                  />
                </div>
                <div className="col-span-2 pt-2">นามสกุล:</div>
                <div className="col-span-4">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="นามสกุล"
                    value={selfReserv.lastname}
                    onChange={onChangeValue}
                    autoComplete="lastname"
                    className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                  />
                </div>
                <div className="col-span-2 pt-2">เบอร์โทรศัพท์:</div>
                <div className="col-span-4">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="เบอร์โทรศัพท์"
                    value={selfReserv.phoneNumber}
                    onChange={onChangeValue}
                    autoComplete="phoneNumber"
                    required
                    className="p-1 pl-1 pt-2 mb-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-1 border-gray-300 lg:text-sm  rounded-md"
                  />
                </div>
              </>
            </>
          )}

          {step > 1 && (
            <>
              <div className="col-span-2 col-start-1 mt-4 flex justify-center">
                {" "}
                <button
                  disabled={step === 2 ? true : false}
                  className={
                    "px-3 border  border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 "
                  }
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  ย้อนกลับ
                </button>
              </div>
              {step !== 4 && (
                <div className="col-span-2 col-start-5 mt-4 flex justify-center">
                  <button
                    disabled={
                      step === 2
                        ? amount === ""
                        : step === 3
                        ? info.type_rest === "rounds"
                          ? timeRound.start === ""
                          : start === ""
                        : undefined
                    }
                    className={
                      "disabled:opacity-75 px-3 border border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800"
                    }
                    onClick={() => {
                      setStep(step + 1);
                    }}
                  >
                    ถัดไป
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="col-span-2 col-start-5 mt-4 flex justify-center">
                  <button
                    disabled={
                      step === 4
                        ? selfReserv.firstname === "" ||
                          selfReserv.lastname === "" ||
                          selfReserv.phoneNumber === ""
                        : false
                    }
                    className={
                      "disabled:opacity-75 px-3 border border-transparent text-sm h-10 w-24 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800"
                    }
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      createReserv(event, info.type_rest);
                    }}
                  >
                    จองคิว
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="pt-20 ">
        <div key={info._id}>
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li className="text-lg">
                <a
                  aria-current="page"
                  className="font-medium text-black hover:text-gray-600"
                >
                  {`ร้าน${info.information.restaurantName}`}
                </a>
              </li>
            </ol>
          </nav>

          <div className="flex max-w-2xl mx-auto px-4 lg:flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8 text-gray-500">
            <div>
              <i className="fa-sharp fa-solid fa-location-dot h-5 w-5"></i>
            </div>
            <div>{`${info.address} `}</div>
            <div className="hidden sm:flex lg:flex">{` / ประเภทร้านอาหาร: ${
              info.type_rest === "rounds" ? "เปิดเป็นรอบเวลา" : "เปิดทั้งวัน"
            }`}</div>
          </div>

          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl  lg:grid lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-4 shadow-lg  lg:border-gray-200 ">
              <img
                src={`http://localhost:5500/uploads/${info.image}`}
                className={
                  "w-full h-96 border border-gray-300  rounded-lg object-center object-cover"
                }
              />
            </div>

            <div className="  lg:col-span-4  mt-4 p-3 pl-6 bg-white shadow-lg border border-gray-200 rounded-lg lg:border-gray-200">
              <div className="grid grid-cols-5 sm:grid sm:grid-cols-6  lg:grid lg:grid-cols-6">
                <div className="text-base col-span-6 ">ข้อมูลร้านอาหาร</div>

                <div className="pt-2 col-span-2">ติดต่อ: </div>
                <div className="pt-2 col-span-4">{info.contact}</div>

                <div className="pt-2 col-span-2">วันเปิดร้าน:</div>
                {info.type_rest === "rounds" ? (
                  <div className="pt-2 col-span-4">
                    {days.map((day) => {
                      return (
                        <div className="mb-3" key={day.key}>
                          {day.i18n}:
                          {info.openday[day.key].type === "open"
                            ? "  เปิด"
                            : "  ปิด"}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="col-span-4">
                    {days.map((day) => {
                      return (
                        <div className="mb-3 " key={day.key}>
                          {day.i18n}:
                          {info.openday[day.key].type === "open"
                            ? "  เปิด "
                            : "  ปิด "}
                          {info.openday[day.key].type === "open" ? (
                            <>
                              {info.openday[day.key].start} น. -{" "}
                              {info.openday[day.key].end} น.{" "}
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
                {info.type_rest === "rounds" ? (
                  <>
                    <div className="col-span-2">รอบเวลา:</div>
                    <div className="col-span-4">
                      {info
                        .rounds!.map(
                          (round: Round) => `${round.start} - ${round.end} น.  `
                        )
                        .join(", ")}
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            {menus.length > 0 && (
              <div
                className={
                  " sm:mb-20  lg:grid lg:col-span-4 lg:mb-20 mt-4 p-3 pl-6 border border-gray-200 bg-white shadow-lg rounded-lg lg:border-gray-200 "
                }
              >
                <div className="grid grid-cols-6 sm:grid sm:grid-cols-12   lg:grid lg:grid-cols-12">
                  <div className="text-base col-span-12">เมนูอาหาร</div>
                  {menus.map((theMenu) => {
                    return (
                      <>
                        <div className=" col-span-1 h-20 w-2 sm:col-span-1 sm:h-20 sm:w-2 lg:col-span-1 lg:h-20 lg:w-2  bg-blue-700 "></div>
                        <div className=" col-span-3 h-10 sm:col-span-3 sm:h-10 lg:col-span-3 lg:h-10 ">
                          <img
                            key={id}
                            src={`http://localhost:5500/uploads/${theMenu.image}`}
                            className="w-24 sm:py-2 lg:py-2 h-16 sm:w-28 sm:h-20 object-center object-cover rounded-lg sm:h-30"
                          />
                        </div>
                        <div className="col-span-6 h-10 sm:col-span-6 sm:h-10 lg:col-span-6 lg:h-10 ">
                          {theMenu.name}
                          <div className="text-sm text-gray-400">
                            {theMenu.description}
                          </div>
                        </div>
                        <div className=" col-span-2 h-10 ">
                          {`ราคา ${theMenu.price} บาท`}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            {menus.length <= 0 && (
              <div className="hidden sm:mb-20  lg:grid lg:col-span-4 lg:mb-20 mt-4 p-3 pl-6   rounded-lg lg:border-gray-200 "></div>
            )}

            <div className="    p-3 pl-6 bg-white shadow-lg rounded-lg sm:hidden lg:hidden"></div>
          </div>

          <div className="flex justify-center fixed bottom-0 w-full  p-2 bg-white shadow-lg  rounded-t-lg lg:border-gray-200  lg:hidden">
            <button
              className=" py-1 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 "
              onClick={() => {
                setReservModal(true);
                setStep(step + 1);
              }}
            >
              จองคิวร้านอาหาร
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default SingleRestaurant;
