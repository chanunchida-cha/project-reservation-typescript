import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { partnerStore } from "../../../store/partnerStore";

const TableData = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    const getTables = async () => {
      await partnerStore.getTableByRest();
    };
    getTables();
  }, []);

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
    }).then((resualt) => {
      if (resualt.isConfirmed) {
        partnerStore.deleteTable(id)
      }
    });
  };
  const tables = partnerStore.tables;
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">ข้อมูลโต๊ะอาหาร</h1>
      </div>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md mt-4"
          onClick={() => {
            navigate("/partner/create/table");
          }}
        >
          เพิ่มข้อมูลโต๊ะอาหาร
        </button>
      </div>
      {tables.length > 0 && (
        <div className="shadow mt-4  overflow-hidden sm:rounded-md">
          <div className="px-4 py-4 bg-white sm:p-6">
           
            <div className="grid grid-cols-1 mt-3 gap-4 sm:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-3 ">
              {tables.map((table) => {
                return (
                  <div
                    key={table._id}
                    className=" inline-flex rounded-lg  bg-white shadow-md overflow-hidden"
                  >
                    <div className={"p-4 bg-[#00B5B4] "}>
                      <div className=" uppercase tracking-wider text-sm">
                        โต๊ะ
                      </div>
                      <div className=" text-lg">{table.table_no}</div>
                    </div>
                    <div className="grid grid-cols-6 w-full">
                    <div className="col-span-6 pl-4 py-2 ">
                      <div className="text-base ">
                        จำนวนที่นั่ง: {table.seat}
                      </div>
                    </div>
                    <div className="col-span-2 col-start-5 pb-2">
                      <button className=" p-1 px-2 border mr-2 border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 "
                       onClick={()=>{navigate(`/partner/edit/table/${table._id}`)}}
                      >
                        แก้ไข
                      </button>
                      <button className=" p-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 "
                      onClick={() => {
                        confirmDelete(table._id!);
                      }}
                      >
                        ลบ
                      </button>
                    </div>
  

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
export default TableData;
