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
        <button onClick={() => onEdit(tour)} className="bg-sky-500 text-white px-3 py-1 rounded">
           Edit
        </button>

        <button
          onClick={() => onDelete(tour.tour_id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TourCard;