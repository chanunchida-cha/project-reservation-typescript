import { getToken } from "../services/authorize";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

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

type Login = {
  username: string;
  password: string;
};

type Round = {
  start: string;
  end: string;
};
type Openday = {
  type: string;
  start?: string;
  end?: string;
};

type OpenDayInfo = {
  monday: Openday;
  tuesday: Openday;
  wednesday: Openday;
  thursday: Openday;
  friday: Openday;
  saturday: Openday;
  sunday: Openday;
};

type Info = {
  _id: string;
  partner_id: string;
  description: string;
  contact: string;
  address: string;
  image: string;
  type_rest: string;
  time_length?: string;
  rounds?: Round[];
  openday: OpenDayInfo;
  information: Partner;
};

type Table = {
  _id: string;
  partner_id: string;
  table_no: string;
  seat: string;
};
type Menu = {
  _id: string;
  partner_id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};
type Password ={
  oldPassword : string,
  newPassword:string,
  confirmPassword : string
}

class PartnerStore {
  partnerLogin: Partner | undefined = undefined;
  openday: Openday = {
    type: "",
    start: "",
    end: "",
  };
  openDay: Openday = {
    type: "",
    start: "",
    end: "",
  };
  openDayInfo: OpenDayInfo = {
    monday: this.openDay,
    tuesday: this.openDay,
    wednesday: this.openDay,
    thursday: this.openDay,
    friday: this.openDay,
    saturday: this.openDay,
    sunday: this.openDay,
  };

  partnerInfo: Info = {
    _id: "",
    partner_id: "",
    description: "",
    address: "",
    contact: "",
    image: "",
    type_rest: "",
    time_length: "",
    rounds: [],
    openday: this.openDayInfo,
    information: {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPass: "",
      restaurantName: "",
      address: "",
    },
  };
  partnerInfoById: Info = {
    _id: "",
    partner_id: "",
    description: "",
    address: "",
    contact: "",
    image: "",
    type_rest: "",
    time_length: "",
    rounds: [],
    openday: this.openDayInfo,
    information: {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPass: "",
      restaurantName: "",
      address: "",
    },
  };
  tables: Table[] = [];
  tablesById: Table[] = [];
  table: Table = {
    _id: "",
    partner_id: "",
    table_no: "",
    seat: "",
  };
  menus: Menu[] = [];
  menu: Menu = {
    _id: "",
    partner_id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  };
  menusByRestId: Menu[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async createPartner(info: Partner) {
    const {
      username,
      firstname,
      lastname,
      email,
      restaurantName,
      address,
      phoneNumber,
      password,
      confirmPass,
    } = info;
    try {
      await axios.post(`${process.env.REACT_APP_API_REGISTER}/create-partner`, {
        restaurantName: restaurantName,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        confirmPass: confirmPass,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });
      await Swal.fire("Register Success!", "register success!", "success");
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
  async loginPartner(infoLogin: Login) {
    try {
      const { username, password } = infoLogin;
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH}/login-partner`,
        {
          username: username,
          password: password,
        }
      );
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      this.partnerLogin = response.data;
    } catch (err) {
      if (err instanceof Error) {
        await Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  async getPartner() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_AUTH}/get-partner`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.partnerLogin = response.data;
    } catch (err) {
      console.log(err);
    }
  }
  logout() {
    this.partnerLogin = undefined;
    sessionStorage.removeItem("token");
  }

  async resetPassword(allPassword:Password) {
    const { oldPassword, newPassword, confirmPassword } = allPassword;
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/reset-password`,
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

  //-----------------Information-----------------------------------
  async createInformation(formData: FormData) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_PARTNER}/create-info`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "บันทึกข้อมูลทั่วไปของร้านเรียบร้อยแล้ว",
        "create customer success!",
        "success"
      );
      this.getInfoRestaurant();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
        console.log(err.message);
        throw err;
      }
    }
  }

  async getInfoRestaurant() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-info`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.partnerInfo = response.data;
      console.log(this.partnerInfo);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getInfoRestaurantById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PARTNER}/get-info/${id}`
      );
      this.partnerInfoById = response.data;
      console.log(this.partnerInfoById);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async updateInformation(formData: FormData) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_PARTNER}/update-info`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขข้อมูลทั่วไปของร้านเรียบร้อยแล้ว",
        "update information success!",
        "success"
      );
      this.getInfoRestaurant();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
        console.log(err.message);
        throw err;
      }
    }
  }
  //----------------------table-----------------------------------------

  async createTable(table: { table_no: string; seat: string }) {
    try {
      const { table_no, seat } = table;
      await axios.post(
        `${process.env.REACT_APP_API_TABLE}/create-table`,
        {
          table_no: table_no,
          seat: seat,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "เพิ่มข้อมูลโต๊ะเรียบร้อยแล้ว",
        "create customer success!",
        "success"
      );
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }

  async updateTable(id: string, table: { table_no: string; seat: string }) {
    try {
      const { table_no, seat } = table;
      await axios.put(
        `${process.env.REACT_APP_API_TABLE}/update-table/${id}`,
        {
          table_no: table_no,
          seat: seat,
        },
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขข้อมูลโต๊ะเรียบร้อยแล้ว",
        "update customer success!",
        "success"
      );
    } catch (err: any) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }

  async getTableByRest() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_TABLE}/get-table-by-rest`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.tables = response.data;
      console.log(this.tables);
    } catch (err) {
      console.log(err);
    }
  }
  async getTableByRestId(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_TABLE}/get-table-by-rest-id/${id}`
      );
      this.tablesById = response.data;
      console.log(this.tablesById);
    } catch (err) {
      console.log(err);
    }
  }
  async getTableById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_TABLE}/get-table-by-id/${id}`
      );
      this.table = response.data;
      console.log(this.table);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTable(table_id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_TABLE}/delete-table/${table_id}`
      );
      Swal.fire("ลบข้อมูลโต๊ะเรียบร้อยแล้ว!", response.data.message, "success");
      this.getTableByRest();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  }
  //-------------------------menu------------------------------------------
  async createMenu(formData: FormData) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_MENU}/create-menu`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "บันทึกข้อมูลเมนูอาหารเรียบร้อยแล้ว",
        "create menu success!",
        "success"
      );
      this.getMenuByRest();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
        console.log(err.message);
        throw err;
      }
    }
  }
  async updateMenu(id: string, formData: FormData) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_MENU}/update-menu/${id}`,
        formData,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      Swal.fire(
        "แก้ไขข้อมูลเมนูอาหารเรียบร้อยแล้ว",
        "update information success!",
        "success"
      );
      this.getMenuByRest();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "มีข้อผิดพลาด",
          text: err.message,
        });
        console.log(err.message);
        throw err;
      }
    }
  }
  async getMenuByRest() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MENU}/get-menu-by-rest`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.menus = response.data;
      console.log(this.menus);
    } catch (err) {
      console.log(err);
    }
  }
  async getMenuByRestId(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MENU}/get-menu-by-rest-id/${id}`
      );
      this.menusByRestId = response.data;
      console.log(this.menusByRestId);
    } catch (err) {
      console.log(err);
    }
  }
  async getMenuByID(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MENU}/get-menu-by-id/${id}`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.menu = response.data;
      console.log(this.menu);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteMenu(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_MENU}/delete-menu/${id}`
      );
      Swal.fire(
        "ลบข้อมูลเมนูอาหารเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getMenuByRest();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  }
}

export const partnerStore = new PartnerStore();
partnerStore.getPartner();
