import { getToken } from "../services/authorize";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

type Information = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPass: string;
};

type Login = {
  username: string;
  password: string;
};

class AdminStore {
  admin: Information | undefined = undefined;
  adminLogin: Information | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
  }

  async createAdmin(info: Information) {
    const {
      username,
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      confirmPass,
    } = info;
    try {
      await axios.post(`${process.env.REACT_APP_API_REGISTER}/create-admin`, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPass: confirmPass,
      });
      await Swal.fire(
        "Register Success!",
        "เพิ่มผู้ดูแลระบบเรียบร้อยแล้ว!",
        "success"
      );
    } catch (err: any) {
      if (err instanceof Error) {
        await Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
        console.log(err);
        throw err;
      }
    }
  }

  async loginAdmin(infoLogin: Login) {
    try {
      const { username, password } = infoLogin;
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH}/login-admin`,
        {
          username: username,
          password: password,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.adminLogin = response.data;
    } catch (err) {
      if (err instanceof Error) {
        await Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  async getAdmin() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_AUTH}/get-admin`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.adminLogin = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.adminLogin = undefined;
    sessionStorage.removeItem("token");
  }
}

export const adminStore = new AdminStore();
adminStore.getAdmin()
