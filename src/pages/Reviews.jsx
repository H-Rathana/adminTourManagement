import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Search,
  Trash2,
  Star,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const Reviews = () => {
  const [reviews, setReviews] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchReviews =
    async () => {
      try {
        const res =
          await API.get(
            "/reviews/admin"
          );

        setReviews(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this review?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/reviews/${id}`
        );

        toast.success(
          "Review deleted"
        );

        setReviews((prev) =>
          prev.filter(
            (r) =>
              r.review_id !== id
          )
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete review"
        );

      }
    };

  const filteredReviews =
    reviews.filter(
      (review) =>
        review.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.comment
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, r) =>
              sum + r.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Reviews
          </h1>

          <p className="text-gray-500 mt-2">
            Customer feedback and ratings
          </p>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <MessageSquare
            className="text-sky-500 mb-4"
            size={30}
          />

          <p className="text-gray-500">
            Total Reviews
          </p>

          <h2 className="text-4xl font-bold">
            {reviews.length}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <Star
            className="text-yellow-500 mb-4"
            size={30}
          />

          <p className="text-gray-500">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold">
            {averageRating}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <Trash2
            className="text-red-500 mb-4"
            size={30}
          />

          <p className="text-gray-500">
            Reviews Displayed
          </p>

          <h2 className="text-4xl font-bold">
            {
              filteredReviews.length
            }
          </h2>

        </div>

      </div>

      {/* Table */}
      <div
        className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-100
        overflow-hidden
        "
      >

        {/* Search */}
        <div className="p-6 border-b">

          <div
            className="
            relative
            max-w-md
            "
          >

            <Search
              size={20}
              className="
              absolute
              left-4
              top-4
              text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
              w-full
              pl-12
              pr-4
              py-3
              border
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              "
            />

          </div>

        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50">

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Tour
              </th>

              <th className="p-4 text-left">
                Rating
              </th>

              <th className="p-4 text-left">
                Comment
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredReviews.map(
              (review) => (

                <tr
                  key={
                    review.review_id
                  }
                  className="
                  border-b
                  hover:bg-slate-50
                  transition
                  "
                >

                  {/* User */}
                  <td className="p-4">

                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >

                      <img
                        src={
                          review.profile_image
                            ? `http://localhost:5000/uploads/profiles/${review.profile_image}`
                            : `https://ui-avatars.com/api/?name=${review.name}`
                        }
                        alt=""
                        className="
                        w-12
                        h-12
                        rounded-full
                        object-cover
                        "
                      />

                      <div>

                        <p className="font-semibold">
                          {review.name}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Tour */}
                  <td className="p-4 font-medium">
                    {review.title}
                  </td>

                  {/* Rating */}
                  <td className="p-4">

                    <div className="flex">

                      {Array.from({
                        length:
                          review.rating,
                      }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="currentColor"
                            className="
                            text-yellow-500
                            "
                          />
                        )
                      )}

                    </div>

                  </td>

                  {/* Comment */}
                  <td className="p-4 max-w-sm">
                    {review.comment}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-500">
                    {new Date(
                      review.created_at
                    ).toLocaleDateString()}
                  </td>

                  {/* Delete */}
                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          review.review_id
                        )
                      }
                      className="
                      text-red-500
                      hover:text-red-600
                      "
                    >

                      <Trash2
                        size={20}
                      />

                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Reviews;