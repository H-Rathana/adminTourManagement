import {
  X,
  ImagePlus,
  MapPin,
  DollarSign,
  Users,
  Clock3,
  FileText,
} from "lucide-react";

const AddTourModal = ({
  onClose,
  formData,
  setFormData,
  onSubmit,
  isEdit,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              {isEdit
                ? "Update Tour"
                : "Add New Tour"}
            </h2>

            <p className="text-gray-500 text-sm">
              Manage tourism package details
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* BODY */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* TITLE */}
          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FileText size={16} />
              Tour Title
            </label>

            <input
              type="text"
              placeholder="Enter tour title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FileText size={16} />
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Tour description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* LOCATION + PRICE */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>

              <input
                type="text"
                placeholder="Kampot"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            <div>
              <label className="font-medium mb-2 flex items-center gap-2">
                <DollarSign size={16} />
                Price
              </label>

              <input
                type="number"
                placeholder="100"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

          </div>

          {/* DURATION + MAX PEOPLE */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="font-medium mb-2 flex items-center gap-2">
                <Clock3 size={16} />
                Duration (Days)
              </label>

              <input
                type="number"
                placeholder="3"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            <div>
              <label className="font-medium mb-2 flex items-center gap-2">
                <Users size={16} />
                Max People
              </label>

              <input
                type="number"
                placeholder="20"
                value={formData.max_people}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_people:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

          </div>

          {/* IMAGE */}
          <div>

            <label className="font-medium mb-2 flex items-center gap-2">
              <ImagePlus size={16} />
              Tour Image
            </label>

            <input
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image:
                    e.target.files[0],
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />

            {formData.image && (
              <p className="text-sm text-green-600 mt-2">
                Selected:
                {" "}
                {formData.image.name}
              </p>
            )}

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
            px-5 py-2
            rounded-xl
            border
            hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="
            bg-sky-600
            hover:bg-sky-700
            text-white
            px-6
            py-2
            rounded-xl
            shadow
            "
          >
            {isEdit
              ? "Update Tour"
              : "Create Tour"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddTourModal;