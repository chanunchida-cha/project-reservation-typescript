import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { rudStore } from "../../../store/rudStore";
import SearchText from "../../searchText/SearchText";

const CustomerData = observer(() => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dataPerPage = 3;
  const pagesVisited = pageNumber * dataPerPage;
  useEffect(() => {
    const getAllcustomers = async () => {
      await rudStore.getAllCustomer();
    };
    getAllcustomers();
  }, []);
  const allCustomer = rudStore.allCustomers;
  const pageCount = Math.ceil(allCustomer.length / dataPerPage);
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
        rudStore.deleteCustomer(id);
      }
    });
  };
  const displayData = allCustomer
    .filter(
      (customer) =>
        customer.firstname.includes(searchText) ||
        customer.lastname.includes(searchText)
    )
    .slice(pagesVisited, pagesVisited + dataPerPage)

    .map((customer) => {
      return (
        <div
          key={customer._id}
          className="bg-white  shadow overflow-hidden sm:rounded-lg mb-4"
        >
          <div className="grid grid-cols-2 ">
            <div className="px-4 py-2 sm:px-6   ">
              <a
                href={`/admin/customersdata/${customer._id}`}
                className="text-base leading-6 font-medium text-gray-900 hover:text-blue-700"
              >
                คุณ {`${customer.firstname}  ${customer.lastname}`}
              </a>
            </div>
            <div className="px-4 py-2 text-right">
              <button
                className=" py-1 px-3 border mr-2 border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                onClick={() => {
                  navigate(`/admin/edit/customer/${customer._id}`);
                }}
              >
                แก้ไข
              </button>
              <button
                className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 "
                onClick={() => {
                  confirmDelete(customer._id!);
                }}
              >
                ลบ
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  ชื่อ-นามสกุล
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {`${customer.firstname}  ${customer.lastname}`}
                </dd>
              </div>
              <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">อีเมล</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  เบอร์โทรศัพท์
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {customer.phoneNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      );
    });
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">ข้อมูลลูกค้า</h1>
      </div>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md mt-4"
          onClick={() => {
            navigate("/admin/create/customer");
          }}
        >
          เพิ่มข้อมูลลูกค้า
        </button>
      </div>
      <div className="mt-4">
        <SearchText value={searchText} onChangeValue={setSearchText} />
      </div>
      <div className="h-[520px] overflow-x-auto mt-5 rounded-md">
        {displayData}
      </div>
      {allCustomer.length > 3 && (
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
  );
});
export default CustomerData;
