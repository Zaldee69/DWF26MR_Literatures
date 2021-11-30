import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Landing from "../pages/landing/Landing";

function LandingRoute() {
  const { state } = useContext(AuthContext);
  return !state.isLogin ? <Landing /> : <Navigate to="/home" />;
}

export default LandingRoute;
