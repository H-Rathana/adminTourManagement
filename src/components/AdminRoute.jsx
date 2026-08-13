import {
  Navigate,
} from "react-router-dom";

const AdminRoute = ({
  children,
}) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // ❌ NOT LOGIN
  if (!user) {

    return (
      <Navigate
        to="/admin-login"
      />
    );

  }

  // ❌ NOT ADMIN
 if (
    user.role !== "admin" &&
    user.role !== "SUPER_ADMIN"
) {
    return <Navigate to="/admin-login" />;
}

  // ✅ ADMIN
  return children;

};

export default AdminRoute;