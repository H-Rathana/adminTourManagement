const TourCard = ({ tour, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow">

      <img
        src={`http://localhost:5000/uploads/${tour.image}`}
        alt={tour.title}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="font-bold mt-2">{tour.title}</h2>
      <p>📍{tour.location} , Cambodia<span className="ml-5">⌛{tour.duration}days</span></p>
      <p><span>👥{tour.max_people}</span>💲{tour.price}</p>

      <div className="flex gap-2 mt-3">
        <button onClick={() => onEdit(tour)} className="border-2 border-blue-600 px-3 py-1 rounded-xl text-blue-600">
           Edit
        </button>

        <button
          onClick={() => onDelete(tour.tour_id)}
          className="border-2 border-red-600  px-3 py-1 rounded-xl text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TourCard;