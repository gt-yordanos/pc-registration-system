import React, { useEffect, useState } from 'react';
import BarChart from '../Components/Dashboard/BarChart';
import PieChart from '../Components/Dashboard/PieChart';
import InfoCard from '../Components/Dashboard/InfoCard';
import axios from 'axios';

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [pcs, setPcs] = useState([]);

  // Initialize chart data
  const [barData1, setBarData1] = useState({
    labels: [
      'January', 'February', 'March', 'April', 'May', 
      'June', 'July', 'August', 'September', 'October', 
      'November', 'December'
    ],
    datasets: [{ label: 'Total Campus Security Registrations ', data: new Array(12).fill(0), backgroundColor: '#e2ad00e1' }],
  });

  const [barData2, setBarData2] = useState({
    labels: [
      'January', 'February', 'March', 'April', 'May', 
      'June', 'July', 'August', 'September', 'October', 
      'November', 'December'
    ],
    datasets: [{ label: 'Total PC Registrations of the Year', data: new Array(12).fill(0), backgroundColor: '#22C55E' }],
  });

  const [pieData1, setPieData1] = useState({
    labels: ['Females', 'Males'],
    datasets: [{ data: [0, 0], backgroundColor: ['#6366F1', '#FBBF24'] }],
  });

  const [pieData2, setPieData2] = useState({
    labels: ['In', 'Out'],
    datasets: [{ data: [0, 0], backgroundColor: ['#F87171', '#34D399'] }],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [adminResponse, pcResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/admins'),
          axios.get('http://127.0.0.1:8000/api/pcs'),
        ]);

        const adminsData = adminResponse.data;
        const pcsData = pcResponse.data;

        setAdmins(adminsData);
        setPcs(pcsData);

        // Update Admin Bar Chart
        const adminChartData = new Array(12).fill(0);
        adminsData.forEach((admin) => {
          const month = new Date(admin.created_at).getMonth();
          adminChartData[month]++;
        });
        setBarData1((prev) => ({
          ...prev,
          datasets: [{ ...prev.datasets[0], data: adminChartData }],
        }));

        // Update PC Bar Chart
        const pcChartData = new Array(12).fill(0);
        pcsData.forEach((pc) => {
          const month = new Date(pc.created_at).getMonth();
          pcChartData[month]++;
        });
        setBarData2((prev) => ({
          ...prev,
          datasets: [{ ...prev.datasets[0], data: pcChartData }],
        }));

        // Update Gender Pie Chart
        const femaleCount = adminsData.filter((admin) => admin.gender === 'Female').length;
        const maleCount = adminsData.filter((admin) => admin.gender === 'Male').length;
        setPieData1((prev) => ({
          ...prev,
          datasets: [{ ...prev.datasets[0], data: [femaleCount, maleCount] }],
        }));

        // Update PC In/Out Pie Chart
        const inCount = pcsData.filter((pc) => pc.status === 'In').length;
        const outCount = pcsData.filter((pc) => pc.status === 'Out').length;
        setPieData2((prev) => ({
          ...prev,
          datasets: [{ ...prev.datasets[0], data: [inCount, outCount] }],
        }));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const totalAdminRegistrations = admins.length;
  const totalPCRegistrations = pcs.length;
  const recentPCRegistrations = pcs.filter(
    (pc) => new Date(pc.created_at).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="p-4 w-full h-full navbar transition-all duration-300">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 custom:grid-cols-[55%,45%] gap-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 rounded-md shadow-md" style={{ border: 'solid var(--text-color) 2px' }}>
            <h2 className="text-lg font-semibold mb-2">Campus Security Registration Over the Year</h2>
            <BarChart data={barData1} />
          </div>
          <div className="p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">PC Registrations Over the Year</h2>
            <BarChart data={barData2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Admin Gender Distribution</h2>
              <PieChart data={pieData1} />
            </div>
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">PC In/Out Status</h2>
              <PieChart data={pieData2} />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-md flex flex-col gap-2" style={{ border: 'solid var(--text-color) 2px' }}>
          <InfoCard title="Total Campus Security Registrations" value={totalAdminRegistrations} />
          <InfoCard title="Total PC Registrations This Month" value={recentPCRegistrations} />
          <InfoCard title="Total PCs Currently Registered" value={totalPCRegistrations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
