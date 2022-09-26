import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { customerStore } from "./store/customerStore";
import ShowAllRes from "./components/indexPage/ShowAllRes";

const App=observer(()=>{
  return <div className="App">

    
      <div className="bg-index bg-cover bg-center h-40 sm:h-40 xl:h-96"></div>
      <div className="mx-3">
        <ShowAllRes/>
      </div>
  </div>;
}
)
export default App;
