import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  getUsers,
  promoteUser,
  demoteUser,
  deleteUser,
  resetUserPassword,
} from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import ResetPasswordModal from "../components/ResetPasswordModal";
import {
  Search,
  Users,
  ShieldCheck,
  User,
  Book,
  ArrowUpCircle,
  ArrowDownCircle,
  Trash2,
  KeyRound,
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

  const [modalOpen, setModalOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] =
  useState(false);

  const [selectedUser, setSelectedUser] =
  useState(null);

  const [resetPasswordLoading, setResetPasswordLoading] =
  useState(false);
  
  const [modalData, setModalData] = useState({
  title: "",
  message: "",
  confirmText: "",
  confirmColor: "red",
  onConfirm: () => {},
});

  const currentUser = JSON.parse(
  localStorage.getItem("user")
);

  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  
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
    const handlePromote = async (userId) => {
  try {

    await promoteUser(userId);

    toast.success("User promoted successfully");

    fetchUsers();

  } catch (error) {

    console.error(error);

    toast.error(
        error.response?.data?.message ||
        "Failed to promote user"
        );

  }
};
const handleDemote = async (userId) => {

  try {

    await demoteUser(userId);

    toast.success( "User demoted successfully");

    fetchUsers();

  } catch (error) {

    console.error(error);

    toast.error(
    error.response?.data?.message ||
    "Failed to demote user"
    );

  }

};
const handleDelete = async (userId, name) => {

  try {

    await deleteUser(userId);

    toast.success("User deleted successfully");

    fetchUsers();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
      );

  }

};
const handleResetPasswordForm = async (data) => {

  if (!selectedUser) return;

  try {

    setResetPasswordLoading(true);

    await resetUserPassword(
      selectedUser.user_id,
      data
    );

    toast.success(
      "Password reset successfully"
    );

    setResetPasswordOpen(false);
    setSelectedUser(null);

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to reset password"
    );

  } finally {

    setResetPasswordLoading(false);

  }
};
const openResetPasswordModal = (user) => {
  setSelectedUser(user);
  setResetPasswordOpen(true);
};
const openConfirmModal = ({
  title,
  message,
  confirmText,
  confirmColor,
  onConfirm,
}) => {
  setModalData({
    title,
    message,
    confirmText,
    confirmColor,
    onConfirm,
  });

  setModalOpen(true);
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
                {
                    isSuperAdmin && (
                      <th className="text-left">
                        Actions
                      </th>
                    )
                  }
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
                          u.role === "SUPER_ADMIN"
                            ? "bg-red-100 text-red-600"
                            : u.role === "admin"
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
                  {
                        isSuperAdmin && (
                          <td>
                            <div className="flex items-center gap-2">

                              {/* Promote */}
                              {
                                u.role === "customer" && (
                                 <button
                                    title="Promote to Admin"
                                    onClick={() =>
                                      handlePromote(u.user_id)
                                    }
                                    className="
                                      p-2
                                      rounded-lg
                                      bg-green-100
                                      text-green-600
                                      hover:bg-green-200
                                      hover:scale-110
                                      transition
                                    "
                                  >
                                    <ArrowUpCircle size={18}/>
                                  </button>
                                )
                              }

                              {/* Demote */}
                              {
                                u.role === "admin" && (
                                  <button
                                      title="Demote to User"
                                      onClick={() =>
                                        handleDemote(u.user_id)
                                      }
                                      className="
                                        p-2
                                        rounded-lg
                                        bg-orange-100
                                        text-orange-600
                                        hover:bg-orange-200
                                        hover:scale-110
                                        transition
                                      "
                                    >
                                      <ArrowDownCircle size={18}/>
                                    </button>
                                )
                              }
                              {/* Reset Password */}
                                {u.role !== "SUPER_ADMIN" && (
                                  <button
                                    type="button"
                                    title="Reset Password"
                                    onClick={() =>
                                        openResetPasswordModal(u)
                                      }
                                    className="
                                      p-2
                                      rounded-lg
                                      bg-sky-100
                                      text-sky-600
                                      hover:bg-sky-200
                                      hover:scale-110
                                      transition
                                      duration-200
                                    "
                                  >
                                    <KeyRound size={18} />
                                  </button>
                                )}
                              {/* Delete */}
                              {
                                u.role !== "SUPER_ADMIN" && (
                                 <button
                                    title="Delete User"
                                    onClick={() =>
                                      openConfirmModal({
                                        title: "Delete User",
                                        message: `Are you sure you want to delete "${u.name}"? This action cannot be undone.`,
                                        confirmText: "Delete",
                                        confirmColor: "red",
                                        onConfirm: () =>
                                          handleDelete(
                                            u.user_id,
                                            u.name
                                          ),
                                      })
                                    }
                                    className="
                                      p-2
                                      rounded-lg
                                      bg-red-100
                                      text-red-600
                                      hover:bg-red-200
                                      hover:scale-110
                                      transition
                                    "
                                  >
                                    <Trash2 size={18}/>
                                  </button>
                                )
                              }

                              {
                                u.role === "SUPER_ADMIN" && (
                                  <span className="
                                          px-3
                                          py-1
                                          rounded-full
                                          bg-gray-100
                                          text-gray-500
                                          text-xs
                                          font-medium
                                          ">
                                          Protected
                                 </span>
                                )
                              }

                            </div>
                          </td>
                        )
                      }

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      <ConfirmModal
        open={modalOpen}
        title={modalData.title}
        message={modalData.message}
        confirmText={modalData.confirmText}
        confirmColor={modalData.confirmColor}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          modalData.onConfirm();
          setModalOpen(false);
        }}
      />
      <ResetPasswordModal
        open={resetPasswordOpen}
        user={selectedUser}
        loading={resetPasswordLoading}
        onClose={() => {
          if (resetPasswordLoading) return;

          setResetPasswordOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleResetPasswordForm}
      />
    </div>

  );

};

export default UsersPage;