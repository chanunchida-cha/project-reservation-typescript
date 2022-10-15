import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { rudStore } from "../../../store/rudStore";
import SearchText from "../../searchText/SearchText";
const PartnerApprove = observer(() => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dataPerPage = 3;
  const pagesVisited = pageNumber * dataPerPage;
  useEffect(() => {
    const getPartnerApprove = async () => {
      await rudStore.getPartnerApprove();
    };
    getPartnerApprove();
  }, []);
  const partnerApproves = rudStore.partnerApprove;
  const pageCount = Math.ceil(partnerApproves.length / dataPerPage);
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
        rudStore.deletePartner(id);
      }
    });
  };

  const displayData = partnerApproves
    .filter((partnerApprove) => {
      return (
        partnerApprove.restaurantName?.includes(searchText) ||
        partnerApprove.firstname.includes(searchText)
      );
    })
    .slice(pagesVisited, pagesVisited + dataPerPage)

    .map((partnerApprove) => {
      return (
        <div
          key={partnerApprove._id}
          className="bg-white shadow overflow-hidden  sm:rounded-lg mb-6"
        >
          <div className="grid grid-cols-2 ">
            <div className="px-4 py-3 sm:px-6   ">
              <a
                href={`/admin/partner/approve/${partnerApprove._id}`}
                className="text-base leading-6 font-medium text-gray-900 hover:text-blue-700"
              >
                ร้าน{partnerApprove.restaurantName}
              </a>
            </div>
            <div className="px-4 py-3 text-right">
              <button
                className=" py-1 px-3 border mr-2 border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                onClick={() => {
                  navigate(`/admin/edit/partner/${partnerApprove._id}`);
                }}
              >
                แก้ไข
              </button>
              <button
                className=" py-1 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 "
                onClick={() => {
                  confirmDelete(partnerApprove._id!);
                }}
              >
                ลบ
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  ชื่อ-นามสกุล
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {`${partnerApprove.firstname}  ${partnerApprove.lastname}`}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  เบอร์โทรศัพท์
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {partnerApprove.phoneNumber}
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
        <h1 className="text-lg font-medium border-b-2 pb-4">
          ข้อมูลร้านอาหารที่ได้รับการอนุมัติ
        </h1>
      </div>
      <div className="mt-4">
        <SearchText value={searchText} onChangeValue={setSearchText} />
      </div>
      <div className="h-[520px] overflow-x-auto mt-5 rounded-md">
        {displayData}
      </div>
      {partnerApproves.length > 3 && (
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

export default PartnerApprove;
