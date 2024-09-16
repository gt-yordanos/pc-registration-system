// src/components/Dashboard.jsx
import React from 'react';
import BarChart from '../component/chart/BarChart';
import PieChart from '../component/chart/PieChart';

const Dashboard = () => {
  // Data for the charts
  const barData1 = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barData2 = {
    labels: ['June', 'July', 'August', 'September', 'October'],
    datasets: [
      {
        label: 'Sales 2024',
        data: [75, 69, 90, 71, 66],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData1 = {
    labels: ['Electronics', 'Furniture', 'Grocery', 'Clothing', 'Accessories'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData2 = {
    labels: ['Online', 'In-Store'],
    datasets: [
      {
        data: [200, 300],
        backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Sales Data 2023</h2>
          <BarChart data={barData1} options={options} />
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Sales Data 2024</h2>
          <BarChart data={barData2} options={options} />
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Product Category Distribution</h2>
          <PieChart data={pieData1} />
        </div>
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Sales Channel Distribution</h2>
          <PieChart data={pieData2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
