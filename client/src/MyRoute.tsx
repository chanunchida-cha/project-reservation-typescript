import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
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
      </Routes>
    </LayOut>
  );
}

export default MyRoute;
