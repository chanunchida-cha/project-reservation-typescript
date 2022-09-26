import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function GraphCreateInfoPercen() {
  const {
    data: countRestInfo,
    error: errorRestInfo,
    isValidating: loadingRestInfo,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-rest-info`,
    fetcher
  );
  const {
    data: countPartner,
    error: errorPartner,
    isValidating: loadingPartner,
  } = useSWR(
    `${process.env.REACT_APP_API_REPORT}/admin/get-count-partner`,
    fetcher
  );
  if (errorRestInfo || errorPartner) return <div>failed to load</div>;
  if (loadingRestInfo || loadingPartner) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: [
      `${((countRestInfo.count * 100) / countPartner.count).toFixed(2)}%`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          ((countRestInfo.count * 100) / countPartner.count).toFixed(2),
          (100 - (countRestInfo.count * 100) / countPartner.count).toFixed(2),
        ],
        backgroundColor: ["#6295EF", "#EEEEEE"],

        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-1/3">
      <Doughnut data={data} />
    </div>
  );
}

export default GraphCreateInfoPercen;
