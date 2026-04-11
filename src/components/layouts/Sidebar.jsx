import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-auto w-64  bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold p-5">🌴 WanderEscape</h1>

        <nav className="flex flex-col gap-2 px-4">
          <Link to="/dashboard" className="p-2 rounded hover:bg-sky-700 ">
            📊Overview
          </Link>
          <Link to="/bookings" className="p-2 rounded hover:bg-sky-700 ">
            📋Bookings
          </Link>
          <Link to="/tours" className="p-2 rounded hover:bg-sky-700 ">
            🗺️Tours
          </Link>     
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <p>Admin</p>
      </div>
    </div>
  );
};

export default Sidebar;