import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { QrCode } from "lucide-react";
import {
  LayoutDashboard,
  BookCheck,
  Map,
  CreditCard,
  LogOut,
  Users,
  FileBarChart,
  UserCircle2,
  History,
  MessageSquare,
} from "lucide-react";
import logo from "../../assets/logopng.png";

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
  const navClass = ({ isActive }) =>
  `
  flex items-center gap-3
  px-4 py-3
  rounded-2xl
  transition-all duration-300
  font-medium

  ${
    isActive
      ? `
      bg-gradient-to-r
      from-orange-500
      to-amber-400
      text-white
      shadow-lg
      shadow-orange-500/20
      `
      : `
      text-slate-300
      hover:bg-slate-800/70
      hover:text-white
      `
  }
`;

  return (

    <div
  className="
    fixed
    left-0
    top-0
    h-screen
    w-72
    bg-[#0F172A]
    text-white
    flex
    flex-col
    justify-between
    shadow-2xl
    z-50
  "
>

      {/* TOP */}
      <div>

        {/* LOGO */}
          <div
            className="
            bg-gradient-to-b
from-orange-400
via-orange-500
to-[#16213E]
            p-4
            "
          >
            <img
              src={logo}
              alt="WanderEscape"
              className="
              w-32
              mx-auto
              object-contain
              "
            />
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
            to="/checkin"
            className={navClass}
          >
            <QrCode size={20} />
            <span>Check-In</span>
        </NavLink>
        <NavLink
            to="/admin/checkin-history"
            className={navClass}
          >
            <History size={20} />
            <span>
              Check-In History
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
        <NavLink
          to="/reviews"
          className={navClass}
        >

          <MessageSquare size={20} />

          <span>
            Reviews
          </span>

      </NavLink>
      <NavLink
          to="/reports"
          className={navClass}
        >
          <FileBarChart size={20} />
          <span>Reports</span>
        </NavLink>
        </nav>

      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t border-slate-800">

        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-3 mb-4">

          <div
            className="
            h-12
            w-12
            rounded-full
            bg-gradient-to-br
            from-orange-500
            to-amber-400
            flex
            items-center
            justify-center
            "
          >
            <UserCircle2 size={24} />
          </div>

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
          w-full
          flex
          items-center
          justify-center
          gap-2

          py-3

          rounded-2xl

          bg-gradient-to-r
          from-red-500
          to-orange-500

          hover:scale-[1.02]
          transition-all

          font-semibold
          shadow-lg
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