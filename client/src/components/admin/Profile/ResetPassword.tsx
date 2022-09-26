import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminStore } from "../../../store/adminStore";

const ResetPassword=observer(()=> {
    const navigate = useNavigate();
    const [allPassword, setAllPassword] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      setAllPassword((prevInfo) => {
        return {
          ...prevInfo,
          [name]: value,
        };
      });
    }
    const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await adminStore.resetPassword(allPassword);
      navigate("/admin/login");
    };
  return (
    <div>
    <div>
      <h1 className="text-lg font-medium border-b-2 pb-4">แก้ไขรหัสผ่าน</h1>
    </div>
    <div className="bg-white p-8 mt-5 rounded-lg">
      <form onSubmit={resetPassword}>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            รหัสผ่านเดิม
          </label>
          <input
            type="password"
            id="password"
            name="oldPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={allPassword.oldPassword}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            รหัสผ่านใหม่
          </label>
          <input
            type="password"
            id="password"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={allPassword.newPassword}
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
            name="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 w-1/4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={allPassword.confirmPassword}
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
  )
})

export default ResetPassword