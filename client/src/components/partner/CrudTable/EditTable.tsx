import { observer } from "mobx-react-lite";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { partnerStore } from "../../../store/partnerStore";

type Table = {
  table_no: string;
  seat: string;
};

const EditTable = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState<Table>({
    table_no: "",
    seat: "",
  });
  useEffect(() => {
    const getTables = async () => {
      await partnerStore.getTableById(id!);
      const table = partnerStore.table;
      setTable({
        table_no: table.table_no,
        seat: table.seat,
      });
    };
    getTables();
  }, []);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setTable((prevTable) => {
      return {
        ...prevTable,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function editTable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await partnerStore.updateTable(id!, table);
  }
  return (
    <div>
      <div>
        <h1 className="text-lg font-medium border-b-2 pb-4">
          แก้ไขข้อมูลโต๊ะอาหาร
        </h1>
      </div>
      <div className="bg-white p-8 mt-5 rounded-lg">
        <form onSubmit={editTable}>
          <div className="grid gap-6 mb-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="table_no"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                หมายเลขโต๊ะ
              </label>
              <input
                type="text"
                id="table_no"
                name="table_no"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="หมายเลขโต๊ะ"
                value={table.table_no}
                onChange={onChangeInput}
                required
              />
            </div>
            <div>
              <label
                htmlFor="seat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                จำนวนที่นั่ง
              </label>
              <input
                type="text"
                id="seat"
                name="seat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="จำนวนที่นั่ง"
                value={table.seat}
                onChange={onChangeInput}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
});
export default EditTable;
