import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { rudStore } from "../../../store/rudStore";

type Information = {
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
  const startinfoAdmin = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPass: "",
  };

const EditCustomer=observer(()=> {
    const { id } = useParams();
    const [info, setInfo] = useState<Information>(startinfoAdmin);
    useEffect(() => {
        const getCustomerById = async () => {
          await rudStore.getCustomerByID(id!);
          setInfo({
            firstname: rudStore.customer.firstname,
            lastname: rudStore.customer.lastname,
            email: rudStore.customer.email,
            phoneNumber: rudStore.customer.phoneNumber,
            username: rudStore.customer.username,
            password: rudStore.customer.password,
            confirmPass: rudStore.customer.confirmPass,
          });
        };
        getCustomerById();
      }, []);

      function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
        setInfo((prevInfo) => {
          return {
            ...prevInfo,
            [event.target.name]: event.target.value,
          };
        });
      }
    
      async function editCustomerSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await rudStore.editCustomerByAdmin(id!, info);
      }
  return (
    <div>
    <div>
      <h1 className="text-lg font-medium border-b-2 pb-4">
        แก้ไขข้อมูลลูกค้า
      </h1>
    </div>
    <div className="bg-white p-8 mt-5 rounded-lg">
      <form onSubmit={editCustomerSubmit}>
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
            disabled
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
            disabled
          />
        </div>

        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          บันทึกข้อมูล
        </button>
      </form>
    </div>
  </div>
  )
})

export default EditCustomer