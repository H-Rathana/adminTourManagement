import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./pages/Tours";
import Bookings from "./pages/Bookings";
import Layout from "./components/layouts/Layout";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import Payments from "./pages/Payments";
import UsersPage from "./pages/Users";
import Reports from "./pages/Reports";
import CheckInScanner from "./pages/CheckInScanner";
import CheckInHistory from "./pages/CheckInHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />
        <Route
          path="/"
          element={ 
              <AdminRoute>
                <Layout />
              </AdminRoute>}
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="tours"
            element={<Tours />}
          />

          <Route
            path="bookings"
            element={<Bookings />}
          />
          <Route
            path="payments"
            element={<Payments/>}
          />
          <Route
            path="users"
            element={<UsersPage />}
          />
          <Route
            path="reports"
            element={<Reports />}
          />
          <Route
            path="/checkin"
            element={<CheckInScanner/>}
          />
          <Route
          path="/admin/checkin-history"
          element={<CheckInHistory/>}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
