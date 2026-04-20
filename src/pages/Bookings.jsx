import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { getBookings, approveBooking, rejectBooking } from "../services/api";
import toast from "react-hot-toast";



const successApproved = () => {
  toast.success("Booking have been Confirm 🎉");
};
const successRejected = () => {
  toast.success("Booking have been Rejected❌");
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });
  // FETCH
  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Database Disconnected!");
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      await fetchBookings();
    };
    loadBookings();
  }, []);

  // ✅ CONFIRM
  const handleConfirm = async (id) => {
    try {
      await approveBooking(id);
      fetchBookings();
      successApproved();
    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleCancel = async (id) => {
    const confirmAction = window.confirm("Cancel this booking?");
    if (!confirmAction) return;

    try {
      await rejectBooking(id);
      fetchBookings();
      successRejected();
    } catch (err) {
      console.log(err);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="flex gap-10 justify-end p-5">
        <button onClick={() => setFilter("all")} className="btn  ">All</button>
        <button onClick={() => setFilter("approved")} className="btn">Approved</button>
        <button onClick={() => setFilter("pending")} className="btn">Pending</button>
        <button onClick={() => setFilter("rejected")} className="btn">Rejected</button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-300 text-sm text-gray-600">
            <tr>
              <th className="p-4">REF</th>
              <th>Customer</th>
              <th>Tour</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.booking_id} className="border-t hover:bg-gray-200 text-center">
                <td className="p-4">{b.booking_id}</td>

                <td >{b.user_name}</td>

                <td >{b.tour_title}</td>

                <td >{b.booking_date}</td>

                <td>${b.total_price}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${b.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : b.status === "rejected"
                          ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleConfirm(b.booking_id)}
                      className="bg-green-100 hover:bg-green-300 px-2 py-1 rounded">
                      ✔
                    </button>

                    <button
                      onClick={() => handleCancel(b.booking_id)}
                      className="bg-red-100 hover:bg-red-300 px-2 py-1 rounded"
                    >
                      ✖
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Bookings;