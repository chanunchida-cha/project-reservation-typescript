import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customerStore } from "./store/customerStore";

const Navbar = observer(() => {
  const navigate = useNavigate();
  const customer = customerStore.customerLogin;
  const [navbar, setNavbar] = useState(true);
  const [openSupProfile, setopenSupProfile] = useState<boolean>(false);
  const [openMenuPartner, setOpenMenuPartner] = useState<boolean>(false);
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  console.log(customer?.username);
  const scrollNav = () => {
    if (window.scrollY > 60) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollNav);
    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, []);

  return (
    <nav  className={`${
      navbar && "fixed top-0 w-full z-50 bg-gray-50 ease-in duration-500"
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                setOpenMenuMobile(!openMenuMobile);
              }}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <div>
                <a href="/" className="text-2xl font-bold">
                  CubeQue
                </a>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {!customer?.username && (
                  <a
                    href="/customer/login"
                    className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    เข้าสู่ระบบ
                  </a>
                )}
                <a
                  href="/customer/register"
                  className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  สมัครสมาชิก
                </a>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className=" flex text-sm  "
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => {
                          setOpenMenuPartner(!openMenuPartner);
                        }}
                      >
                        ต้องการเป็นพาร์ทเนอร์
                      </button>
                    </div>

                    {openMenuPartner && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                      >
                        <a
                          href="/partner/register"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-0"
                        >
                          สมัครสมาชิก
                        </a>
                        <a
                          href="/partner/login"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-1"
                        >
                          เข้าสู่ระบบ
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {customer?.username && (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className=" flex text-sm"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => {
                      setopenSupProfile(!openSupProfile);
                    }}
                  >
                    {customer?.username}
                  </button>
                </div>

                {openSupProfile && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <a
                      href="/myprofile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      โปรไฟล์
                    </a>
                    <a
                      href="/history/reservation"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      ประวัติการจอง
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                      onClick={() => {
                        customerStore.logout();
                        navigate("/");
                      }}
                    >
                      ออกจากระบบ
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {openMenuMobile && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className=" text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
});
export default Navbar;
