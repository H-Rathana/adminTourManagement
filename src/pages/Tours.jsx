import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layouts/Layout";
import TourCard from "../components/tours/TourCard";
import AddTourModal from "../components/tours/AddTourModel";
import toast from "react-hot-toast";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
  title: "",
  description:"", 
  location: "",
  price: "",
  duration:"",
  max_people:"",
  image: null,
 });
 const showSuccess = () => {
  toast.success("Tour created successfully 🎉");
};
 const deleteSuccess = () => {
  toast.success("Tour deleted successfully 🎉");
};
 const updatSuccess = () => {
  toast.success("Tour Update successfully 🎉");
};
const createTour = async () => {
  try {
    // VALIDATION
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.price ||
      !formData.duration ||
      !formData.max_people ||
      !formData.image
    ) {
      toast.error("Please fill all fields and select image!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("max_people", formData.max_people);
    data.append("image", formData.image);

    await API.post("/tours", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setShowModal(false);
    fetchTours();

    showSuccess();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

    
  // FETCH
  const fetchTours = async () => {
    try {
      const res = await API.get("/tours");
      setTours(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Database Disconnected!");
    }
  };
const handleAdd = () => {
  setEditingTour(null); 

  setFormData({
    title: "",
    description:"",
    location: "",
    price: "",
    duration:"",
    max_people:"",
    image: null,
  });

  setShowModal(true);
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this tour?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/tours/${id}`);
    fetchTours();
    deleteSuccess();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

const handleEdit = (tour) => {
  setEditingTour(tour);

  setFormData({
    title: tour.title || "",
    description: tour.description || "",
    location: tour.location || "",
    price: tour.price || "",
    duration: tour.duration || "",
    max_people: tour.max_people || "",  
    image: null,
  });

  setShowModal(true);
};
 const updateTour = async () => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description",formData.description);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("max_people", formData.max_people);

    if (formData.image) {
      data.append("image", formData.image);
    }

    await API.put(`/tours/${editingTour.tour_id}`, data);

    setShowModal(false);
    setEditingTour(null);
    fetchTours();
    updatSuccess();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};
  //  LOAD DATA
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div>
      
      <div className="flex justify-between"> 
        <h1 className="text-3xl font-bold font-serif">Tour Packages</h1>
         <button className="bg-red-500 text-white px-4 py-2 rounded-xl mr-5" onClick={handleAdd}>
        + Add Tour
      </button>
      </div>
      <p className="text-gray-600 mb-6">Manage your offering</p>
      <div className="grid grid-cols-3 gap-6">
        {/* Tour List */}
        {tours.map((tour) => (
          <TourCard
            key={tour.tour_id}
            tour={tour}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {showModal && (
        <AddTourModal
          onClose={() => {
            setShowModal(false);
            setEditingTour(null);
          }}
          formData={formData}
          setFormData={setFormData}
          onSubmit={editingTour ? updateTour : createTour}
          isEdit={!!editingTour}
          editingTour={editingTour}
        />
      )}
      </div>
    </div>
  );
};


export default Tours;