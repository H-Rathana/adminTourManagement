import {
  X,
  User,
  Mail,
  Phone,
  MapPinned,
  Calendar,
  CreditCard,
} from "lucide-react";

const BookingDetailsModal = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Booking Details
            </h2>

            <p className="text-gray-500">
              Reference #{booking.booking_id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="p-6 space-y-6">

          {/* Customer */}
          <div>

            <h3 className="font-semibold text-lg mb-3">
              Customer Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="flex items-center gap-2">
                <User size={18} />
                {booking.full_name}
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                {booking.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                {booking.phone}
              </div>

            </div>

          </div>

          {/* Tour */}
          <div>

            <h3 className="font-semibold text-lg mb-3">
              Tour Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="flex items-center gap-2">
                <MapPinned size={18} />
                {booking.tour_title}
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(
                  booking.travel_date
                ).toLocaleDateString()}
              </div>

            </div>

          </div>

          {/* Payment */}
          <div>

            <h3 className="font-semibold text-lg mb-3">
              Payment Information
            </h3>

            <div className="grid grid-cols-3 gap-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Amount
                </p>

                <p className="font-bold">
                  ${booking.amount}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Method
                </p>

                <p className="font-bold">
                  {booking.payment_method}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Status
                </p>

                <p className={`font-bold
                     ${booking.payment_status === "paid"
                ? " text-green-700"
                : booking.payment_status === "failed"
                ? " text-red-700"
                : " text-yellow-500"
                }
                `}
                >
                 {booking.payment_status}
                </p>
              </div>

            </div>

          </div>

          {/* Special Request */}
          <div>

            <h3 className="font-semibold text-lg mb-3">
              Special Request
            </h3>

            <div className="bg-slate-50 p-4 rounded-xl">

              {booking.special_requests ||
                "No special request"}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookingDetailsModal;