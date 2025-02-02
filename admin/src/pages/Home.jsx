// import Navbar from "../components/navbar";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { valueFormatter } from "../assets/data";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { format } from "date-fns";
import { MessageCircleWarning, Newspaper, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
export default function Home() {
  const [repotrscount, setReportsCount] = useState();
  const [articlesCount, setArticlesCount] = useState();
  const [usersCount, setUsersCount] = useState();
  const [usersData, setUsersData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [articlesDataLastmonth, setArticlesDataLastmonth] = useState([]);
  const [articlesDataLastLast, setArticlesDataLastLast] = useState([]);
  const [articlesDatathisMonth, setArticlesDatathisMonth] = useState([]);
  let [usersId, setUsersId] = useState([]);
  let [month, setMonth] = useState([]);

  const chartSetting = {
    yAxis: [],
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
    value: usersCount,
  };
  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/reports/all-reports", {}).then(
        (response) => {
          response.json().then((data) => {
            setReportsCount(data.numberOfReports);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/users/users", {}).then(
        (response) => {
          response.json().then((data) => {
            setUsersCount(data.numberOfUsers);
            setUsersData(data.data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/articles/articles", {}).then(
        (response) => {
          response.json().then((data) => {
            setArticlesCount(data.numberOfArticles);
            setArticlesDataLastmonth(data.lastMonthCount);
            setArticlesDataLastLast(data.lastLastMonthCount);
            setArticlesDatathisMonth(data.thisMonthCount);
            setArticlesData(data.data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);
  const date = new Date();

  let dataset = [
    {
      byUser: articlesDataLastLast,
      month: new Date(date.getFullYear(), date.getMonth() - 2), // First day of the month two months ago
    },
    {
      byUser: articlesDataLastmonth,
      month: new Date(date.getFullYear(), date.getMonth() - 1),
    },
    {
      byUser: articlesDatathisMonth,
      month: new Date(date.getFullYear(), date.getMonth(), 1),
    },
  ];

  useEffect(() => {
    let userid = [];
    usersData.map((user) => {
      userid.push(user._id);
    });
    setUsersId(userid);
  }, [usersData]);

  useEffect(() => {
    let item = [];
    articlesData.map((article) => {
      item.push(article.createdAt);
    });
    setMonth(item);
  }, [articlesData]);
  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className=" flex-1 ml-80 mx-[100px] py-8">
        <Navbar />
        <div>
          <div className=" flex justify-center items-center gap-6 mt-10">
            <div className=" bg-secondary text-main py-8 px-20 ">
              <div className=" flex gap-3 items-center">
                <Newspaper
                  className={`w-8 h-8 text-white font-bold`}
                  fill="#005f6a"
                />
                <h3 className=" text-main text-2xl font-semibold ">Articles</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">
                {articlesCount}
              </p>
            </div>
            <div className=" bg-secondary text-main py-8 px-20 ">
              <div className=" flex gap-3 items-center">
                <MessageCircleWarning
                  className={`w-8 h-8 text-white font-bold`}
                  fill="#005f6a"
                />
                <h3 className=" text-main text-2xl font-semibold">Reports</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">
                {repotrscount}
              </p>
            </div>
            <div className=" bg-secondary text-main py-8 px-20 ">
              <div className=" flex gap-3 items-center">
                <Users
                  className={`w-8 h-8 text-secondary font-bold`}
                  fill="#005f6a"
                />
                <h3 className=" text-main text-2xl font-semibold">Users</h3>
              </div>
              <p className=" text-center mt-2 text-xl text-black">
                {usersCount}
              </p>
            </div>
          </div>
          <div className="  shadow-xl py-4 mt-4">
            <h3 className=" text-2xl font-bold mx-4">Articles </h3>
            <BarChart
              dataset={dataset}
              className=" max-w-[900px]"
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                {
                  dataKey: "byUser",
                  label: "by users",
                  valueFormatter,
                  color: "#005F6A",
                },
              ]}
              {...chartSetting}
            />
          </div>
          <div className=" shadow-xl py-5 px-6 mt-5 w-fit">
            <h3 className=" text-2xl font-bold ">Users </h3>
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
            <div className=" flex justify-between gap-4">
              {/* <div>
                <h3>Vistors</h3>
                <p className=" flex items-center text-black/50 gap-2">
                  <p className="bg-main  w-2 h-2 rounded-full"> </p> {usersCount}
                </p>
              </div> */}
              <div className=" mx-auto">
                <h3>Registered</h3>
                <p className=" flex items-center justify-center text-black/50 gap-2">
                  <p className="bg-main  w-2 h-2 rounded-full"> </p>
                  <p>{usersCount}</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
