import {
  useEffect,
  useState,
} from "react";

import {
  getPayments,
} from "../services/api";

import {
  Search,
  CircleDollarSign,
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
} from "lucide-react";

const Payments = () => {

  const [payments, setPayments] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  // ✅ FETCH PAYMENTS
  const fetchPayments =
    async () => {

      try {

        const res =
          await getPayments();

          setPayments(
            res.data
          );

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {
    const loadPayments =async ()=>{
        await fetchPayments();
    }
    loadPayments();

  }, []);

  // ✅ FILTER
  const filteredPayments =
    payments.filter((p) => {

      const matchesFilter =
        filter === "all"
          ? true
          : p.payment_status ===
            filter;

      const matchesSearch =

        p.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        String(
          p.booking_id
        ).includes(search);

      return (
        matchesFilter &&
        matchesSearch
      );

    });

  // ✅ TOTAL REVENUE
  const totalRevenue =
    payments
      .filter(
        (p) =>
          p.payment_status ===
          "paid"
      )
      .reduce(
        (sum, p) =>
          sum +
          Number(
            p.amount
          ),
        0
      );

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Payments
          </h1>

          <p className="text-gray-500 mt-1">
            Manage payment records
          </p>

        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-80">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* REVENUE */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-1">
                $
                {totalRevenue.toLocaleString()}
              </h2>

            </div>

            <CircleDollarSign
              className="text-emerald-500"
            />

          </div>

        </div>

        {/* PAID */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Paid
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  payments.filter(
                    (p) =>
                      p.payment_status ===
                      "paid"
                  ).length
                }

              </h2>

            </div>

            <CheckCircle2
              className="text-green-500"
            />

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  payments.filter(
                    (p) =>
                      p.payment_status ===
                      "Pending"
                  ).length
                }

              </h2>

            </div>

            <Clock3
              className="text-yellow-500"
            />

          </div>

        </div>

        {/* FAILED */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Failed
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  payments.filter(
                    (p) =>
                      p.payment_status ===
                      "failed"
                  ).length
                }

              </h2>

            </div>

            <XCircle
              className="text-red-500"
            />

          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">

        {[
          "all",
          "paid",
          "Pending",
          "failed",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`px-5 py-2 rounded-full transition font-medium capitalize

            ${
              filter === item

                ? "bg-sky-500 text-white shadow"

                : "bg-white hover:bg-slate-100 text-gray-600"
            }`}
          >

            {item}

          </button>

        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* HEAD */}
            <thead className="bg-slate-100 text-slate-600 text-sm">

              <tr>

                <th className="p-4 text-left">
                  REF
                </th>

                <th className="text-left">
                  Customer
                </th>

                <th className="text-left">
                  Tour
                </th>

                <th className="text-left">
                  Amount
                </th>

                <th className="text-left">
                  Method
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Date
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filteredPayments.map(
                (p) => (

                <tr
                  key={p.payments_id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    #
                    {p.payments_id}
                  </td>

                  <td>
                    {p.full_name}
                  </td>

                  <td>
                    {p.tour_title}
                  </td>

                  <td className="font-semibold">
                    $
                    {p.amount}
                  </td>

                  <td>

                    <span className="flex items-center gap-2">

                      <CreditCard
                        size={16}
                        className="text-sky-500"
                      />

                      {
                        p.payment_method
                      }

                    </span>

                  </td>

                  {/* STATUS */}
                  <td>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium

                      ${
                        p.payment_status ===
                        "paid"

                          ? "bg-green-100 text-green-600"

                          : p.payment_status ===
                            "failed"

                          ? "bg-red-100 text-red-500"

                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >

                      {
                        p.payment_status
                      }

                    </span>

                  </td>

                  {/* DATE */}
                  <td>

                    {new Date(
                      p.payment_date
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

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

export default Payments;