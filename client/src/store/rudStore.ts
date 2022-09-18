import { getToken } from "../services/authorize";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

type User = {
  _id?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
  address?: string;
  restaurantName?: string;
  note?: string;
  status?: string;
};

class RudStore {
  allCustomers: User[] = [];
  allAdmins: User[] = [];
  admin: User = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
  };
  customer: User = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
  };
  partner: User = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
    address: "",
    restaurantName: "",
    note: "",
    status: "",
  };
  allPartners: User[] = [];
  partnerVerify: User[] = [];
  partnerApprove: User[] = [];
  partnerDisApprov: User[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  //------------customer--------------------------
  async getAllCustomer() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-all-customers`
      );
      this.allCustomers = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getCustomerByID(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-customer/${id}`
      );
      this.customer = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async editCustomerByAdmin(id: string, info: User) {
    const {
      restaurantName,
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      username,
      password,
      confirmPass,
    } = info;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RUD}/edit-customer-by-admin/${id}`,
        {
          restaurantName: restaurantName,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          username: username,
          password: password,
          confirmPass: confirmPass,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getAllCustomer();
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

  async deleteCustomer(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_RUD}/delete-customer/${id}`
      );
      Swal.fire(
        "ลบข้อมูลลูกค้าเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getAllCustomer();
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
  //-----------------partner----------------------------
  async getAllPartner() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-all-partner`
      );
      this.allPartners = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getPartnerVerify() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-partner-verify`
      );
      this.partnerVerify = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getPartnerApprove() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-partner-approve`
      );
      this.partnerApprove = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getPartnerDisApprove() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-partner-disapprove`
      );
      this.partnerDisApprov = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getPartnerByID(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-partner/${id}`
      );
      this.partner = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async updateStatusPartner(id: string, status: string, note: string) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RUD}/update-status-partner/${id}`,
        {
          status: status,
          note: note,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.getPartnerApprove();
      this.getPartnerDisApprove();
    } catch (err) {
      console.log(err);
    }
  }

  async editPartnerByAdmin(id: string, info: User) {
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
      await axios.put(
        `${process.env.REACT_APP_API_RUD}/edit-partner-by-admin/${id}`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPass: confirmPass,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getPartnerApprove();
      this.getPartnerVerify();
      this.getPartnerDisApprove();
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
  async deletePartner(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_RUD}/delete-partner/${id}`
      );
      Swal.fire(
        "ลบข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getPartnerApprove();
      this.getPartnerVerify();
      this.getPartnerDisApprove();
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
  //---------------admin-----------------------------
  async getAllAdmin() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-all-admin`
      );
      this.allAdmins = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAdminByID(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RUD}/get-admin/${id}`
      );
      this.admin = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async editAdminByAdmin(id: string, info: User) {
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
      await axios.put(
        `${process.env.REACT_APP_API_RUD}/edit-admin-by-admin/${id}`,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPass: confirmPass,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire("แก้ไขข้อมูลสำเร็จ!", "", "success");
      this.getAllAdmin();
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
  async deleteAdmin(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_RUD}/delete-admin/${id}`
      );
      Swal.fire(
        "ลบข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getAllAdmin();
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
}

export const rudStore = new RudStore();
