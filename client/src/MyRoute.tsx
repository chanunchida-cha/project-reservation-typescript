import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import EditPassword from "./components/customer/EditPassword";
import EditProfile from "./components/customer/EditProfile";
import HistoryReserv from "./components/customer/HistoryReserv";
import MyProfile from "./components/customer/MyProfile";
import SingleHistory from "./components/customer/SingleHistory";
import EditMyReservAllday from "./components/indexPage/EditMyReservAllday";
import EditMyReservRound from "./components/indexPage/EditMyReservRound";
import MyReserv from "./components/indexPage/MyReserv";
import SingleRestaurant from "./components/indexPage/SingleRestaurant";
import Login from "./components/Page/Login";
import Register from "./components/Page/Register";
import LayOut from "./Layout";

function MyRoute() {
  return (
    <LayOut>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:role/login" element={<Login />} />
        <Route path="/:role/register" element={<Register />} />
        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        <Route
          path={"/myreservation/:type/:partner_id/:id"}
          element={<MyReserv />}
        />
        <Route
          path={"/edit/myreservation/allDay/:partner_id/:reserv_id"}
          element={<EditMyReservAllday />}
        />
        <Route
          path={"/edit/myreservation/rounds/:partner_id/:reserv_id"}
          element={<EditMyReservRound />}
        />
            <Route
          path={"/myprofile"}
          element={<MyProfile />}
          
        />
            <Route
          path={"/myprofile/edit"}
          element={<EditProfile />}
          
        />
            <Route
          path={"/edit/password"}
          element={<EditPassword />}
          
        />
             <Route
          path={"/history/reservation"}
          element={<HistoryReserv />}
          
        />
        <Route path={"/history/:type/:reserv_id/:partner_id"} element={<SingleHistory/>}/>
       
      </Routes>
    </LayOut>
  );
}

export default MyRoute;
