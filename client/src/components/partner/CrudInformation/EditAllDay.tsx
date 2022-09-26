import React from 'react'
import TextField from "@mui/material/TextField";


const days = [
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
] as const;

type TimeLengthProps = {
  timeLength: string;
};

type OnTimeLengthChange = {
  onTimeLengthChange: (timerlength: string) => void;
};
type OpenDay = {
  openDay: {
    monday: {
      type: string;
      start?: string;
      end?: string;
    };
    tuesday: {
      type: string;
      start?: string;
      end?: string;
    };
    wednesday: {
      type: string;
      start?: string;
      end?: string;
    };
    thursday: {
      type: string;
      start?: string;
      end?: string;
    };
    friday: {
      type: string;
      start?: string;
      end?: string;
    };
    saturday: {
      type: string;
      start?: string;
      end?: string;
    };
    sunday: {
      type: string;
      start?: string;
      end?: string;
    };
    
  };
};

type OnChangeValue = {
  onChangeValue: (openday: {
    monday: {
      type: string;
      start?: string;
      end?: string;
    };
    tuesday: {
      type: string;
      start?: string;
      end?: string;
    };
    wednesday: {
      type: string;
      start?: string;
      end?: string;
    };
    thursday: {
      type: string;
      start?: string;
      end?: string;
    };
    friday: {
      type: string;
      start?: string;
      end?: string;
    };
    saturday: {
      type: string;
      start?: string;
      end?: string;
    };
    sunday: {
      type: string;
      start?: string;
      end?: string;
    };
  }) => void;
};

function EditAllDay(props: TimeLengthProps &

  OnTimeLengthChange &
  OpenDay &
  OnChangeValue) {
    const { timeLength, onTimeLengthChange, openDay, onChangeValue } =
    props;
  return (
    <div className=" grid grid-cols-6 gap-6">
    <div className="col-span-1 sm:col-span-1 ">
      <label
        htmlFor="email-address"
        className=" text-sm font-medium text-gray-700"
      >
        ระยะเวลาขั้นต่ำ/รอบการจอง
      </label>
      <input
        type="text"
        name="timeLength"
        id="timeLength"
        value={timeLength}
        onChange={(e) => {
          onTimeLengthChange(e.target.value);
        }}
        autoComplete="timeLength"
        className="p-2  mt-1 shadow-md w-80 lg:text-sm border-gray-500 rounded-md"
      />
    </div>
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
                checked={openDay[day.key].type === "open"}
                className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
                onChange={(e) => {
                  if (e.target.value === "open") {
                    onChangeValue({
                      ...openDay,
                      [day.key]: {
                        type: e.target.value,
                        start: "",
                        end: "",
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
                checked={openDay[day.key].type === "close"}
                className="w-4 h-4 text-blue-600 bg-blue-700 border-gray-300   "
                onChange={(e) => {
                  if (e.target.value === "open") {
                    onChangeValue({
                      ...openDay,
                      [day.key]: {
                        type: e.target.value,
                        start: "",
                        end: "",
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
              {openDay[day.key].type === "open" && (
                <div className="mt-3">
                  <TextField
                    name="start"
                    id="time"
                    label="เวลาเปิด"
                    type="time"
                    onChange={(e) => {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          ...openDay[day.key],
                          start: e.target.value,
                          end: openDay[day.key].end,
                        },
                      });
                    }}
                    value={openDay[day.key].start}
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
                    id="time"
                    label="เวลาปิด"
                    type="time"
                    onChange={(e) => {
                      onChangeValue({
                        ...openDay,
                        [day.key]: {
                          ...openDay[day.key],
                          start: openDay[day.key].start,
                          end: e.target.value,
                        },
                      });
                    }}
                    value={openDay[day.key].end}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}

export default EditAllDay