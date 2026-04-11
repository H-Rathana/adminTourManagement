import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./pages/Tours";
import Bookings from "./pages/Bookings";
import Layout from "./components/layouts/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
