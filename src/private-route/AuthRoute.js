import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AuthRoute({ children }) {
  const { state } = useContext(AuthContext);
  return state.isLogin ? children : <Navigate to="/" />;
}

export default AuthRoute;
