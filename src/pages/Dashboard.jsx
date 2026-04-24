import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layouts/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const date = new Date();
const year = date.getFullYear();
const month =  date.toLocaleString('default', { month: 'long' });  // Months are 0-indexed
const day = String(date.getDate()).padStart(2, '0');

const formattedDate = `${day} ${month},${year}`;
  //Fetch States
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!stats) return <div className="animate-pulse h-20 bg-gray-200 rounded-xl text-center">Loading dashboard...</div>;

  const pieData = stats.statusStats.map((item) => ({
    name: item.status,
    value: parseInt(item.count)
  }));
  
  return (
    <div>

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold font-serif ">Dashboard Overview</h1>
          <p className="rounded-xl p-2 shadow text-gray-500 font-mono">📅 {formattedDate}</p>
      </div>
      <p className="text-gray-600 mb-6">Welcome back here what's happening</p>
      {/* 🔢 Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6 ">
        <div className="bg-white p-5 rounded-xl shadow">
          <p>📋TOTAL BOOKING</p>
          <h2 className="text-2xl font-bold">{stats.totalBookings}</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p>🗺️ACTIVE TOURS</p>
          <h2 className="text-2xl font-bold">{stats.totalTour}</h2>
        </div>


        <div className="bg-white p-5 rounded-xl shadow">
          <p>💰TOTAL REVENUE</p>
          <h2 className="text-2xl font-bold">${stats.totalRevenue}</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p>⭐AVG RATING</p>
          <h2 className="text-2xl font-bold">${stats.totalRevenue}</h2>
        </div>
      </div>

      {/* 📊 Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Booking Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}
              fill="#B85E09"
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                cx="50%"
                cy="50%"
                fill="#CDB885"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index}
                  
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;