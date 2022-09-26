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
  _id: {
    year: number;
    month: number;
  };
  count:number
};
function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}
const startYear = new Date().getFullYear();
const years1 = Array.from(new Array(10), (val, index) => index + startYear);
const years2 = Array.from(new Array(10), (val, index) => startYear - index);
const selectYear = years1.concat(
  years2.filter((item) => years1.indexOf(item) < 0)
);
const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { "x-access-token": getToken() },
    })
    .then((res) => res.data);

function GraphRoundByMonth() {
  return (
    <div>GraphRoundByMonth</div>
  )
}

export default GraphRoundByMonth