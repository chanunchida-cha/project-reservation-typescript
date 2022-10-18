import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { partnerStore } from "../../../store/partnerStore";

type Menu = {
  name: string;
  description: string;
  price: string;
};
const CreateMenu = observer(() => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu>({
    name: "",
    description: "",
    price: "",
  });
  const [image, setimage] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMenu((preMenu) => {
      return {
        ...preMenu,
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

  const createMenu = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", menu.name);
    formData.append("description", menu.description);
    formData.append("price", menu.price);
    formData.append("image", image!);
    await partnerStore.createMenu(formData);
    navigate("/partner/menu");
  };

  return (
    <div>
      <div className=" mt-3 md:mt-0 md:col-span-2">
        <h1 className="text-lg font-medium border-b-2 pb-4">
          เพิ่มข้อมูลเมนูอาหาร
        </h1>
        <form onSubmit={createMenu} encType="multipart/form-data">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อเมนูอาหาร
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={menu.name}
                    onChange={onChangeInput}
                    autoComplete="contact"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    คำอธิบายเมนูอาหาร
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={menu.description}
                    onChange={onChangeInput}
                    autoComplete="description"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ราคา
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={menu.price}
                    onChange={onChangeInput}
                    autoComplete="price"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    รูปเมนูอาหาร{" "}
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
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-700 hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
              </div>

              <div className="px-4 py-3  text-right sm:px-6">
                <button
                  type="submit"
                  className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
export default CreateMenu;
