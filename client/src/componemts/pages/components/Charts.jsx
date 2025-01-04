import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Charts = ({ templateDownloadData, monthlyDownloadData }) => {
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Month" },
      },
      y: {
        title: { display: true, text: "Downloads" },
      },
    },
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Template Downloads
        </h3>
        <Pie data={templateDownloadData} options={chartOptions} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Monthly Downloads
        </h3>
        <Bar data={monthlyDownloadData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default Charts;
