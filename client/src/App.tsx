import React, { useState } from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import ShowAllRes from "./components/indexPage/ShowAllRes";
import SearchText from "./components/searchText/SearchText";

const App = observer(() => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className="App">
      <div className="bg-index bg-cover bg-center h-40 sm:h-40 md:h-96 xl:h-96">
        <div className="flex justify-center">
          <div className="w-3/4 mt-10  sm:w-2/4 md:w-2/4 lg:w-2/4 xl:w-2/4  py-14  sm:py-14  xl:py-40 flex justify-center">
            <div className="sm:pt-10 md:pt-10 lg:pt-10 xl:pt-10 ">
              <SearchText value={searchText} onChangeValue={setSearchText} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-3">
        <ShowAllRes value={searchText} />
      </div>
    </div>
  );
});
export default App;
