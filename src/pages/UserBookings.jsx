import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getUserBookings,
  getUserById,
} from "../services/api";

import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";

const UserBookings = () => {
  const { id } = useParams();

  const [bookings,
    setBookings] =
    useState([]);
  
  const [user,
  setUser] =
  useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const fetchBookings =
  async () => {
    try {

      const [
        bookingRes,
        userRes,
      ] = await Promise.all([
        getUserBookings(id),
        getUserById(id),
      ]);

      setBookings(
        bookingRes.data
      );

      setUser(
        userRes.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading bookings...
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        User Booking History
      </h1>

      {/* USER CARD */}
      {user && (
        <div
          className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          mb-8
          flex
          items-center
          gap-5
          "
        >

          {user.profile_image ? (
            <img
              src={`http://localhost:5000/uploads/profiles/${user.profile_image}`}
              alt=""
              className="
              w-20
              h-20
              rounded-full
              object-cover
              "
            />
          ) : (
            <div
              className="
              w-20
              h-20
              rounded-full
              bg-sky-100
              text-sky-600
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {user.name?.charAt(0)}
            </div>
          )}

          <div>

            <h2
              className="
              text-2xl
              font-bold
              "
            >
              {user.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {bookings.length}
                    {
                    bookings.length === 1
                        ? " Booking"
                        : " Bookings"
                    }
            </p>

          </div>

        </div>
      )}

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (

        <div
          className="
          bg-white
          rounded-3xl
          shadow-sm
          p-20
          text-center
          "
        >

          <div
            className="
            w-24
            h-24
            rounded-full
            bg-sky-100
            mx-auto
            flex
            items-center
            justify-center
            mb-6
            "
          >

            <Calendar
              size={42}
              className="
              text-sky-500
              "
            />

          </div>

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            No Travel History Yet
          </h2>

          <p
            className="
            text-gray-500
            mt-3
            "
          >
            {user?.name} has not made any bookings yet.
            Their travel history will appear here once they book a tour.
          </p>

        </div>

      ) : (

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          {bookings.map(
            (booking) => (

              <div
                key={
                  booking.booking_id
                }
                className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                "
              >

                <img
                  src={`http://localhost:5000/uploads/${booking.image}`}
                  alt=""
                  className="
                  w-full
                  h-44
                  object-cover
                  "
                />

                <div className="p-5">

                  <h2
                    className="
                    text-lg
                    font-bold
                    mb-4
                    "
                  >
                    {booking.title}
                  </h2>

                  <div
                    className="
                    space-y-3
                    text-gray-600
                    "
                  >

                    <div className="flex gap-2">

                      <MapPin
                        size={18}
                      />

                      {booking.location}

                    </div>

                    <div className="flex gap-2">

                      <Calendar
                        size={18}
                      />

                      {new Date(
                        booking.travel_date
                      ).toLocaleDateString()}

                    </div>

                    <div className="flex gap-2">

                      <Users
                        size={18}
                      />

                      {
                        booking.people_count
                      } Travelers

                    </div>

                    <div className="flex gap-2">

                      <DollarSign
                        size={18}
                      />

                      $
                      {
                        booking.total_price
                      }

                    </div>

                    <div className="flex gap-2">

                      <Clock
                        size={18}
                      />

                      {new Date(
                        booking.created_at
                      ).toLocaleDateString()}

                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="mt-5">

                    <span
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium

                      ${
                        booking.status ===
                        "approved"
                          ? "bg-green-100 text-green-600"
                          : booking.status ===
                            "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : booking.status ===
                            "completed"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-red-100 text-red-600"
                      }
                      `}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
};

export default UserBookings;