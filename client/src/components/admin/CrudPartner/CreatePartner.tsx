import { observer } from "mobx-react-lite";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { partnerStore } from "../../../store/partnerStore";

type Information = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPass: string;
  restaurantName: string;
  address: string;
};
const startinfo = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  confirmPass: "",
  restaurantName: "",
  address: "",
};

const CreatePartner = observer(() => {
  const navigate = useNavigate()
  const [info, setInfo] = useState<Information>(startinfo);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await partnerStore.createPartner(info);
    navigate("/admin/partner/verification")
  }
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">
          เพิ่มข้อมูลร้านอาหาร
        </h1>
      </div>
      <div className="bg-white p-8 mt-5 rounded-lg">
        <form onSubmit={register}>
          <div className="grid gap-6 mb-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ชื่อ
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ชื่อ"
                value={info.firstname}
                onChange={onChangeInput}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                นามสกุล
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="นามสกุล"
                value={info.lastname}
                onChange={onChangeInput}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="restaurantName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ชื่อร้านอาหาร
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ชื่อร้านอาหาร"
              value={info.restaurantName}
              onChange={onChangeInput}
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ที่อยู่
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ที่อยู่"
              value={info.address}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0888888888"
              value={info.phoneNumber}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              value={info.username}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              อีเมลล์
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cubeque@company.com"
              value={info.email}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={info.password}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={info.confirmPass}
              onChange={onChangeInput}
              required
            />
          </div>

          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            เพิ่มข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
});
export default CreatePartner;
