import "bootstrap/dist/css/bootstrap.min.css";
import AddLiterature from "./pages/add-literature/AddLiterature";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import { AuthContext } from "./context/AuthContext.js";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/API";
import AuthRoute from "./private-route/AuthRoute";
import LandingRoute from "./private-route/LandingRoute";
import Search from "./pages/search/Search";
import LiteratureDetail from "./pages/detail-literature/LiteratureDetail";
import MyProfile from "./pages/profile/MyProfile";
import Collection from "./pages/collection/Collection";
import AdminPage from "./pages/admin-page/AdminPage";
import AdminRoute from "./private-route/AdminRoute";
import EditLiterature from "./pages/add-literature/EditLiterature";

//init token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  const userAuth = () => {
    API.get("/check-auth")
      .then((response) => {
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        //get user data
        let payload = response.data;

        payload.token = localStorage.token;
        //send data to useContext
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      })
      .catch(() => {
        dispatch({
          type: "AUTH_ERROR",
        });
      });
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {state.isLoading ? (
          "Loading"
        ) : (
          <>
            <Route
              path="/"
              element={
                <LandingRoute>
                  <Landing />
                </LandingRoute>
              }
            />
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/add-literature"
              element={
                <AuthRoute>
                  <AddLiterature />
                </AuthRoute>
              }
            />
            <Route
              path="/literatures/search/:title"
              element={
                <AuthRoute>
                  <Search />
                </AuthRoute>
              }
            />
            <Route
              path="/literature/detail/:id"
              element={
                <AuthRoute>
                  <LiteratureDetail />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <MyProfile />
                </AuthRoute>
              }
            />
            <Route
              path="/collections"
              element={
                <AuthRoute>
                  <Collection />
                </AuthRoute>
              }
            />
            <Route
              path="/admin-page"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-literature/:id"
              element={
                <AuthRoute>
                  <EditLiterature />
                </AuthRoute>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
