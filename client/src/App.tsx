import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { customerStore } from "./store/customerStore";

const App=observer(()=>{
  return <div className="App">
    {customerStore.customerLogin?.username}
  </div>;
}
)
export default App;
