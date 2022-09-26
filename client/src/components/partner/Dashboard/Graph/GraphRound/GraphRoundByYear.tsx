import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getToken } from "../../../../../services/authorize";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type Resualt = {
  _id: number
  count:number
};
const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "x-access-token": getToken() },
    })
    .then((res) => res.data);

function GraphRoundByYear() {
    const {
        data: countReservPerYear,
        error: errorReservPerYear,
        isValidating: loadingReservPerYear,
      } = useSWR(
        `${process.env.REACT_APP_API_REPORT}/partner/get-count-round-reserv-per-year`,
        fetcher
      );
      if (errorReservPerYear) return <div>failed to load</div>;
      if (loadingReservPerYear) {
        return <div>Loading...</div>;
      }
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
    
            suggestedMax: 100,
            ticks: {
              // forces step size to be 50 units
              stepSize: 10,
            },
          },
        },
      } as const;
    
      const labels = [];
      const datas = [];
      const sortLabelsYear = countReservPerYear
      .slice()
      .sort((a: Resualt, b: Resualt) => a._id - b._id);
    
      for (const count of sortLabelsYear) {
        labels.push(`ปี ${count._id}`);
        datas.push(count.count);
      }

    console.log(datas);
    
      const data = {
        labels,
        datasets: [
          {
            label: "จำนวนการจอง / ปี",
            data: datas,
            backgroundColor: "#6295EF",
          },
        ],
      };
  return (
    <div className="w-full">
    <Bar options={options} data={data} />
  </div>
  )
}

export default GraphRoundByYear