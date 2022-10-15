import React from "react";
import axios from "axios";
import useSWR from "swr";

type Partner = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPass: string;
  restaurantName?: string;
  address?: string;
};
type Round = {
  start: string;
  end: string;
};
type Openday = {
  type: string;
  start?: string;
  end?: string;
};
type OpenDayInfo = {
  monday: Openday;
  tuesday: Openday;
  wednesday: Openday;
  thursday: Openday;
  friday: Openday;
  saturday: Openday;
  sunday: Openday;
};

type Info = {
  _id: string;
  partner_id: string;
  description: string;
  contact: string;
  address: string;
  image: string;
  type_rest: string;
  time_length?: string;
  rounds?: Round[];
  openday: OpenDayInfo;
  information: Partner;
};

type Value = {
  value: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function ShowAllRes(props: Value) {
  const { value } = props;
  const {
    data: allInfo,
    error: error,
    isValidating: loading,
  } = useSWR(`${process.env.REACT_APP_API_PARTNER}/get-all-info`, fetcher);

  if (error) return <div>failed to load</div>;
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-10">
          {allInfo
            .filter((info: Info) => {
            return  info.information.restaurantName?.includes(value);
            })
            .map((info: Info) => {
              return (
                <a
                  key={info._id}
                  href={`restaurant/${info.partner_id}`}
                  className="group bg-white  shadow-lg border pb-2 border-gray-300 rounded-lg"
                >
                  <div className="w-full h-48 aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={`http://localhost:5500/uploads/${info.image}`}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-2 pl-2 text-base font-semibold p-3 text-gray-700">
                    {`ร้าน${info.information.restaurantName}`}
                  </h3>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ShowAllRes;
