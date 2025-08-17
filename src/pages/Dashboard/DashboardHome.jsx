import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Helmet } from "react-helmet";

const DashboardHome = () => {
  // Jump to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [pieData, setPieData] = useState([
    ["Publisher", "Articles"],
  ]);

  useEffect(() => {
    fetch("https://b11a12-server-side-naeem240.vercel.app/stats/articles-by-publisher")
      .then(res => res.json())
      .then(data => {
        const chartData = [["Publisher", "Articles"]];
        data.forEach(pub => {
          chartData.push([pub._id, pub.count]);
        });
        setPieData(chartData);
      });
  }, []);

  const pieOptions = {
    title: "Articles by Publisher",
    pieHole: 0.4,
    is3D: true,
  };

  const barData = [
    ["Year", "Users", "Premium Users"],
    ["2023", 400, 100],
    ["2024", 600, 250],
  ];

  const barOptions = {
    chart: {
      title: "User Growth",
    },
  };

  const lineData = [
    ["Month", "Views"],
    ["Jan", 1000],
    ["Feb", 1170],
    ["Mar", 660],
    ["Apr", 1030],
  ];

  const lineOptions = {
    title: "Site Views Over Time",
  };

  return (
    <>
    <Helmet>
      <title>
        Overview || Admin || NewsHub
      </title>
    </Helmet>
      <div className="space-y-10 bg-base-100 md:pl-64">
        <h2 className="text-3xl font-bold mt-10 ml-10">📊 Dashboard Overview</h2>

        <div className="mx-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={pieOptions}
          />

          <Chart
            chartType="Bar"
            width="100%"
            height="300px"
            data={barData}
            options={barOptions}
          />

          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={lineData}
            options={lineOptions}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
