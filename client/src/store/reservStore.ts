import { getToken } from "../services/authorize";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import Swal from "sweetalert2";

type SelfReserv = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
};
type Customer = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPass: string;
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
  customer?: Customer[];
  self_reserv?: SelfReserv;
  table: string[];
  status: string;
};

class ReservStore {
  selfReserv: SelfReserv = {
    firstname: "",
    lastname: "",
    phoneNumber: "",
  };

  allDayReservs: Reserv[] = [];
  allDayReserv: Reserv = {
    _id: "",
    reservNumber: "",
    partner_id: "",
    day: "",
    start: "",
    end: "",
    amount: "",
    customer_id: "",
    customer: [],
    self_reserv: this.selfReserv,
    table: [],
    status: "",
  };
  roundReservs: Reserv[] = [];
  roundReserv: Reserv = {
    _id: "",
    reservNumber: "",
    partner_id: "",
    day: "",
    start: "",
    end: "",
    amount: "",
    customer: [],
    self_reserv: this.selfReserv,
    table: [],
    status: "",
  };
  thisReserv: Reserv = {
    _id: "",
    reservNumber: "",
    partner_id: "",
    day: "",
    start: "",
    end: "",
    amount: "",
    customer: [],
    self_reserv: this.selfReserv,
    table: [],
    status: "",
  };

  constructor() {
    makeAutoObservable(this);
  }
  //------------------------create self allday--------------
  async selfAllDayReserv(
    partner_id: string,
    selfReserv: SelfReserv,
    amount: string,
    date: string,
    start: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_RESERV}/self/all-day-reserv`,
        {
          partner_id: partner_id,
          self_reserv: selfReserv,
          day: date,
          start: start,
          amount: amount,
        }
      );
      this.thisReserv = response.data;
      Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  async customerAllDayReserv(
    partner_id: string,
    customer_id: string,
    amount: string,
    date: string,
    start: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_RESERV}/customer/all-day-reserv`,
        {
          partner_id: partner_id,
          customer_id:customer_id,
          day: date,
          start: start,
          amount: amount,
        }
      );
      this.thisReserv = response.data;
      Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  //-------------------------create self round--------------------------------------

  async selfRoundReserv(
    partner_id: string,
    selfReserv: SelfReserv,
    amount: string,
    date: string,
    start: string,
    end: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_RESERV}/self/round-reserv`,
        {
          partner_id: partner_id,
          self_reserv: selfReserv,
          day: date,
          start: start,
          end: end,
          amount: amount,
        }
      );
      Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
      this.thisReserv = response.data;
      console.log(this.thisReserv._id);
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
        console.log(err);
        throw err;
      }
    }
  }
  async customerRoundReserv(
    partner_id: string,
    customer_id:string,
    amount: string,
    date: string,
    start: string,
    end: string
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_RESERV}/customer/round-reserv`,
        {
          partner_id: partner_id,
          customer_id:customer_id,
          day: date,
          start: start,
          end: end,
          amount: amount,
        }
      );
      Swal.fire("จองคิวสำเร็จ!", "การจองคิวเรียบร้อยแล้ว", "success");
      this.thisReserv = response.data;
      console.log(this.thisReserv._id);
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
        console.log(err);
        throw err;
      }
    }
  }
  
  //---------------------update allDay reserv-----------------------------------------
  async selfAllDayUpdate(
    id: string,
    partnerId: string,
    selfReserv: SelfReserv,
    amount: string,
    date: string,
    start: string,
    table: string[]
  ) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/self/update-all-day-reserv/${id}`,
        {
          partner_id: partnerId,
          self_reserv: selfReserv,
          day: date,
          start: start,
          amount: amount,
          table: table,
        }
      );
      Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
      this.getAllDayReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }

  async customerAllDayUpdate(
    id: string,
    partnerId: string,
    customer_id: string,
    amount: string,
    date: string,
    start: string,
    table: string[]
  ) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/customer/update-all-day-reserv/${id}`,
        {
          partner_id: partnerId,
          customer_id: customer_id,
          day: date,
          start: start,
          amount: amount,
          table: table,
        }
      );
      Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
      this.getAllDayReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  //---------------------update round reserv-----------------------------------------
  async selfRoundUpdate(
    id: string,
    partnerId: string,
    selfReserv: SelfReserv,
    amount: string,
    date: string,
    start: string,
    end: string,
    table: string[]
  ) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/self/update-round-reserv/${id}`,
        {
          partner_id: partnerId,
          self_reserv: selfReserv,
          day: date,
          start: start,
          end: end,
          amount: amount,
          table: table,
        }
      );
      Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
      this.getAllDayReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }

  async customerRoundUpdate(
    id: string,
    partnerId: string,
    customer_id: string,
    amount: string,
    date: string,
    start: string,
    end: string,
    table: string[]
  ) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/customer/update-round-reserv/${id}`,
        {
          partner_id: partnerId,
          customer_id: customer_id,
          day: date,
          start: start,
          end: end,
          amount: amount,
          table: table,
        }
      );
      Swal.fire("แก้ไขข้อมูลเรียบร้อยแล้ว", "update success!", "success");
      this.getAllDayReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  //-----------------update status allDay--------------------
  async updateStatusAllDay(id: string, status: string) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/update-status-all-day-reserv/${id}`,
        {
          status: status,
        }
      );
      Swal.fire("แก้ไขสถานะเรียบร้อยแล้ว", "update success!", "success");
      this.getAllDayReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  //-----------------update status round--------------------
  async updateStatusRound(id: string, status: string) {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_RESERV}/update-status-round-reserv/${id}`,
        {
          status: status,
        }
      );
      Swal.fire("แก้ไขสถานะเรียบร้อยแล้ว", "update success!", "success");
      this.getRoundReserv();
    } catch (err) {
      if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: err.message,
        });
      }
      console.log(err);
      throw err;
    }
  }
  //-----------------------get allDay----------------------
  async getAllDayReserv() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/get-all-day-reservs`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.allDayReservs = response.data;
      console.log(this.allDayReservs);
    } catch (err) {
      console.log(err);
    }
  }
  async getAllDayReservById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/get-all-day-reserv-by-id/${id}`
      );
      this.allDayReserv = response.data;
      console.log(this.allDayReserv);
    } catch (err) {
      console.log(err);
    }
  }
  //----------------------get Round------------------------
  async getRoundReserv() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/get-round-reservs`,
        {
          headers: { "x-access-token": getToken() },
        }
      );
      this.roundReservs = response.data;
      console.log(this.roundReservs);
    } catch (err) {
      console.log(err);
    }
  }

  async getRoundReservById(id: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_RESERV}/get-round-reserv-by-id/${id}`
      );
      this.roundReserv = response.data;
      console.log(this.roundReserv);
    } catch (err) {
      console.log(err);
    }
  }
  //------------------------------delete allDay--------------------

  async deleteAllDayReserv(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_RESERV}/delete-all-day-reserv/${id}`
      );
      Swal.fire(
        "ลบข้อมูลการจองเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getAllDayReserv();
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

  //------------------------------delete round--------------------

  async deleteRoundReserv(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_RESERV}//delete-round-reserv/${id}`
      );
      Swal.fire(
        "ลบข้อมูลการจองเรียบร้อยแล้ว!",
        response.data.message,
        "success"
      );
      this.getRoundReserv();
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

export const reservStore = new ReservStore();
