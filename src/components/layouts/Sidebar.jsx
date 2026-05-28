import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookCheck,
  Map,
  CreditCard,
  LogOut,
  Users,
  UserCircle2,
} from "lucide-react";

const Sidebar = () => {

  const navigate =
    useNavigate();

  // ✅ LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate(
      "/admin-login"
    );

  };

  // ✅ ACTIVE LINK STYLE
  const navClass = ({
    isActive,
  }) =>

    `flex items-center gap-3
    p-3 rounded-xl
    transition-all duration-300
    ${
      isActive
        ? "bg-sky-600 shadow-lg text-white"
        : "hover:bg-slate-800 text-slate-300"
    }`;

  return (

    <div
      className="
        h-screen
        w-64
        sticky
        top-0
        left-0
        bg-slate-900
        text-white
        flex
        flex-col
        justify-between
        shadow-2xl
      "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="p-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
           🌴 WanderEscape
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Admin Dashboard
          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 p-4">

          <NavLink
            to="/dashboard"
            className={navClass}
          >

            <LayoutDashboard
              size={20}
            />

            <span>
              Overview
            </span>

          </NavLink>

          <NavLink
            to="/bookings"
            className={navClass}
          >

            <BookCheck
              size={20}
            />

            <span>
              Bookings
            </span>

          </NavLink>

          <NavLink
            to="/tours"
            className={navClass}
          >

            <Map size={20} />

            <span>
              Tours
            </span>

          </NavLink>
          <NavLink
            to="/payments"
            className={navClass}
          >

            <CreditCard size={20} />

            <span>
              Payments
            </span>

        </NavLink>
        <NavLink
          to="/users"
          className={navClass}
        >

          <Users size={20} />

          <span>
            Users
          </span>

      </NavLink>
        </nav>

      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t border-slate-800">

        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-3 mb-4">

          <UserCircle2
            size={38}
          />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-slate-400">
              Tourism Manager
            </p>

          </div>

        </div>
        
        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            flex items-center
            justify-center gap-2
            w-full
            bg-red-500
            hover:bg-red-600
            transition
            py-3
            rounded-xl
            font-medium
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>

  );

};

export default Sidebar;