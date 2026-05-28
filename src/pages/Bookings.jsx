import { useEffect, useState } from "react";
import {
  getBookings,
  approveBooking,
  rejectBooking,
} from "../services/api";

import toast from "react-hot-toast";

import {
  Check,
  X,
  Eye,
  Search,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  BadgeCheck,
} from "lucide-react";

const successApproved = () => {
  toast.success(
    "Booking has been confirmed 🎉"
  );
};

const successRejected = () => {
  toast.success(
    "Booking has been rejected ❌"
  );
};

const Bookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  // ✅ FILTER + SEARCH
  const filteredBookings =
    bookings.filter((booking) => {

      const matchesFilter =
        filter === "all"
          ? true
          : booking.status ===
          filter;

      const matchesSearch =

        booking.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        booking.tour_title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        booking.phone?.includes(
          search
        );

      return (
        matchesFilter &&
        matchesSearch
      );

    });

  // ✅ FETCH BOOKINGS
  const fetchBookings =
    async () => {

      try {

        const res =
          await getBookings();

        setBookings(res.data);

      } catch (err) {

        console.error(err);

        toast.error(
          "Database disconnected!"
        );

      }

    };

  useEffect(() => {

    const loadBookings = async () => {
      await fetchBookings();
    };

    loadBookings();

  }, []);

  // ✅ APPROVE
  const handleConfirm =
    async (id) => {

      try {

        await approveBooking(id);

        fetchBookings();

        successApproved();

      } catch (err) {

        console.error(err);

        toast.error(
          "Something went wrong!"
        );

      }

    };

  // ✅ REJECT
  const handleCancel =
    async (id) => {

      const confirmAction =
        window.confirm(
          "Reject this booking?"
        );

      if (!confirmAction)
        return;

      try {

        await rejectBooking(id);

        fetchBookings();

        successRejected();

      } catch (err) {

        console.error(err);

        toast.error(
          "Something went wrong!"
        );

      }

    };

  // ✅ REVENUE
  const totalRevenue =
    bookings
      .filter(
        (b) =>
          b.payment_status ===
          "paid"
      )
      .reduce(
        (sum, b) =>
          sum +
          Number(
            b.total_price
          ),
        0
      );

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Bookings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer bookings
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
            placeholder="Search bookings..."
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

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {
                  bookings.length
                }
              </h2>

            </div>

            <CalendarDays
              className="text-sky-500"
            />

          </div>

        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Approved
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  bookings.filter(
                    (b) =>
                      b.status ===
                      "approved"
                  ).length
                }

              </h2>

            </div>

            <BadgeCheck
              className="text-green-500"
            />

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  bookings.filter(
                    (b) =>
                      b.status ===
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

        {/* REVENUE */}
        <div className="bg-white rounded-2xl shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-1">
                $
                {totalRevenue}
              </h2>

            </div>

            <CircleDollarSign
              className="text-emerald-500"
            />

          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">

        {[
          "all",
          "approved",
          "Pending",
          "rejected",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`px-5 py-2 rounded-full transition font-medium capitalize

            ${filter === item

                ? "bg-sky-500 text-white shadow"

                : "bg-white hover:bg-slate-100 text-gray-600"
              }`}
          >

            {item}

          </button>

        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">

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
                  Booking Date
                </th>

                <th className="text-left">
                  Phone
                </th>

                <th className="text-left">
                  Travel Date
                </th>

                <th className="text-left">
                  Total
                </th>

                <th className="text-center">
                  Status
                </th>

                <th className="text-center">
                  Payment
                </th>

                <th className="text-center">
                  View
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filteredBookings.map(
                (b) => (

                  <tr
                    key={b.booking_id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4 font-semibold text-slate-700">
                      #
                      {b.booking_id}
                    </td>

                    <td className="font-medium">
                      {
                        b.full_name
                      }
                    </td>

                    <td>
                      {
                        b.tour_title
                      }
                    </td>

                    <td>

                      {new Date(
                        b.booking_date
                      ).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </td>

                    <td>
                      {b.phone}
                    </td>

                    <td>

                      {new Date(
                        b.travel_date
                      ).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </td>

                    <td className="font-semibold">
                      $
                      {
                        b.total_price
                      }
                    </td>

                    {/* STATUS */}
                    <td className="text-center">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium

                        ${b.status ===
                            "approved"

                            ? "bg-green-100 text-green-600"

                            : b.status ===
                              "rejected"

                              ? "bg-red-100 text-red-500"

                              : "bg-yellow-100 text-yellow-600"
                          }`}
                      >

                        {b.status}

                      </span>

                    </td>

                    {/* PAYMENT */}
                    <td className="text-center">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium

                        ${b.payment_status ===
                            "paid"

                            ? "bg-green-100 text-green-600"

                            : b.payment_status ===
                              "failed"

                              ? "bg-red-100 text-red-500"

                              : "bg-yellow-100 text-yellow-600"
                          }`}
                      >

                        {
                          b.payment_status
                        }

                      </span>

                    </td>

                    {/* VIEW */}
                    <td className="text-center">

                      <button
                        className="hover:text-sky-500 transition"
                      >

                        <Eye
                          size={18}
                        />

                      </button>

                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="flex justify-center gap-2">

                        {/* APPROVE */}
                        <button
                          onClick={() =>
                            handleConfirm(
                              b.booking_id
                            )
                          }
                          className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg transition"
                        >

                          <Check
                            size={18}
                          />

                        </button>

                        {/* REJECT */}
                        <button
                          onClick={() =>
                            handleCancel(
                              b.booking_id
                            )
                          }
                          className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-lg transition"
                        >

                          <X
                            size={18}
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default Bookings;