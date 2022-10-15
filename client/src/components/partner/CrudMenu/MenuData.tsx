import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { partnerStore } from "../../../store/partnerStore";
import SearchText from "../../searchText/SearchText";

const MenuData = observer(() => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dataPerPage = 2;
  const pagesVisited = pageNumber * dataPerPage;

  useEffect(() => {
    const getAllAdmins = async () => {
      await partnerStore.getMenuByRest();
    };
    getAllAdmins();
  }, []);
  const menus = partnerStore.menus;
  const pageCount = Math.ceil(menus.length / dataPerPage);
  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };
  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        partnerStore.deleteMenu(id);
      }
    });
  };

  const displayData = menus
    .filter((menu) => menu.name.includes(searchText))
    .slice(pagesVisited, pagesVisited + dataPerPage)

    .map((menu) => {
      return (
        <div key={menu._id} className="bg-white  shadow  sm:rounded-lg mb-6">
          <div className="grid grid-cols-2 ">
            <div className="px-4 py-3 sm:px-3   ">
              <a className="text-base leading-6 font-medium text-gray-900 hover:text-blue-700">
                เมนู {menu.name}
              </a>
            </div>
            <div className="px-4 py-3 text-right">
              <button
                className=" py-1 px-3 border mr-2 border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                onClick={() => {
                  navigate(`/partner/edit/menu/${menu._id}`);
                }}
              >
                แก้ไข
              </button>
              <button
                className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 "
                onClick={() => {
                  confirmDelete(menu._id!);
                }}
              >
                ลบ
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">รูปภาพ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img
                    className=" align-center mt-4 rounded object-cover h-32 w-60 "
                    src={`http://localhost:5500/uploads/${menu.image}`}
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">คำอธิบาย</dt>
                <dd className="mt-1 text-sm  w-3/4 text-gray-900 sm:mt-0 sm:col-span-2">
                  {menu.description}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ราคา</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {menu.price} บาท
                </dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-gray-200" />
        </div>
      );
    });

  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">ข้อมูลเมนูอาหาร</h1>
      </div>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md mt-4"
          onClick={() => {
            navigate("/partner/create/menu");
          }}
        >
          เพิ่มข้อมูลเมนูอาหาร
        </button>
        <div className="mt-4">
          <SearchText value={searchText} onChangeValue={setSearchText} />
        </div>
        <div className="h-[670px]  mt-5 rounded-md">{displayData}</div>
        {menus.length > 2 && (
          <>
            <div className="border-b-2 border-gray-200" />
            <div className="flex justify-center">
              <ReactPaginate
                previousLabel={<i className="fa-solid fa-angles-left"></i>}
                nextLabel={<i className="fa-solid fa-angles-right"></i>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default MenuData;
