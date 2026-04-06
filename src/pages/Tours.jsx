import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layouts/Layout";
import TourCard from "../components/tours/TourCard";
import AddTourModal from "../components/tours/AddTourModel";


const Tours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
  title: "",
  location: "",
  price: "",
  image: null,
 });
 const createTour = async () => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("image", formData.image); // 🔥 IMPORTANT

    await API.post("/tours", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setShowModal(false);
    fetchTours();
  } catch (error) {
    console.error(error);
  }
};
    
  // ✅ FETCH
  const fetchTours = async () => {
    try {
      const res = await API.get("/tours");
      setTours(res.data);
    } catch (error) {
      console.error(error);
    }
  };
const handleAdd = () => {
  setEditingTour(null); // 🔥 MUST reset

  setFormData({
    title: "",
    location: "",
    price: "",
    image: null,
  });

  setShowModal(true);
};
  // ✅ DELETE
//   const handleDelete = async (id) => {
//   try {
//     await API.delete(`/tours/${id}`);
//     fetchTours(); // refresh UI
//   } catch (error) {
//     console.error(error);
//   }
// };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this tour?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/tours/${id}`);
    fetchTours();
  } catch (error) {
    console.error(error);
  }
};

  // ✅ UPDATE
  // const updateTour = async () => {
  //   try {
  //     await API.put(`/tours/${editingTour.id}`, editingTour);
  //     setEditingTour(null);
  //     fetchTours();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleEdit = (tour) => {
  setEditingTour(tour);

  setFormData({
    title: tour.title,
    location: tour.location,
    price: tour.price,
    image: null, // new image optional
  });

  setShowModal(true);
};
 const updateTour = async () => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("price", formData.price);

    if (formData.image) {
      data.append("image", formData.image);
    }

    await API.put(`/tours/${editingTour.id}`, data);

    setShowModal(false);
    setEditingTour(null);
    fetchTours();
  } catch (error) {
    console.error(error);
  }
};
  // ✅ LOAD DATA
  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <Layout>
      <div className="pb-5 flex justify-end"> 
         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-5" onClick={handleAdd}>
        + Add Tour
      </button>
      <div></div>
      </div>
      {/* {showModal && (
      <AddTourModal
        onClose={() => {
          setShowModal(false);
          setEditingTour(null);
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={editingTour ? updateTour : createTour}
        isEdit={!!editingTour}
      />
)} */}
      <div className="grid grid-cols-3 gap-6">
        {/* Tour List */}
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
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
    </Layout>
  );
};


export default Tours;