// import Navbar from "../components/navbar";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset, valueFormatter } from "../assets/data";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import {
  MessageCircleWarning,
  Newspaper,
  Users,
} from "lucide-react";
export default function Home() {
  const chartSetting = {
    yAxis: [
    ],
    width: 1000,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const settings = {
    width: 200,
    height: 200,
    value: 60,
  };

  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className=" flex-1 mx-[100px] py-8">
        <Navbar />
        <div>
          <div className=" flex justify-center items-center gap-9 mt-10">
            <div className=" bg-secondary text-main py-8 px-24 ">
              <div className=" flex gap-3 items-center">
                <Newspaper className={`w-10 h-10`} />
                <h3 className=" text-main text-2xl font-semibold">Articles</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">3333</p>
            </div>
            <div className=" bg-secondary text-main py-8 px-24 ">
              <div className=" flex gap-3 items-center">
                <MessageCircleWarning className={`w-10 h-10`} />
                <h3 className=" text-main text-2xl font-semibold">Reports</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">3333</p>
            </div>
            <div className=" bg-secondary text-main py-8 px-24 ">
              <div className=" flex gap-3 items-center">
                <Users className={`w-10 h-10`} />
                <h3 className=" text-main text-2xl font-semibold">Users</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">3333</p>
            </div>
          </div>
          <div className=" shadow-xl py-4 mt-4">
            <h3 className=" text-2xl font-bold mx-4">Articles </h3>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "byUsers", label: "by users", valueFormatter ,  color: '#005F6A'},
                { dataKey: "byAdmin", label: "by admin", valueFormatter  ,  color: '#fff'},
              ]}
              {...chartSetting}
            />
          </div>
          <div className=" shadow-xl py-5 px-6 mt-5 w-fit">
            <h3 className=" text-2xl font-bold mx-4">Users </h3>
            <Gauge
              {...settings}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#005F6A",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
            />
            <div className = " flex justify-between gap-4">
                <div>
                    <h3>Vistors</h3>
                    <p className = " flex items-center text-black/50 gap-2"><p className = "bg-main  w-2 h-2 rounded-full"> </p> 1000</p>
                </div>
                <div>
                    <h3>Registered</h3>
                    <p className = " flex items-center text-black/50 gap-2"><p className = "bg-secondary  w-2 h-2 rounded-full"> </p> 1000</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
