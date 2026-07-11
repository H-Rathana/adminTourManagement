import { useEffect, useState } from "react";
import API from "../services/api";
import { exportReportPDF } from "../utils/exportReport";
import {
  DollarSign,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Trophy,
  CalendarDays,
  CalendarRange,
  TrendingUp,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";

const Reports = () => {
    const [report, setReport] = useState(null);
    const [period, setPeriod] = useState("week");
    const fetchReport = async () => {
        try {
            const res = await API.get("/reports");
            setReport(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const chartData =
  report?.monthlyBookings?.map(
    item => ({
      ...item,
      bookings: Number(item.bookings)
    })
  ) || [];
    useEffect(() => {
        const loadReport = async () => {
      await fetchReport();
    };
        loadReport();
    }, []);

    if (!report) {
        return (
            <div className="text-center py-20">
                Loading Reports...
            </div>
        );
    }
    const revenue =
  period === "week"
    ? report?.revenueWeek
    : period === "month"
    ? report?.revenueMonth
    : report?.revenueYear;

    const topTour =
  period === "week"
    ? report?.topTourWeek
    : period === "month"
    ? report?.topTourMonth
    : report?.topTourYear;

    const topTours =
  period === "week"
    ? report?.topToursWeek
    : period === "month"
    ? report?.topToursMonth
    : report?.topToursYear;

    const bookingStats =
  period === "week"
    ? report?.week
    : period === "month"
    ? report?.month
    : report?.year;

    const periodLabel =
  period === "week"
    ? "This Week"
    : period === "month"
    ? "This Month"
    : "This Year";

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-4xl font-bold">
                        Reports
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Business performance overview
                    </p>
                </div>

                <button
                    className="
                            flex items-center gap-2
                            bg-sky-600
                            hover:bg-sky-700
                            text-white
                            px-5 py-3
                            rounded-xl
                    "
                    onClick={() =>
                        exportReportPDF(report, period)
                    }
                >
                    <FileText size={18} />
                    Export PDF
                </button>

            </div>
            <div className="flex gap-3 mb-8">

                    {[
                        {
                        key: "week",
                        label: "This Week",
                        },
                        {
                        key: "month",
                        label: "This Month",
                        },
                        {
                        key: "year",
                        label: "This Year",
                        },
                    ].map((item) => (

                        <button
                        key={item.key}
                        onClick={() => setPeriod(item.key)}
                        className={`
                            px-6 py-3 rounded-xl font-medium transition

                            ${
                            period === item.key
                                ? "bg-sky-500 text-white shadow-lg"
                                : "bg-white hover:bg-slate-100"
                            }
                        `}
                        >
                        {item.label}
                        </button>

                    ))}

            </div>
            {/* Statistics */}
            <div className="grid lg:grid-cols-5 gap-5">

                {/* <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <DollarSign
                        className="text-green-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                        Revenue
                    </p>

                    <h2 className="text-3xl font-bold">
                        ${report.totalRevenue}
                    </h2>
                </div> */}

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <BookOpen
                        className="text-sky-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                         Bookings ({periodLabel})
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bookingStats?.bookings || 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <CheckCircle
                        className="text-green-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                        Approved
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bookingStats?.approved || 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <Clock
                        className="text-sky-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                        Completed
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bookingStats?.completed || 0}
                    </h2>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <Clock
                        className="text-yellow-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bookingStats?.pending || 0}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <XCircle
                        className="text-red-500 mb-3"
                        size={28}
                    />

                    <p className="text-gray-500">
                        Rejected
                    </p>

                    <h2 className="text-3xl font-bold">
                        {bookingStats?.rejected || 0}
                    </h2>
                </div>

            </div>
            <div className="grid lg:grid-cols-2 gap-5 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <TrendingUp
                        size={32}
                        className="text-green-500 mb-3"
                    />

                    <p className="text-gray-500">
                        Revenue (
                        {period.charAt(0).toUpperCase() +
                        period.slice(1)}
                        )
                    </p>

                    <h2 className="text-3xl font-bold text-green-600">
                        ${revenue}
                    </h2>

                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <Trophy
                        size={32}
                        className="text-yellow-500 mb-3"
                    />

                    <p className="text-gray-500">
                        Top Tour (
                        {period.charAt(0).toUpperCase() +
                        period.slice(1)}
                        )
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {topTour?.title || "No Data"}
                    </h2>

                    <p className="text-gray-500">
                        {topTour?.bookings || 0} Bookings
                    </p>

                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow mt-8"> 
                <h2 className="font-semibold text-lg mb-2">
                    Top 5 Most Booked Tours
                    </h2>

                    <p className="text-gray-500 mb-4">
                    {period === "week"
                        ? "This Week"
                        : period === "month"
                        ? "This Month"
                        : "This Year"}
                </p>
                <ResponsiveContainer width="100%" height={350} > 
                    <BarChart data={topTours} > 
                        <CartesianGrid strokeDasharray="3 3" /> 
                        <XAxis dataKey="title" /> <YAxis /> 
                        <Tooltip /> 
                        <Bar  
                        dataKey="bookings"
                        fill="#14B8A6"
                        radius={[10, 10, 0, 0]}
                        /> 
                    </BarChart> 
                    </ResponsiveContainer> </div>
           <div className="bg-white p-8 rounded-3xl shadow-sm mt-8">

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                        Monthly Bookings
                        </h2>

                        <p className="text-gray-500 mt-1">
                        Booking performance over time
                        </p>

                    </div>

                    <ResponsiveContainer
                        width="100%"
                        height={400}
                    >

                        <AreaChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >

                        <defs>

                            <linearGradient
                            id="bookingGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                            >

                            <stop
                                offset="5%"
                                stopColor="#0ea5e9"
                                stopOpacity={0.4}
                            />

                            <stop
                                offset="95%"
                                stopColor="#0ea5e9"
                                stopOpacity={0}
                            />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                            fontSize: 12,
                            }}
                        />

                        <YAxis
                            allowDecimals={false}
                        />

                        <Tooltip
                            contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.1)",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="bookings"
                            stroke="#0ea5e9"
                            fill="url(#bookingGradient)"
                        />

                        <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#0284c7"
                            strokeWidth={4}
                            dot={{
                            r: 6,
                            }}
                            activeDot={{
                            r: 8,
                            }}
                        />

                        </AreaChart>

                    </ResponsiveContainer>

                    </div>
            <div className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-slate-100
                overflow-hidden
                ">

               <div className="p-6 border-b">

                    <h2 className="font-bold text-xl">
                        Recent Transactions
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Latest customer payments
                    </p>

                </div>

                <table className="w-full">

                <thead>

                <tr className="bg-slate-50">

                <th className="p-4 text-left">
                REF
                </th>

                <th className="p-4 text-left">
                Customer
                </th>

                <th className="p-4 text-left">
                Amount
                </th>

                <th className="p-4 text-left">
                Status
                </th>

                <th className="p-4 text-left">
                Date
                </th>

                </tr>

                </thead>

                <tbody>

                {report.recentTransactions?.map(
                (item)=>(
                <tr
                key={item.booking_id}
                className="
                border-b
                hover:bg-slate-50
                transition
                "
                >

                <td className="p-4 font-semibold">
                #{item.booking_id}
                </td>

                <td className="p-4">
                {item.full_name}
                </td>

                <td className="p-4 font-semibold text-green-600">
                ${item.amount}
                </td>

                <td className="p-4">

                <span
                className={`
                px-3 py-1 rounded-full text-sm

                ${item.payment_status === "paid"
                ? "bg-green-100 text-green-700"
                : item.payment_status === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
                }
                `}
                >
                {item.payment_status}
                </span>

                </td>

                <td className="p-4 text-gray-500">
                {new Date(
                item.payment_date
                ).toLocaleDateString()}
                </td>

                </tr>
                ))
                }

                </tbody>

                </table>

                </div>
        </div>
    );
};

export default Reports;