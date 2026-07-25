import {
  MapPin,
  Users,
  Clock3,
  DollarSign,
  Pencil,
  Trash2,
  CircleCheck,
  AlertTriangle,
  XCircle,
  CalendarDays,
} from "lucide-react";

const TourCard = ({
  tour,
  onDelete,
  onEdit,
}) => {

  const statusConfig = {

    ACTIVE: {
      text: "Available",
      bg: "bg-emerald-500",
      icon: CircleCheck,
    },

    FULL: {
      text: "Full",
      bg: "bg-orange-500",
      icon: AlertTriangle,
    },

    EXPIRED: {
      text: "Expired",
      bg: "bg-red-500",
      icon: XCircle,
    },

  };

  const currentStatus =
    statusConfig[tour.status] ||
    statusConfig.ACTIVE;

  const StatusIcon =
    currentStatus.icon;

  const remainingSeats =
    Number(tour.remaining_seats ?? tour.max_people);

  const seatPercentage =
    (remainingSeats / tour.max_people) * 100;

  const progressColor =
    seatPercentage > 60
      ? "bg-emerald-500"
      : seatPercentage > 30
      ? "bg-yellow-500"
      : "bg-red-500";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  return (

    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-lg
      border
      border-slate-200
      hover:-translate-y-2
      hover:shadow-2xl
      duration-300
      transition-all
      group
      "
    >

      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden">

        <img
          src={`http://localhost:5000/uploads/${tour.image}`}
          alt={tour.title}
          className="
          h-60
          w-full
          object-cover
          group-hover:scale-110
          duration-700
          transition-transform
          "
        />

        {/* Overlay */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/70
          via-black/10
          to-transparent
          "
        />

        {/* Status */}

        <div
          className={`
          absolute
          top-4
          left-4
          ${currentStatus.bg}
          text-white
          px-4
          py-2
          rounded-full
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          shadow-xl
          `}
        >

          <StatusIcon size={16} />

          {currentStatus.text}

        </div>

        {/* Price */}

        <div
          className="
          absolute
          bottom-4
          right-4
          bg-white/95
          backdrop-blur
          rounded-2xl
          px-4
          py-2
          shadow-lg
          "
        >

          <p className="text-xs text-gray-500">

            Starting From

          </p>

          <div className="flex items-center">

            <DollarSign
              size={18}
              className="text-emerald-600"
            />

            <span
              className="
              text-xl
              font-bold
              text-slate-900
              "
            >

              {tour.price}

            </span>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-6">

        <h2
          className="
          text-2xl
          font-bold
          text-slate-900
          "
        >
          {tour.title}
        </h2>

        <div
          className="
          flex
          items-center
          gap-2
          mt-2
          text-slate-500
          "
        >

          <MapPin
            size={17}
            className="text-orange-500"
          />

          {tour.location}, Cambodia

        </div>

        {/* Schedule */}

        <div
          className="
          mt-5
          bg-slate-50
          rounded-2xl
          p-4
          space-y-3
          "
        >

          <div className="flex items-center gap-3">

            <CalendarDays
              size={18}
              className="text-sky-600"
            />

            <span className="text-sm">

              {formatDate(tour.available_from)}

              {" - "}

              {formatDate(tour.available_until)}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-orange-500"
            />

            <span>

              {tour.duration}

            </span>

          </div>
          <div className="flex items-center gap-3">

            <Users
              size={18}
              className="text-blue-500"
            />

            <span>

              {tour.max_people}

            </span>

          </div>

        </div>
        {/* Seat Progress */}

        <div className="mt-6">

          <div
            className="
            flex
            justify-between
            mb-2
            "
          >

            <span
              className="
              text-sm
              font-medium
              "
            >
              Seat Availability
            </span>

            <span
              className="
              font-bold
              "
            >

              {remainingSeats}

              /

              {tour.max_people}

            </span>

          </div>

          <div
            className="
            w-full
            h-3
            rounded-full
            bg-gray-200
            overflow-hidden
            "
          >

            <div
              className={`
              h-full
              ${progressColor}
              transition-all
              duration-700
              `}
              style={{
                width: `${seatPercentage}%`,
              }}
            />

          </div>

        </div>

        {/* Buttons */}

        <div
          className="
          flex
          gap-4
          mt-8
          "
        >

          <button
            onClick={() => onEdit(tour)}
            className="
            flex-1
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-sky-500
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:scale-105
            transition
            "
          >

            <Pencil size={18} />

            Edit

          </button>

          <button
            onClick={() =>
              onDelete(tour.tour_id)
            }
            className="
            flex-1
            py-3
            text-white
            rounded-2xl
            bg-red-500
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:scale-105
            transition
            "
          >

            <Trash2 size={18} />

            Delete

          </button>

        </div>

      </div>

    </div>

  );

};

export default TourCard;