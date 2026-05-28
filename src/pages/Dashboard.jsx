import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  CalendarDays,
  BookCheck,
  Map,
  Wallet,
  Star,
} from "lucide-react";

const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  // ✅ CURRENT DATE
  const date = new Date();

  const year =
    date.getFullYear();

  const month =
    date.toLocaleString(
      "default",
      { month: "long" }
    );

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  const formattedDate =
    `${day} ${month}, ${year}`;

  // ✅ FETCH DASHBOARD DATA
  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const res =
            await API.get(
              "/dashboard/stats"
            );

          setStats(
            res.data
          );

        } catch (err) {

          console.error(err);

        }

      };

    fetchData();

  }, []);

  // ✅ LOADING
  if (!stats) {

    return (

      <div className="
        animate-pulse
        h-40
        bg-gray-200
        rounded-2xl
      ">

      </div>

    );

  }

  // ✅ PIE DATA
  const pieData =
    stats.statusStats.map(
      (item) => ({

        name:
          item.status,

        value:
          parseInt(
            item.count
          ),

      })
    );

  // ✅ COLORS
  const COLORS = [
    "#0ea5e9",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];
  
  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="
            text-4xl
            font-bold
            text-slate-800
          ">
            Dashboard Overview
          </h1>

          <p className="
            text-gray-500
            mt-1
          ">
            Welcome back 👋
            Here's what's happening today
          </p>

        </div>

        {/* DATE */}
        <div className="
          bg-white
          shadow-sm
          border
          rounded-2xl
          px-5
          py-3
          flex
          items-center
          gap-3
        ">

          <CalendarDays
            className="
              text-sky-500
            "
          />

          <p className="
            text-gray-500
            font-medium
          ">
            {formattedDate}
          </p>

        </div>

      </div>

      {/* STATS CARDS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        {/* BOOKINGS */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
          hover:shadow-md
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Total Bookings
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
              ">
                {stats.totalBookings}
              </h2>

            </div>

            <div className="
              bg-sky-100
              p-4
              rounded-2xl
            ">

              <BookCheck
                className="
                  text-sky-600
                "
              />

            </div>

          </div>

        </div>

        {/* TOURS */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
          hover:shadow-md
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Active Tours
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
              ">
                {stats.totalTour}
              </h2>

            </div>

            <div className="
              bg-emerald-100
              p-4
              rounded-2xl
            ">

              <Map
                className="
                  text-emerald-600
                "
              />

            </div>

          </div>

        </div>

        {/* REVENUE */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
          hover:shadow-md
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Revenue
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
              ">
                ${Number(stats.totalRevenue).toLocaleString()}
              </h2>

            </div>

            <div className="
              bg-yellow-100
              p-4
              rounded-2xl
            ">

              <Wallet
                className="
                  text-yellow-600
                "
              />

            </div>

          </div>

        </div>

        {/* RATING */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
          hover:shadow-md
          transition
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                text-gray-500
                text-sm
              ">
                Avg Rating
              </p>

              <h2 className="
                text-3xl
                font-bold
                mt-2
              ">
                4.8
              </h2>

            </div>

            <div className="
              bg-pink-100
              p-4
              rounded-2xl
            ">

              <Star
                className="
                  text-pink-600
                "
              />

            </div>

          </div>

        </div>

      </div>

      {/* CHARTS */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        {/* LINE CHART */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
        ">

          <h3 className="
            text-xl
            font-semibold
            mb-5
          ">
            Monthly Bookings
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart
              data={
                stats.monthlyBookings
              }
            >

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#0ea5e9"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}
        <div className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
        ">

          <h3 className="
            text-xl
            font-semibold
            mb-5
          ">
            Booking Status
          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {pieData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="
        bg-white
        p-6
        rounded-2xl
        shadow-sm
        border
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <h3 className="
            text-xl
            font-semibold
          ">
            Recent Bookings
          </h3>

        </div>

        <div className="
          overflow-x-auto
        ">

          <table className="
            w-full
          ">

            <thead>

              <tr className="
                border-b
                text-left
                text-gray-500
              ">

                <th className="pb-4">
                  Customer
                </th>

                <th className="pb-4">
                  Tour
                </th>

                <th className="pb-4">
                  Travelers
                </th>

                <th className="pb-4">
                  Amount
                </th>

                <th className="pb-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.recentBookings?.map(
                (booking) => (

                <tr
                  key={
                    booking.booking_id
                  }
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="
                    py-4
                    font-medium
                  ">
                    {
                      booking.full_name
                    }
                  </td>

                  <td>
                    {
                      booking.tour_title
                    }
                  </td>

                  <td>
                    {
                      booking.people_count
                    }
                  </td>

                  <td>
                    $
                    {
                      booking.total_price
                    }
                  </td>

                  <td>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium

                        ${
                          booking.status ===
                          "approved"

                          ? "bg-green-100 text-green-700"

                          : booking.status ===
                            "Pending"

                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"
                        }
                      `}
                    >

                      {
                        booking.status
                      }

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

};

export default Dashboard;