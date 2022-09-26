import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import SettingTypeRest from "./SettingTypeRest";
import SettingAllDay from "./SettingAllDay";
import SettingRound from "./SettingRound";
import { partnerStore } from "../../../store/partnerStore";

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

const types = [
  {
    key: "allDay",
    i18n: "เปิดทั้งวัน",
  },
  {
    key: "rounds",
    i18n: "เปิดเป็นรอบเวลา",
  },
];

type Info = {
  description: string;
  address: string;
  contact: string;
};
type InputFields = {
  start: string;
  end: string;
  
};

type OpenDay = {
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
const CreateInformation = observer(() => {
  const [info, setInfo] = useState<Info>({
    description: "",
    address: "",
    contact: "",
  });
  const [inputFields, setInputFields] = useState<InputFields[]>([
    {
      start: "",
      end: "",
    },
  ]);
  const [timeLength, setTimeLength] = useState<string>("");
  const [image, setimage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [selected, setSelected] = useState(
    types[0]
  );
  const [openDay, setOpenDay] = useState<OpenDay>({
    monday: {
      type: "",
    },
    tuesday: {
      type: "",
    },
    wednesday: {
      type: "",
    },
    thursday: {
      type: "",
    },
    friday: {
      type: "",
    },
    saturday: {
      type: "",
    },
    sunday: {
      type: "",
    },
  });


  const onChangeInfo = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  };

  const showPreview = (e: ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      console.log(objectUrl);
      setimage(file);
    } else {
      setimage(image);
    }
  };

  const handleChangeInput = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = inputFields.map((inputField, id) => {
      if (index === id) {
        inputField[event.target.name as keyof InputFields] = event.target.value;
      }
      return inputField;
    });

    setInputFields(newInputFields);
    console.log(inputFields);
  };

  const handleAddFields = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInputFields([...inputFields, { start: "", end: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const createInformation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("description", info.description);
    formData.append("address", info.address);
    formData.append("contact", info.contact);
    formData.append("image", image!);
    formData.append("type_rest", selected.key);
    if (selected.key === "allDay") {
      formData.append("time_length", timeLength);
      for (const day of days) {
        console.log(`openday[${day.key}][type]`);
        formData.append(`openday[${day.key}][type]`, openDay[day.key].type);
        if (openDay[day.key].type === "open") {
          formData.append(`openday[${day.key}][start]`, openDay[day.key].start!);
          formData.append(`openday[${day.key}][end]`, openDay[day.key].end!);
        }
        console.log(openDay[day.key].type);
      }
    } else if (selected.key === "rounds") {
      for (const day of days) {
        console.log(`openday[${day.key}][type]`);
        formData.append(`openday[${day.key}][type]`, openDay[day.key].type);
      }
      for (const index in inputFields) {
        formData.append(`rounds[${index}][start]`, inputFields[index].start);
        formData.append(`rounds[${index}][end]`, inputFields[index].end);
      }
    }

    await partnerStore.createInformation(formData);
  };

  return (
    <div>
      <div className=" mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          จัดการข้อมูลทั่วไปของร้านอาหาร
        </h3>
        <form onSubmit={createInformation} encType="multipart/form-data">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    คำอธิบายร้านอาหาร
                  </label>
                  <textarea
                    rows={3}
                    value={info.description}
                    onChange={onChangeInfo}
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ที่ตั้งร้านอาหาร
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    value={info.address}
                    onChange={onChangeInfo}
                    autoComplete="address"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ข้อมูลติดต่อ
                  </label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    value={info.contact}
                    onChange={onChangeInfo}
                    autoComplete="contact"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    รูปภาพร้านอาหาร{" "}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {image && (
                        <div>
                          {image && (
                            <img
                              src={preview}
                              className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                            />
                          )}
                        </div>
                      )}
                      {!image && (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <div className=" text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#1890ff] hover:text-[#40a9ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>อัพโหลดรูปภาพ</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={showPreview}
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <SettingTypeRest
                    types={types}
                    value={selected}
                    onChangeValue={setSelected}
                  />
                </div>
              </div>
              <div className="mt-3">
                {selected.key === "allDay" ? (
                  <SettingAllDay
                    timeLength={timeLength}
                    onTimeLengthChange={setTimeLength}
                   
                    openDay={openDay}
                    onChangeValue={setOpenDay}
                  />
                ) : (
                  <SettingRound
                   
                    openDay={openDay}
                    onChangeValue={setOpenDay}
                    inputFields={inputFields}
                    handleChangeInput={handleChangeInput}
                    handleAddFields={handleAddFields}
                    handleRemoveFields={handleRemoveFields}
                  />
                )}
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default CreateInformation;
