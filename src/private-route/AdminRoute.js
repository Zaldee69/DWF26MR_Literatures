import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminPage from "../pages/admin-page/AdminPage";

function AdminRoute() {
  const { state } = useContext(AuthContext);
  console.log(state);
  return state.user.role === "admin" ? <AdminPage /> : <Navigate to="/" />;
}

export default AdminRoute;
