import { observer } from "mobx-react-lite";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { partnerStore } from "../../../store/partnerStore";
import EditAllDay from "./EditAllDay";
import EditRound from "./EditRound";
import EditTypeRest from "./EditTypeRest";
import { useNavigate } from "react-router-dom";

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

const EditInformation = observer(() => {
  const navigate = useNavigate();
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
  const [image, setimage] = useState<File | string>();
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [selected, setSelected] = useState<{ key: string; i18n?: string }>(
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

  useEffect(() => {
    const getInfo = async () => {
      await partnerStore.getInfoRestaurant();
      const partnerInfo = partnerStore.partnerInfo;
      setInfo({
        description: partnerInfo.description,
        address: partnerInfo.address,
        contact: partnerInfo.contact,
      });
      setimage(partnerInfo.image);
      setSelected({ key: partnerInfo.type_rest });
      if (partnerInfo.type_rest === "allDay") {
        setTimeLength(partnerInfo.time_length!);
        setOpenDay({
          monday: {
            type: partnerInfo.openday.monday.type,
            start: partnerInfo.openday.monday.start,
            end: partnerInfo.openday.monday.end,
          },
          tuesday: {
            type: partnerInfo.openday.tuesday.type,
            start: partnerInfo.openday.tuesday.start,
            end: partnerInfo.openday.tuesday.end,
          },
          wednesday: {
            type: partnerInfo.openday.wednesday.type,
            start: partnerInfo.openday.wednesday.start,
            end: partnerInfo.openday.wednesday.end,
          },
          thursday: {
            type: partnerInfo.openday.thursday.type,
            start: partnerInfo.openday.thursday.start,
            end: partnerInfo.openday.thursday.end,
          },
          friday: {
            type: partnerInfo.openday.friday.type,
            start: partnerInfo.openday.friday.start,
            end: partnerInfo.openday.friday.end,
          },
          saturday: {
            type: partnerInfo.openday.saturday.type,
            start: partnerInfo.openday.saturday.start,
            end: partnerInfo.openday.saturday.end,
          },
          sunday: {
            type: partnerInfo.openday.sunday.type,
            start: partnerInfo.openday.sunday.start,
            end: partnerInfo.openday.sunday.end,
          },
        });
      } else if (partnerInfo.type_rest === "rounds") {
        setInputFields(
          partnerInfo.rounds!.map((round) => {
            return {
              start: round.start,
              end: round.end,
            };
          })
        );
        setOpenDay({
          monday: {
            type: partnerInfo.openday.monday.type,
          },
          tuesday: {
            type: partnerInfo.openday.tuesday.type,
          },
          wednesday: {
            type: partnerInfo.openday.wednesday.type,
          },
          thursday: {
            type: partnerInfo.openday.thursday.type,
          },
          friday: {
            type: partnerInfo.openday.friday.type,
          },
          saturday: {
            type: partnerInfo.openday.saturday.type,
          },
          sunday: {
            type: partnerInfo.openday.sunday.type,
          },
        });
      }
    };
    getInfo();
  }, []);
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
      setImageChange(true);
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
  console.log(image);

  const editInformation = async (event: FormEvent<HTMLFormElement>) => {
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
          formData.append(
            `openday[${day.key}][start]`,
            openDay[day.key].start!
          );
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

    await partnerStore.updateInformation(formData);
    navigate("/partner/information");
  };

  return (
    <div>
      <div className=" mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          จัดการข้อมูลทั่วไปของร้านอาหาร
        </h3>
        <form onSubmit={editInformation} encType="multipart/form-data">
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
                      {imageChange === true ? (
                        <div>
                          <img
                            src={preview}
                            className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={`http://localhost:5500/uploads/${image}`}
                            className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                          />
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
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-700 hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>อัพโหลดรูปภาพ</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={showPreview}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <EditTypeRest
                    types={types}
                    value={selected}
                    onChangeValue={setSelected}
                  />
                </div>
              </div>
              <div className="mt-3">
                {selected.key === "allDay" ? (
                  <EditAllDay
                    timeLength={timeLength}
                    onTimeLengthChange={setTimeLength}
               
                    openDay={openDay}
                    onChangeValue={setOpenDay}
                  />
                ) : (
                  <EditRound
                
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
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
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

export default EditInformation;
