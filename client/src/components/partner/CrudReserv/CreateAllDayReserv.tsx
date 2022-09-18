import React, { ChangeEvent, FormEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { reservStore } from "../../../store/reservStore";

const CreateAllDayReserv = observer(() => {
  const { id } = useParams();
  const [selfReserv, setSelfReserv] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
  });
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [start, setStart] = useState("");


  const dateTime = new Date();
  const dateSent = new Date(date!).toLocaleDateString().split("/").join("-");
  const day = `${dateSent}z`;
  console.log(day);
  const startTime = `${dateTime.getFullYear()}  ${
    dateTime.getMonth() + 1
  } ${dateTime.getDate()} ${start} GMT+0700 (Indochina Time)`;

  const onChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelfReserv((prevSelfReserv) => {
      return {
        ...prevSelfReserv,
        [name]: value,
      };
    });
  };
  const onChangeAmount = (event:ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const createReserv = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await reservStore.selfAllDayReserv(id!, selfReserv, amount, day, startTime);
    setSelfReserv({
      firstname: "",
      lastname: "",
      phoneNumber: "",
    });
    setAmount("");
    setStart("");
    setDate(new Date());
  };

  return   <div className="mt-3 md:mt-0 md:col-span-2">
  <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
    เพิ่มคิวการจอง
  </h3>
  <div className="border-t border-gray-300" />
  <form onSubmit={createReserv} >
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
              className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border border-gray-300 rounded-md"
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
              className=" p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border border-gray-300 rounded-md"
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
              className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border border-gray-300rounded-md"
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
              className="p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm lg:text-sm  border  border-gray-300 rounded-md"
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

          <div className="col-span-6 sm:col-span-6 ">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              เวลาที่ต้องการจอง
            </label>
            <div>
              <Stack>
                <TextField
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
            </div>
          </div>
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
</div>;
});

export default CreateAllDayReserv;
