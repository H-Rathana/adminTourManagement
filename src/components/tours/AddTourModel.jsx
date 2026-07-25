import { useEffect, useState } from "react";
import API, { BASE_URL } from "../../services/api.js";

import {
  X,
  ImagePlus,
  MapPin,
  DollarSign,
  Users,
  Clock3,
  FileText,
   CalendarDays,
   Trash2,
} from "lucide-react";


const AddTourModal = ({
  onClose,
  formData,
  setFormData,
  onSubmit,
  isEdit,
  editingTour,
  fetchTours,
}) => {
  const calculateDuration = (from, until) => {

  if (!from || !until) return "";

  const start = new Date(from);
  const end = new Date(until);

  if (end < start) return "";

  const days =
    Math.ceil(
      (end - start) /
      (1000 * 60 * 60 * 24)
    ) + 1;

  if (days === 1)
    return "1 Day";

  if (days === 2)
    return "2 Days 1 Night";

  return `${days} Days ${days - 1} Nights`;

};
const tomorrow = new Date();
const [gallery, setGallery] = useState([]);

const [galleryImage, setGalleryImage] = useState(null);

const loadGallery = async () => {

  if (!editingTour) return;

  try {

    const res = await API.get(
      `/gallery/${editingTour.tour_id}`
    );

    setGallery(res.data);

  } catch (err) {

    console.log(err);

  }

};
useEffect(() => {

  loadGallery();

}, [editingTour]);
const uploadGallery = async () => {

  if (!galleryImage) return;

  try {

    const data = new FormData();

    data.append(
      "image",
      galleryImage
    );

    await API.post(
      `/gallery/${editingTour.tour_id}`,
      data
    );

    setGalleryImage(null);

    loadGallery();

  } catch (err) {

    console.log(err);

  }

};
const deleteGallery = async (
  id
) => {

  try {

    await API.delete(
      `/gallery/${id}`
    );

    loadGallery();

  } catch (err) {

    console.log(err);

  }

};

tomorrow.setDate(tomorrow.getDate() + 1);

const minDate = tomorrow.toISOString().split("T")[0];


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-5">

  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">

    {/* ================= HEADER ================= */}

    <div className="flex justify-between items-center px-8 py-6 border-b bg-white">

      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          {isEdit ? "Update Tour" : "Add New Tour"}
        </h2>

        <p className="text-slate-500 mt-1">
          Manage tourism package details
        </p>

      </div>

      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-slate-100"
      >
        <X size={22} />
      </button>

    </div>

    {/* ================= BODY ================= */}

    <div className="flex-1 overflow-y-auto p-8 space-y-7 bg-slate-50">

      {/* ================================================= */}
      {/* TOUR INFORMATION */}
      {/* ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="flex items-center gap-2 font-semibold text-xl mb-6">

          <FileText size={20} />

          Tour Information

        </h3>

        <div className="space-y-5">

          <div>

            <label className="font-medium mb-2 flex items-center gap-2">

              <FileText size={16} />

              Tour Title

            </label>

            <input
              type="text"
              placeholder="Enter tour title..."
              value={formData.title}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  title:e.target.value
                })
              }
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />

          </div>

          <div>

            <label className="font-medium mb-2 flex items-center gap-2">

              <FileText size={16} />

              Tour Overview

            </label>

            <textarea
              rows={4}
              value={formData.description}
              placeholder="Write a short overview of this tour..."
              onChange={(e)=>
                setFormData({
                  ...formData,
                  description:e.target.value
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                resize-none
                focus:ring-2
                focus:ring-sky-500
                outline-none
              "
            />

            <p className="text-xs text-slate-500 mt-2">

              Short introduction shown on the Tour Details page.

            </p>

          </div>
          <div className="mt-6">

            <label className="font-medium mb-2 flex items-center gap-2">

              <Clock3 size={16} />

              Tour Itinerary

            </label>

            <textarea
              rows={9}
              value={formData.itinerary}
              placeholder={`07:30 AM - Hotel Pickup

          08:30 AM - Visit Angkor Wat

          10:30 AM - Bayon Temple

          12:00 PM - Lunch

          02:00 PM - Ta Prohm Temple

          04:30 PM - Sunset View

          06:00 PM - Return Hotel`}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  itinerary:e.target.value
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                resize-none
                font-mono
                text-[15px]
                leading-8
                focus:ring-2
                focus:ring-sky-500
                outline-none
              "
            />

            <div
              className="
              mt-3
              rounded-xl
              bg-sky-50
              border
              border-sky-100
              p-4
              "
            >

              <p className="text-sm text-sky-700">

                💡 <strong>Tip:</strong> Put one activity on each line.
                Example:

              </p>

              <div className="mt-2 text-sm text-slate-600 leading-7">

                07:30 AM - Hotel Pickup<br/>

                08:30 AM - Visit Angkor Wat<br/>

                12:00 PM - Lunch<br/>

                02:00 PM - Bayon Temple

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-medium mb-2 flex items-center gap-2">

                <MapPin size={16} />

                Location

              </label>

              <input
                type="text"
                value={formData.location}
                placeholder="Siem Reap"
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    location:e.target.value
                  })
                }
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
              />

            </div>

            <div>

              <label className="font-medium mb-2 flex items-center gap-2">

                <DollarSign size={16} />

                Price

              </label>

              <input
                type="number"
                value={formData.price}
                placeholder="$50"
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    price:e.target.value
                  })
                }
                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* TOUR SCHEDULE */}
      {/* ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="flex items-center gap-2 font-semibold text-xl mb-6">

          <CalendarDays size={20} />

          Tour Schedule

        </h3>

        <div className="grid lg:grid-cols-3 gap-6">

          <div>

            <label className="text-sm font-medium text-slate-500 mb-2 block">

              Available From

            </label>

            <input
              type="date"
              min={minDate}
              value={formData.available_from}
              onChange={(e) => {

                const from = e.target.value;

                setFormData({

                  ...formData,

                  available_from: from,

                  available_until: "",

                  duration: "",

                });

              }}
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-500 mb-2 block">

              Available Until

            </label>

            <input
              type="date"
              value={formData.available_until}
              min={formData.available_from}
              onChange={(e)=>{

                const until=e.target.value;

                setFormData({

                  ...formData,

                  available_until:until,

                  duration:calculateDuration(
                    formData.available_from,
                    until
                  )

                });

              }}
              className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
            />

          </div>

          <div className="bg-sky-50 rounded-2xl border border-sky-200 flex items-center px-5">

            <Clock3
              className="text-sky-600 mr-4"
              size={28}
            />

            <div>

              <p className="text-sm text-slate-500">

                Duration

              </p>

              <h2 className="font-bold text-sky-700 text-xl">

                {formData.duration || "-"}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* BOOKING */}
      {/* ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="flex items-center gap-2 font-semibold text-xl mb-6">

          <Users size={20}/>

          Booking Settings

        </h3>

        <div className="max-w-sm">

          <label className="font-medium mb-2 flex items-center gap-2">

            <Users size={16}/>

            Maximum People

          </label>

          <input
            type="number"
            value={formData.max_people}
            placeholder="20"
            onChange={(e)=>
              setFormData({
                ...formData,
                max_people:e.target.value
              })
            }
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* IMAGE */}
      {/* ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h3 className="flex items-center gap-2 font-semibold text-xl mb-6">

          <ImagePlus size={20}/>

          Tour Image

        </h3>

        <input
          type="file"
          onChange={(e)=>
            setFormData({
              ...formData,
              image:e.target.files[0]
            })
          }
          className="w-full border rounded-xl px-4 py-3"
        />

        {formData.image && (

          <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">

            <p className="text-green-700 font-medium">

              ✓ {formData.image.name}

            </p>

          </div>

        )}
        

      {isEdit && editingTour && (

      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">

          <div className="flex justify-between items-center mb-6">

        <div>

            <h3 className="text-xl font-bold">

                Tour Gallery

            </h3>

            <p className="text-slate-500 text-sm mt-1">

                Upload additional images for this tour.

            </p>

        </div>

    </div>

    {/* Upload */}

    <div className="flex gap-3 mb-8">

        <input

            type="file"

            onChange={(e)=>

                setGalleryImage(
                    e.target.files[0]
                )

            }

            className="
            flex-1
            border
            rounded-xl
            px-4
            py-3
            "

        />

        <button

            onClick={uploadGallery}

            className="
            bg-sky-600
            hover:bg-sky-700
            text-white
            px-6
            rounded-xl
            "

        >

            Upload

        </button>

    </div>

    {/* Gallery */}

    {gallery.length === 0 ? (

        <div
            className="
            text-center
            py-10
            text-slate-400
            "
        >

            No gallery images yet.

        </div>

    ) : (

        <div
            className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
            "
        >

            {gallery.map((item)=>(

                <div

                    key={item.gallery_id}

                    className="
                    relative
                    group
                    rounded-2xl
                    overflow-hidden
                    shadow
                    "

                >

                    <img

                        src={`${BASE_URL}/uploads/gallery/${item.image}`}

                        alt="gallery"

                        className="
                        w-full
                        h-40
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-500
                        "

                    />

                    <div
                        className="
                        absolute
                        inset-0
                        bg-black/40
                        opacity-0
                        group-hover:opacity-100
                        transition
                        flex
                        justify-center
                        items-center
                        "
                    >

                        <button

                            onClick={()=>

                                deleteGallery(
                                    item.gallery_id
                                )

                            }

                            className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            w-11
                            h-11
                            rounded-full
                            flex
                            justify-center
                            items-center
                            "

                        >

                            <Trash2 size={18}/>

                        </button>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>

      )}

      </div>

    </div>

    {/* ================= FOOTER ================= */}

    <div className="border-t bg-white px-8 py-5 flex justify-end gap-4">

      <button
        onClick={onClose}
        className="px-6 py-3 rounded-xl border hover:bg-slate-100"
      >
        Cancel
      </button>

      <button
        onClick={onSubmit}
        className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl shadow-lg"
      >
        {isEdit ? "Update Tour" : "Create Tour"}
      </button>

    </div>

  </div>

</div>
  );
};

export default AddTourModal;