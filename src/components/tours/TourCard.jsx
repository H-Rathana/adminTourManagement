import {
  MapPin,
  Users,
  Clock3,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

const TourCard = ({
  tour,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      border
      border-gray-100
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={`http://localhost:5000/uploads/${tour.image}`}
          alt={tour.title}
          className="w-full h-52 object-cover"
        />

        <span
          className="
          absolute top-3 right-3
          bg-green-100
          text-green-700
          text-xs
          font-semibold
          px-3 py-1
          rounded-full
          "
        >
          Active
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="font-bold text-xl text-slate-800">
          {tour.title}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <MapPin size={16} />
          <span>{tour.location}, Cambodia</span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mt-4">

          <div className="bg-gray-200 rounded-xl p-3 text-center">
            <Users
              size={18}
              className="mx-auto text-sky-500"
            />
            <p className="font-semibold mt-1">
              {tour.max_people}
            </p>
          </div>

          <div className="bg-gray-200 rounded-xl p-3 text-center">
            <Clock3
              size={18}
              className="mx-auto text-orange-500"
            />
            <p className="font-semibold mt-1">
              {tour.duration}d
            </p>
          </div>

          <div className="bg-gray-200 rounded-xl p-3 text-center">
            <DollarSign
              size={18}
              className="mx-auto text-green-500"
            />
            <p className="font-semibold mt-1">
              ${tour.price}
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={() => onEdit(tour)}
            className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            bg-blue-50
            text-blue-600
            py-2
            rounded-xl
            hover:bg-blue-100
            transition
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(tour.tour_id)
            }
            className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            bg-red-50
            text-red-600
            py-2
            rounded-xl
            hover:bg-red-100
            transition
            "
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default TourCard;