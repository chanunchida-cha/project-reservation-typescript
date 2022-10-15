import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminStore } from "../../store/adminStore";
import { customerStore } from "../../store/customerStore";
import { partnerStore } from "../../store/partnerStore";
import FacebookLogin from "react-facebook-login";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";

type InfoLogin = {
  username: string;
  password: string;
};

const startInfo = {
  username: "",
  password: "",
};
type ResponseFacebook = {
  accessToken: string;
  data_access_expiration_time: number;
  email: string;
  expiresIn: number;
  graphDomain: string;
  id: string;
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      weigth: number;
    };
  };
  signedRequest: string;
  userID: string;
};

const Login = observer(() => {
  const navigate = useNavigate();
  const { role } = useParams();
  const [infoLogin, setInfoLogin] = useState<InfoLogin>(startInfo);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInfoLogin((prevInfo) => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function loginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (role === "customer") {
      await customerStore.loginCustomer(infoLogin);
      navigate("/");
    } else if (role === "partner") {
      await partnerStore.loginPartner(infoLogin);
      navigate("/partner/dashboard");
    } else if (role === "admin") {
      await adminStore.loginAdmin(infoLogin);
      navigate("/admin/dashboard");
    }
  }

  const responseFacebook = async (response: ResponseFacebook) => {
    console.log(response);
    await customerStore.loginFaceBook(response.accessToken, response.userID);
    navigate("/");
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: `${process.env.REACT_APP_GOOGLE_ID}` });
    });
  }, []);

  const responseSuccessGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response) {
      await customerStore.loginGoogle(response.tokenId,response.googleId);
    }

    navigate("/");
  };
  const responseErrorGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <div className="mb-6 flex mt-12 justify-center font-semibold text-lg">
        เข้าสู่ระบบ
      </div>
      {role === "customer" && (
        <>
          <div className="mb-6 flex justify-center w-full sm:w-full md:w-full lg:w-full text-white bg-[#4267B2] hover:bg-[#375797] font-medium rounded-lg text-sm   px-5 py-2.5">
            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              textButton="เข้าสู่ระบบด้วยเฟซบุ๊ก"
            />
          </div>
          <div className="mb-6 flex justify-center  ">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_ID}`}
              render={renderProps => (
                <button onClick={renderProps.onClick} className="border border-gray-400 hover:bg-gray-200 w-full px-5 py-2 rounded-lg" style={{fontSize:"14px" }}>เข้าสู่ระบบด้วย Google</button>
              )}
              buttonText="เข้าสู่ระบบด้วย Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
              className="w-full"
            />
            
          </div>
          <div>
            <a className=" flex justify-center w-full text-gray-500 text-sm">
              หรือเข้าสู่ระบบด้วย
            </a>
          </div>
        </>
      )}
      <form onSubmit={loginSubmit}>
        <div className="mb-6">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="username"
              value={infoLogin.username}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              value={infoLogin.password}
              onChange={onChangeInput}
              required
            />
          </div>
        </div>
       {role !== "admin" && <div className=" mb-6">
          <div className="flex justify-center text-sm">
            <a>สมาชิกใหม่? </a>
            <a
              href={
                role === "customer" ? "/customer/register" : "/partner/register"
              }
              className="ml-2 text-blue-700 font-medium hover:text-blue-800"
            >
              สมัครสมาชิก
            </a>
          </div>
         
        </div>}
        <button
          type="submit"
          className="w-full sm:w-full md:w-full lg:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
});

export default Login;
