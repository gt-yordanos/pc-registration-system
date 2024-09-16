// src/components/Dashboard.jsx
import React from 'react';
import BarChart from '../component/chart/BarChart';
import PieChart from '../component/chart/PieChart';
import InfoCard from '../component/cards/dashbord-cards/InfoCard';

const Dashboard = () => {
  // Data for the charts
  const barData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total admin register',
        data: [2, 3, 6, 5, 8, 3, 1, 4, 2, 5, 6, 4],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const barData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total PC registration of the year',
        data: [75, 69, 90, 71, 66, 45, 23, 67, 89, 24, 2, 13],
        backgroundColor: '#22C55E',
      },
    ],
  };

  const pieData1 = {
    labels: ['Females', 'Males'],
    datasets: [
      {
        data: [3, 15],
        backgroundColor: ['#6366F1', '#FBBF24'],
      },
    ],
  };

  const pieData2 = {
    labels: ['In', 'Out'],
    datasets: [
      {
        data: [200, 300],
        backgroundColor: ['#F87171', '#34D399'],
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

  // Calculate totals and recent numbers
  const totalAdminRegistrations = barData1.datasets[0].data.reduce((a, b) => a + b, 0);
  const recentAdminRegistrations = barData1.datasets[0].data.slice(-1)[0];

  const totalPCRegistrations = barData2.datasets[0].data.reduce((a, b) => a + b, 0);
  const recentPCRegistrations = barData2.datasets[0].data.slice(-1)[0];

  const totalFemalesAndMales = pieData1.datasets[0].data.reduce((a, b) => a + b, 0);
  const totalInAndOut = pieData2.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: '#001F3D', color:'CCFFFF' }}>
    <h1 className="text-2xl font-bold mb-4" style={{ color: '#CCFFFF' }}>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Container 1 for InfoCards */}
        <div className="bg-[#1c4a72] p-4 rounded-md shadow-md">
          <div className="mb-4"> {/* 15px margin bottom */}
            <InfoCard title="Total Admin Registrations" value={totalAdminRegistrations} />
          </div>
          <div className="mb-4"> {/* 15px margin bottom */}
            <InfoCard title="Recent Admin Registrations" value={recentAdminRegistrations} />
          </div>
          <div className="mb-4"> {/* 15px margin bottom */}
            <InfoCard title="Total Females and Males" value={totalFemalesAndMales} />
          </div>
          <div className="mb-4"> {/* 15px margin bottom */}
            <InfoCard title="Total In and Out" value={totalInAndOut} />
          </div>
        </div>
        {/* Container 2 for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[white] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Admin Registrations</h2>
            <BarChart data={barData1} options={options} />
          </div>
          <div className="p-4 bg-[white] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">PC Registrations</h2>
            <BarChart data={barData2} options={options} />
          </div>
          <div className="p-4 bg-[white] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Gender Distribution of admin</h2>
            <PieChart data={pieData1} />
          </div>
          <div className="p-4 bg-[white] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">In and Out Distribution of pc</h2>
            <PieChart data={pieData2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
