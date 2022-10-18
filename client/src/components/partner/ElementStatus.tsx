import React from "react";
import { partnerStore } from "../../store/partnerStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const ElementStatus = observer(() => {
  const navigate = useNavigate();
  const status = partnerStore.partnerLogin?.status;
  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="status-note relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {status === "disapprove" ? (
                  <>
                    <h3
                      className="text-lg leading-6 font-medium text-red-500"
                      id="modal-title"
                    >
                      ร้านอาหารของคุณไม่ได้รับการอนุมัติ
                    </h3>
                    <div className="mt-2 ">
                      <p className="text-sm  text-gray-700">
                        {`เนื่องจาก ${partnerStore.partnerLogin?.note}`}
                      </p>
                    </div>
                    <div className="mt-2 ">
                      <p className="text-sm  text-gray-500">
                       **** กรุณาติดต่อ 038111112 ****
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3
                      className="text-lg leading-6 font-medium text-red-500"
                      id="modal-title"
                    >
                      ร้านอาหารของคุณยังไม่ได้รับการตรวจสอบ
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="grid justify-items-end">
              <button
                className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white"
                onClick={() => {
                  partnerStore.logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ElementStatus;
