import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
} from "../services/api";

import {
  Search,
  Users,
  ShieldCheck,
  User,
  Book,
} from "lucide-react";
import {
  useNavigate,
} from "react-router-dom";  

const UsersPage = () => {

  const [users, setUsers] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");
  
  const navigate =
  useNavigate();

  // ✅ FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const res =
          await getUsers();

        setUsers(
          res.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {
    const loadUser = async ()=>{
        await fetchUsers();
    }
    loadUser();

  }, []);

  // ✅ FILTER USERS
  const filteredUsers =
    users.filter((u) => {

      const matchesFilter =

        filter === "all"

          ? true

          : u.role === filter;

      const matchesSearch =

        u.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        u.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );

    });

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Users
          </h1>

          <p className="text-gray-500 mt-1">
            Manage system users
          </p>

        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* TOTAL USERS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {users.length}
              </h2>

            </div>

            <Users
              className="text-sky-500"
            />

          </div>

        </div>

        {/* ADMINS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Admins
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  users.filter(
                    (u) =>
                      u.role ===
                      "admin"
                  ).length
                }

              </h2>

            </div>

            <ShieldCheck
              className="text-emerald-500"
            />

          </div>

        </div>

        {/* CUSTOMERS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Customers
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {
                  users.filter(
                    (u) =>
                      u.role ===
                      "customer"
                  ).length
                }

              </h2>

            </div>

            <User
              className="text-orange-500"
            />

          </div>

        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold mt-1">

                {users.reduce(
                  (sum, user) =>
                    sum +
                    Number(user.total_bookings),
                  0
                )}

              </h2>

            </div>

            <Book
              className="text-green-500"
            />

          </div>

        </div>
        
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">

        {[
          "all",
          "admin",
          "customer",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`px-5 py-2 rounded-full transition capitalize font-medium

            ${
              filter === item

                ? "bg-sky-500 text-white shadow"

                : "bg-white hover:bg-slate-100 text-gray-600"
            }`}
          >

            {item}

          </button>

        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* HEAD */}
            <thead className="bg-slate-100 text-slate-600 text-sm">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="text-left">
                  Name
                </th>

                <th className="text-left">
                  Email
                </th>
                <th className="text-left">
                Bookings
                </th>

                <th className="text-left">
                  Role
                </th>

                <th className="text-left">
                  Joined
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filteredUsers.map(
                (u) => (

                <tr
                  key={u.user_id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    #
                    {u.user_id}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">

                      {u.profile_image ? (

                        <img
                          src={`http://localhost:5000/uploads/profiles/${u.profile_image}`}
                          alt=""
                          className="
                            w-11
                            h-11
                            rounded-full
                            object-cover
                          "
                        />

                      ) : (

                        <div
                          className="
                          w-11
                          h-11
                          rounded-full
                          bg-sky-100
                          text-sky-600
                          flex
                          items-center
                          justify-center
                          font-bold
                          "
                        >
                          {u.name?.charAt(0)}
                        </div>

                      )}

                      <div>
                        <p className="font-semibold">
                          {u.name}
                        </p>
                        
                      </div>

                    </div>
                  </td>

                  <td>
                    {u.email}
                  </td>
                  <td>

                    <button
                      onClick={() =>
                        navigate(
                          `/users/${u.user_id}/bookings`
                        )
                      }
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-orange-100
                      text-orange-600
                      text-sm
                      font-medium
                      hover:bg-orange-200
                      transition
                      "
                    >
                      {u.total_bookings}
                      {"  "} Bookings
                    </button>
                    

                  </td>

                  {/* ROLE */}
                  <td>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium

                      ${
                        u.role ===
                        "admin"

                          ? "bg-emerald-100 text-emerald-600"

                          : "bg-sky-100 text-sky-600"
                      }`}
                    >

                      {u.role}

                    </span>

                  </td>

                  {/* DATE */}
                  <td>

                    {new Date(
                      u.created_at
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default UsersPage;