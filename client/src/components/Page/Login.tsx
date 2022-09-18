import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminStore } from "../../store/adminStore";
import { customerStore } from "../../store/customerStore";
import { partnerStore } from "../../store/partnerStore";

type InfoLogin = {
  username: string;
  password: string;
};

const startInfo = {
  username: "",
  password: "",
};

const Login = observer(() => {
  const navigate = useNavigate();
  const { role } = useParams();
  const [infoLogin, setInfoLogin] = useState<InfoLogin>(startInfo);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInfoLogin((prevInfo) => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function loginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (role === "customer") {
      await customerStore.loginCustomer(infoLogin);
      navigate("/");
    } else if (role === "partner") {
      await partnerStore.loginPartner(infoLogin);
      navigate("/partner/dashboard");
    } else if (role === "admin") {
      await adminStore.loginAdmin(infoLogin);
      navigate("/admin/dashboard")
    }
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <form onSubmit={loginSubmit}>
        <div className="mb-6">
          <div className="mb-6 flex justify-center font-semibold text-lg">
            เข้าสู่ระบบ
          </div>
          <div className="mb-6">
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
              value={infoLogin.username}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-6">
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
              value={infoLogin.password}
              onChange={onChangeInput}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-6">
          <div className="flex justify-start text-sm">
            <a
              href={
                role === "customer" ? "/customer/register" : "/partner/register"
              }
              className="hover:text-blue-800"
            >
              สมาชิกใหม่?
            </a>
          </div>
          <div className="flex justify-end text-sm">
            <a className="hover:text-blue-800">ลืมรหัสผ่าน?</a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full sm:w-full md:w-full lg:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
});

export default Login;
