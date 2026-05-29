import { useEffect, useState } from "react";
import API from "../services/api";
import TourCard from "../components/tours/TourCard";
import AddTourModal from "../components/tours/AddTourModel";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  MapPinned,
  DollarSign,
  Map,
} from "lucide-react";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    max_people: "",
    image: null,
  });

  const fetchTours = async () => {
    try {
      const res = await API.get("/tours");
      setTours(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Database disconnected!");
    }
  };

  useEffect(() => {
    const loadTours = async ()=>{
        await fetchTours();
    }
    loadTours();
  }, []);

  const createTour = async () => {
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.location ||
        !formData.price ||
        !formData.duration ||
        !formData.max_people ||
        !formData.image
      ) {
        toast.error(
          "Please fill all fields and select image!"
        );
        return;
      }

      const data = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      await API.post("/tours", data);

      toast.success(
        "Tour created successfully 🎉"
      );

      setShowModal(false);

      fetchTours();

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong!"
      );

    }
  };

  const updateTour = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "location",
        formData.location
      );
      data.append("price", formData.price);
      data.append(
        "duration",
        formData.duration
      );
      data.append(
        "max_people",
        formData.max_people
      );

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      await API.put(
        `/tours/${editingTour.tour_id}`,
        data
      );

      toast.success(
        "Tour updated successfully 🎉"
      );

      setEditingTour(null);
      setShowModal(false);

      fetchTours();

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong!"
      );

    }
  };

 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are You Sure to Delete this tour?",
    text: "This action cannot be undone.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#64748b",

    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(`/tours/${id}`);

    fetchTours();

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Tour removed successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });

  }
};

  const handleEdit = (tour) => {

    setEditingTour(tour);

    setFormData({
      title: tour.title || "",
      description:
        tour.description || "",
      location:
        tour.location || "",
      price: tour.price || "",
      duration:
        tour.duration || "",
      max_people:
        tour.max_people || "",
      image: null,
    });

    setShowModal(true);

  };

  const handleAdd = () => {

    setEditingTour(null);

    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      duration: "",
      max_people: "",
      image: null,
    });

    setShowModal(true);

  };

  const filteredTours =
    tours.filter((tour) =>
      tour.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  const averagePrice =
    tours.length > 0
      ? Math.round(
          tours.reduce(
            (sum, tour) =>
              sum +
              Number(tour.price),
            0
          ) / tours.length
        )
      : 0;

  const totalLocations =
    new Set(
      tours.map(
        (tour) =>
          tour.location
      )
    ).size;

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Tour Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all tourism packages
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="
          flex
          items-center
          gap-2
          bg-sky-600
          hover:bg-sky-700
          text-white
          px-5
          py-3
          rounded-xl
          shadow
          "
        >

          <Plus size={18} />

          Add Tour

        </button>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-sm">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Tours
              </p>

              <h2 className="text-3xl font-bold">
                {tours.length}
              </h2>

            </div>

            <MapPinned
              className="text-sky-500"
            />

          </div>

        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Average Price
              </p>

              <h2 className="text-3xl font-bold">
                ${averagePrice}
              </h2>

            </div>

            <DollarSign
              className="text-green-500"
            />

          </div>

        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Locations
              </p>

              <h2 className="text-3xl font-bold">
                {totalLocations}
              </h2>

            </div>

            <Map
              className="text-orange-500"
            />

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tours..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          bg-white
          border
          rounded-xl
          py-3
          pl-12
          pr-4
          shadow-sm
          "
        />

      </div>

      {/* TOUR GRID */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        {filteredTours.map((tour) => (

          <TourCard
            key={tour.tour_id}
            tour={tour}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        ))}

      </div>

      {/* MODAL */}
      {showModal && (

        <AddTourModal
          onClose={() => {
            setShowModal(false);
            setEditingTour(null);
          }}
          formData={formData}
          setFormData={setFormData}
          onSubmit={
            editingTour
              ? updateTour
              : createTour
          }
          isEdit={!!editingTour}
          editingTour={editingTour}
        />

      )}

    </div>
  );
};

export default Tours;