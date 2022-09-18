import { getToken } from "../services/authorize";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

type Information = {
  _id?:string
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

class CustomerStore {
  customer: Information | undefined = undefined;
  customerLogin: Information | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async createCustomer(info: Information) {
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
      await axios.post(
        `${process.env.REACT_APP_API_REGISTER}/create-customer`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPass: confirmPass,
        }
      );
      await Swal.fire("Register Success!", "สมัครสมาชิกเรียบร้อย!", "success");
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
  async loginCustomer(infoLogin: Login) {
    try {
      const { username, password } = infoLogin;
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH}/login-customer`,
        {
          username: username,
          password: password,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.customerLogin = response.data;
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
  async getCustomer() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_AUTH}/get-customer`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.customerLogin = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.customerLogin = undefined;
    sessionStorage.removeItem("token");
  }
}

export const customerStore = new CustomerStore();
customerStore.getCustomer();
