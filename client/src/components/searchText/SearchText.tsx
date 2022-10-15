import React from "react";

type Value = {
  value: string;
};

type OnChangeValue = {
  onChangeValue: (value: string) => void;
};

function SearchText({ value, onChangeValue }: Value & OnChangeValue) {
  return (
    <div>
      <input
        type="text"
        name="restaurantName"
        id="restaurantName"
        value={value}
        onChange={(e) => {
          onChangeValue(e.target.value);
        }}
        autoComplete="restaurantName"
        placeholder="ค้นหา..."
        className="p-1 sm:p-2 mt-1 text-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-[600px] shadow-sm lg:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}

export default SearchText;
