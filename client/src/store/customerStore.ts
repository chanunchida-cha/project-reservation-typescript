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
  password?: string;
  confirmPass?: string;
  facebook_id?:string
  google_id?:string
};

type Login = {
  username: string;
  password: string;
};
type Partner = {
  _id?: string;
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

type Reserv = {
  _id: string;
  reservNumber: string;
  partner_id: string;
  day: string;
  start: string;
  end: string;
  amount: string;
  customer_id?: string;
  table: string[];
  status: string;
  partner: Partner;
};
type Password = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

class CustomerStore {
  customer: Information | undefined = undefined;
  customerLogin: Information | undefined = undefined;
  allDayReservPending: Reserv[] = [];
  allDayReservArrived: Reserv[] = [];
  allDayHistory: Reserv[] = [];
  roundReservPending: Reserv[] = [];
  roundReservArrived: Reserv[] = [];
  roundHistory: Reserv[] = [];

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
  async loginGoogle(tokenId: string, googleId: string) {
  
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH}/login-google`,
        {
          tokenId: tokenId,
          googleId: googleId,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      console.log("logingoogle");

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
  async loginFaceBook(accessToken: string, userID: string) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH}/login-facebook`,
        {
          accessToken: accessToken,
          userID: userID,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      console.log(response.data);

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
  async editCustomer(info: Information) {
    const { username, firstname, lastname, email, phoneNumber } = info;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_CUSTOMER}/profile/edit`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getCustomer();
    } catch (err) {
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
  logout() {
    this.customerLogin = undefined;
    sessionStorage.removeItem("token");
  }

  async resetPassword(allPassword: Password) {
    const { oldPassword, newPassword, confirmPassword } = allPassword;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_CUSTOMER}/reset-password`,
        {
          oldPassWord: oldPassword,
          newPassWord: newPassword,
          confirmNewPassWord: confirmPassword,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขรหัสผ่านสำเร็จ!",
        "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
        "success"
      );
      this.logout();
    } catch (err) {
      if (err instanceof Error) {
        await Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      throw err;
    }
  }

  //---------------history allday reserv------------------------------------
  async getAllDayReservPending() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-all-day-reserv-pending`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.allDayReservPending = response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllDayReservArrived() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-all-day-reserv-arrived`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.allDayReservArrived = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllDayReservHistory() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-all-day-reserv-history`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.allDayHistory = response.data;
    } catch (err) {
      console.log(err);
    }
  }
  //---------------history round reserv------------------------------------

  async getRoundReservPending() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-round-reserv-pending`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.roundReservPending = response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getRoundReservArrived() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-round-reserv-arrived`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.roundReservArrived = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getRoundReservHistory() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HISTORY}/get-round-reserv-history`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.roundHistory = response.data;
    } catch (err) {
      console.log(err);
    }
  }
}

export const customerStore = new CustomerStore();
customerStore.getCustomer();
