import React from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import ShowAllRes from "./components/indexPage/ShowAllRes";



const App = observer(() => {


  return (
    <div className="App">
      <div className="bg-index bg-cover bg-center h-40 sm:h-40 xl:h-96"></div>
      
      <div className="mx-3">
        <ShowAllRes />
      </div>
    </div>
  );
});
export default App;
