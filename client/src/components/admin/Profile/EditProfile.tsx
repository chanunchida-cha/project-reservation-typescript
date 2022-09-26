import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { adminStore } from "../../../store/adminStore";

const EditProfile = observer(() => {
  const [info, setInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });
  const { username, firstname, lastname, email, phoneNumber } = info;
  useEffect(() => {
    const getAdmin = async () => {
      await adminStore.getAdmin();
      setInfo({
        username: adminStore.adminLogin!.username,
        firstname: adminStore.adminLogin!.firstname,
        lastname: adminStore.adminLogin!.lastname,
        email: adminStore.adminLogin!.email,
        phoneNumber: adminStore.adminLogin!.phoneNumber,
      });
    };

    getAdmin();
  }, []);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await adminStore.editAdmin(info);
  };
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">แก้ไขข้อมูลส่วนตัว</h1>
      </div>
      <div className="bg-white p-8 mt-5 rounded-lg">
        <form onSubmit={updateProfile}>
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ชื่อ"
                value={firstname}
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="นามสกุล"
                value={lastname}
                onChange={onChangeInput}
                required
              />
            </div>
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
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0888888888"
              value={phoneNumber}
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
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              value={username}
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
              disabled
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cubeque@company.com"
              value={email}
              onChange={onChangeInput}
              required
            />
          </div>



          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
});
export default EditProfile;
