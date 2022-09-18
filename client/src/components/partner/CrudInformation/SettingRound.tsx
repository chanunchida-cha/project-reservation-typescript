import React, { ChangeEvent, MouseEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
type DaysProps = {
  days:readonly [
    {
      key: "monday",
      i18n: "วันจันทร์",
    },
    {
      key: "tuesday",
      i18n: "วันอังคาร",
    },
    {
      key: "wednesday",
      i18n: "วันพุธ",
    },
    {
      key: "thursday",
      i18n: "วันพฤหัสบดี",
    },
    {
      key: "friday",
      i18n: "วันศุกร์",
    },
    {
      key: "saturday",
      i18n: "วันเสาร์",
    },
    {
      key: "sunday",
      i18n: "วันอาทิตย์",
    },
  ];
};

type OpenDay = {
  openDay: {
    monday: {
      type: string;
    };
    tuesday: {
      type: string;
    };
    wednesday: {
      type: string;
    };
    thursday: {
      type: string;
    };
    friday: {
      type: string;
    };
    saturday: {
      type: string;
    };
    sunday: {
      type: string;
    };
    
  };
};

type OnChangeValue = {
  onChangeValue: (openday: {
    monday: {
      type: string;
    };
    tuesday: {
      type: string;
    };
    wednesday: {
      type: string;
    };
    thursday: {
      type: string;
    };
    friday: {
      type: string;
    };
    saturday: {
      type: string;
    };
    sunday: {
      type: string;
    };
  }) => void;
};

type InputFieldsProps = {
  inputFields: {
    start: string | null;
    end: string | null;
  }[];
};

type HandleChangeInput = {
  handleChangeInput: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};

type HandleAddFields = {
  handleAddFields: (event: MouseEvent<HTMLButtonElement>) => void;
};

type HandleRemoveFields = {
  handleRemoveFields: (index: number) => void;
};

function SettingRound(
  props: DaysProps &
    OpenDay &
    OnChangeValue &
    InputFieldsProps &
    HandleChangeInput &
    HandleAddFields &
    HandleRemoveFields
) {
  const {
    days,
    openDay,
    onChangeValue,
    inputFields,
    handleChangeInput,
    handleAddFields,
    handleRemoveFields,
  } = props;
  return (
    <div>
      <div className="col-span-6 sm:col-span-6">
        <label
          htmlFor="openDay"
          className="block text-sm font-medium text-gray-700"
        >
          เวลาเปิด-ปิดร้าน
        </label>
        <div className="mt-2 bg-white shadow-sm border-gray-300 rounded-md p-3 ">
          {days.map((day) => {
            return (
              <div key={day.key} className="mt-3 mb-2">
                <label
                  htmlFor={day.key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {day.i18n}
                </label>
                <input
                  id="open"
                  type="radio"
                  name={day.key}
                  className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
                  onChange={(e) => {
                    if (e.target.value === "open") {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                       
                        },
                      });
                    } else {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                        },
                      });
                    }
                  }}
                  value={"open"}
                />
                <label
                  htmlFor="open"
                  className="ml-2 text-sm mr-3 font-medium text-gray-900 dark:text-gray-300"
                >
                  เปิด
                </label>
                <input
                  id="close"
                  type="radio"
                  name={day.key}
                  className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
                  onChange={(e) => {
                    if (e.target.value === "open") {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                        },
                      });
                    } else {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          type: e.target.value,
                        },
                      });
                    }
                  }}
                  value={"close"}
                />
                <label
                  htmlFor="close"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  ไม่เปิด
                </label>
              </div>
            );
          })}
        </div>
        <div className="">
          เพิ่มรอบเวลา
          {inputFields.map((inputField, index) => {
            return (
              <div key={index}>
                <div className="mt-3">
                  <TextField
                    name="start"
                    value={inputField.start}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      handleChangeInput(index, event);
                    }}
                    id="time"
                    label="เริ่มต้น"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150, marginRight: 2 }}
                  />
                  <TextField
                    name="end"
                    value={inputField.end}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      handleChangeInput(index, event);
                    }}
                    id="time"
                    label="หมดเวลา"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                  />
                  <button
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      handleAddFields(event);
                    }}
                    className=" py-2 px-3 border ml-2 mt-2 border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
                  >
                    เพิ่มรอบการจอง
                  </button>
                  <button
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(index)}
                    className=" py-2 px-3 border ml-2 mt-2 border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D4F] hover:bg-[#f76d6f] "
                  >
                    ลบ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingRound;
