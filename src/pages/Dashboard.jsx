import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layouts/Layout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);


  //Fetch States
    useEffect(() => {

    fetchStats();
    }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  if (!stats) return <div className="animate-pulse h-20 bg-gray-200 rounded-xl text-center">Loading dashboard...</div>;

  const pieData = stats.statusStats.map((item) => ({
    name: item.status,
    value: parseInt(item.count)
  }));

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
      {/* 🔢 Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Bookings</p>
          <h2 className="text-2xl font-bold">{stats.totalBookings}</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Tour</p>
          <h2 className="text-2xl font-bold">{stats.totalTour}</h2>
        </div>
        

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Revenue</p>
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
            fill="#8884d8"
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
    </Layout>
  );
};

export default Dashboard;