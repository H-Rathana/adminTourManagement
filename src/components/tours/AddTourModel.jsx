const AddTourModal = ({  onClose, formData, setFormData, onSubmit }) => {
  // if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="mb-4 font-semibold">Add Tour</h3>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value})
          }
        />
        <input
        className="w-full border p-2 mb-2"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-2"
          value={formData.location}
          placeholder="Location"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <input
          className="w-full border p-2 mb-2"
          value={formData.price}
          placeholder="Price"
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        <input
            type="number"
            className="w-full border p-2 mb-2"
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
        <input
            type="number"
            className="w-full border p-2 mb-2"
            placeholder="Max People"
            value={formData.max_people}
            onChange={(e) =>
              setFormData({ ...formData, max_people: e.target.value })
            }
          />
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTourModal;