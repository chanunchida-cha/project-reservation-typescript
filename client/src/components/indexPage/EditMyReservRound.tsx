import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { reservStore } from "../../store/reservStore";
import { partnerStore } from "../../store/partnerStore";

const EditMyReservRound = observer(() => {
  const { partner_id, reserv_id } = useParams();
  const [selfReserv, setSelfReserv] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [timeRound, setTimeRound] = useState({
    start: "",
    end: "",
  });
  const [table, setTable] = useState<string[]>([]);
  const [customerId, setCustomerId] = useState<string>("");
  const dateTime = new Date(date!);
  const dateSent = new Date(date!).toLocaleDateString().split("/").join("-");
  const day = `${dateSent}z`;
  useEffect(() => {
    const getReserv = async () => {
      await partnerStore.getInfoRestaurantById(partner_id!);
      await partnerStore.getTableByRest();
      await reservStore.getRoundReservById(reserv_id!);
      const reserv = reservStore.roundReserv;
      setAmount(reserv.amount);
      setDate(new Date(reserv.day));
      setTimeRound({
        start: reserv.start,
        end: reserv.end,
      });
      setTable(reserv.table);
      if (reserv.customer_id) {
        reserv.customer?.map((theCustomer) => {
          return (
            setSelfReserv({
              firstname: theCustomer.firstname,
              lastname: theCustomer.lastname,
              phoneNumber: theCustomer.phoneNumber,
            }),
            setCustomerId(reserv.customer_id!)
          );
        });
      } else if (reserv.self_reserv) {
        setSelfReserv({
          firstname: reserv.self_reserv.firstname,
          lastname: reserv.self_reserv.lastname,
          phoneNumber: reserv.self_reserv.phoneNumber,
        });
      }
    };
    getReserv();
  }, []);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelfReserv((prevSelfReserv) => {
      return {
        ...prevSelfReserv,
        [name]: value,
      };
    });
  };
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const editRoundReserv = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (customerId) {
      await reservStore.customerRoundUpdate(
        reserv_id!,
        partner_id!,
        customerId,
        amount,
        day,
        timeRound.start,
        timeRound.end,
        table
      );
    } else if (!customerId) {
      await reservStore.selfRoundUpdate(
        reserv_id!,
        partner_id!,
        selfReserv,
        amount,
        day,
        timeRound.start,
        timeRound.end,
        table
      );
    }
  };
  console.log(reservStore.roundReserv);

  return (
    <div className="mt-32 mx-96 ">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 bg-blue-700 py-4 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-white">
            แก้ไขข้อมูลการจอง
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-300" />
      <form onSubmit={editRoundReserv}>
        <div className="mt-3 shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อ
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={selfReserv.firstname}
                  onChange={onChangeValue}
                  autoComplete="given-name"
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={selfReserv.lastname}
                  onChange={onChangeValue}
                  autoComplete="family-name"
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={selfReserv.phoneNumber}
                  onChange={onChangeValue}
                  autoComplete="given-name"
                  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6"></div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  จำนวนคน
                </label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={onChangeAmount}
                  autoComplete="family-name"
                  className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6  sm:col-span-6"></div>

              <div className="col-span-6  sm:col-span-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  วันที่ต้องการจอง
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2}>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={setDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="col-span-6  sm:col-span-6"></div>

              <div className="col-span-6 sm:col-span-12 ">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  รอบเวลาที่ต้องการจอง
                </label>
              </div>
              {partnerStore.partnerInfoById.rounds?.map((round, index) => {
                return (
                  <div key={index} className="col-span-3 sm:col-span-2  ">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setTimeRound({
                            start: round.start,
                            end: round.end,
                          });
                        }}
                        className={
                          timeRound.start === round.start
                            ? " py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                            : "py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#ffffff] hover:bg-[#d5d5d5] "
                        }
                      >
                        {`${round.start} - ${round.end} น.`}
                      </button>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default EditMyReservRound;
