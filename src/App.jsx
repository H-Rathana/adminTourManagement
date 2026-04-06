import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./pages/Tours";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tours" element={<Tours />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
