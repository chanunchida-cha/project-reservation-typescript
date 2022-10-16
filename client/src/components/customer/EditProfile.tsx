import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { customerStore } from "../../store/customerStore";

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
    const getUsers = async () => {
      await customerStore.getCustomer();
      setInfo({
        username: customerStore.customerLogin!.username,
        firstname: customerStore.customerLogin!.firstname,
        lastname: customerStore.customerLogin!.lastname,
        email: customerStore.customerLogin!.email,
        phoneNumber: customerStore.customerLogin!.phoneNumber,
      });
    };

    getUsers();
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
    await customerStore.editCustomer(info);
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <form onSubmit={updateProfile}>
        <div className="grid gap-6 mb-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 flex justify-center font-semibold text-lg">
            แก้ไขโปรไฟล์
          </div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0888888888"
            value={phoneNumber}
            onChange={onChangeInput}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="cubeque@company.com"
            value={email}
            onChange={onChangeInput}
            required
            disabled
          />
        </div>

        {customerStore.customerLogin?.facebook_id ||
        customerStore.customerLogin?.google_id ? null : (
          <div className="  border-t pt-4 flex justify-center text-gray-700">
            <a href="/edit/password">เปลี่ยนรหัสผ่าน</a>
          </div>
        )}

        <button
          type="submit"
          className="w-full sm:w-full md:w-full lg:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          บันทึก
        </button>
      </form>
    </div>
  );
});

export default EditProfile;
