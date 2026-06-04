
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
    const location = useLocation();
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-72 bg-gray-100 min-h-screen">
        {/* <Navbar/> */}

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ y: 1, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;