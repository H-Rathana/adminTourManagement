import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../services/api";
import toast from "react-hot-toast";

const CheckInScanner = () => {

  const [booking, setBooking] =
    useState(null);

  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

    scanner.render(

      async (decodedText) => {

        try {

          const bookingId =
            decodedText.replace(
              "BOOKING-",
              ""
            );

          const res =
            await API.put(
              `/bookings/${bookingId}/checkin`
            );

          setBooking(res.data);

            if (
            res.data.alreadyCheckedIn
            ) {

            toast.error(
                "Already Checked In"
            );

            } else {

            toast.success(
                `Booking #${bookingId} checked in`
            );

            }

        } catch (error) {

          toast.error(
            "Check-In Failed"
          );

        }

      },

      () => {}

    );

    return () => {
      scanner.clear();
    };

  }, []);

  return (

    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          QR Check-In Scanner
        </h1>

        <p className="text-gray-500">
          Scan customer ticket to check in
        </p>

      </div>

      {/* SCANNER */}
      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
        "
      >

        <div
          id="reader"
          className="max-w-md mx-auto"
        />

      </div>

      {/* RESULT */}
      {booking && (

        <div
          className="
          mt-6
          bg-green-50
          border
          border-green-200
          rounded-3xl
          p-6
          "
        >

          <h2
            className={`text-xl font-bold mb-4 ${
                booking.alreadyCheckedIn
                ? "text-orange-600"
                : "text-green-700"
            }`}
            >

            {booking.alreadyCheckedIn
                ? "⚠ Already Checked In"
                : "✓ Check-In Success"}

        </h2>

          <div className="space-y-2">

  <p>
    <strong>Customer:</strong>{" "}
    {booking.full_name}
  </p>

  <p>
    <strong>Tour:</strong>{" "}
    {booking.tour_title}
  </p>

  <p>
    <strong>Travel Date:</strong>{" "}
    {new Date(
      booking.travel_date
    ).toLocaleDateString()}
  </p>

  <p>
    <strong>People:</strong>{" "}
    {booking.people_count}
  </p>

  <p>
    <strong>Booking ID:</strong>{" "}
    #{booking.booking_id}
  </p>

  <p>
    <strong>Checked In:</strong>{" "}
    {new Date(
      booking.checked_in_at
    ).toLocaleString()}
  </p>

</div>

        </div>

      )}

    </div>

  );

};

export default CheckInScanner;