import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerStore } from "../../store/customerStore";

const EditPassword = observer(() => {
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
    await customerStore.resetPassword(allPassword);
    navigate("/customer/login");
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <form onSubmit={resetPassword}>
        <div className="grid gap-6 mb-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 flex justify-center font-semibold text-lg">
            แก้ไขรหัสผ่าน
          </div>
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={allPassword.confirmPassword}
            onChange={onChangeInput}
            required
          />
        </div>
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

export default EditPassword;
