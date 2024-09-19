import React from 'react';
import BarChart from '../Components/Dashboard/BarChart';
import PieChart from '../Components/Dashboard/PieChart';
import InfoCard from '../Components/Dashboard/InfoCard';

const Dashboard = () => {
  // Data for the charts
  const barData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total Admin Registrations',
        data: [2, 3, 6, 5, 8, 3, 1, 4, 2, 5, 6, 4],
        backgroundColor: '#e2ad00e1',
      },
    ],
  };

  const barData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total PC Registrations of the Year',
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
  const totalPCRegistrations = barData2.datasets[0].data.reduce((a, b) => a + b, 0);
  const recentPCRegistrations = barData2.datasets[0].data.slice(-1)[0];

  const totalFemalesAndMales = pieData1.datasets[0].data.reduce((a, b) => a + b, 0);
  const totalInAndOut = pieData2.datasets[0].data.reduce((a, b) => a + b, 0);

  // Additional insights
  const totalPCsAvailable = 500; // Example value
  const totalPCsInUse = totalInAndOut; // Use total In/Out as a proxy
  const totalAdminUsers = 18; // Example value
  const recentRegistrationsThisWeek = 5; // Example value

  return (
    <div className="p-4 w-full h-full" style={{ backgroundColor: '#001F3D', color: '#CCFFFF' }}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#CCFFFF' }}>Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 custom:grid-cols-[55%,45%] gap-4 mb-4" style={{ color: '#CCFFFF' }}>
        {/* Container 1 for InfoCards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Bar Chart for Admin Registrations */}
          <div className="p-4 bg-[#00294D] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Admin Registrations Over the Year</h2>
            <BarChart data={barData1} options={options} />
          </div>
          {/* Bar Chart for PC Registrations */}
          <div className="p-4 bg-[#00294D] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">PC Registrations Over the Year</h2>
            <BarChart data={barData2} options={options} />
          </div>
          {/* Pie Charts in the same row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#00294D] rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Admin Gender Distribution</h2>
              <PieChart data={pieData1} color='blue' />
            </div>
            <div className="p-4 bg-[#00294D] rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">PC In/Out Status</h2>
              <PieChart data={pieData2} />
            </div>
          </div>
        </div>

        {/* Container 2 for Charts */}
        <div className="bg-[#1c4a72] p-4 rounded-md shadow-md">
          <div className="mb-4">
            <InfoCard title="Total Admin Registrations" value={totalAdminRegistrations} />
          </div>
          <div className="mb-4">
            <InfoCard title="Total PC Registrations This Month" value={recentPCRegistrations} />
          </div>
          <div className="mb-4">
            <InfoCard title="Total PCs Currently Registered" value={totalPCRegistrations} />
          </div>
          <div className="mb-4">
            <InfoCard title="Total PCs Available" value={totalPCsAvailable} />
          </div>
          <div className="mb-4">
            <InfoCard title="Total PCs In Use" value={totalPCsInUse} />
          </div>
          <div className="mb-4">
            <InfoCard title="Total Admin Users" value={totalAdminUsers} />
          </div>
          <div className="mb-4">
            <InfoCard title="Recent Registrations This Week" value={recentRegistrationsThisWeek} />
          </div>
          <div className="mb-4">
            <InfoCard title="Gender Distribution (Admin)" value={totalFemalesAndMales} />
          </div>
          <div className="mb-4">
            <InfoCard title="PC In/Out Activity" value={totalInAndOut} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
