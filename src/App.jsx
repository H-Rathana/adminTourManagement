import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./pages/Tours";
import Bookings from "./pages/Bookings";
import Layout from "./components/layouts/Layout";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tours" element={<Tours />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
