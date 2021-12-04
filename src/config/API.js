import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_API_URL ||
    "https://literatures-app.herokuapp.com/api/v1/" ||
    "http://localhost:3500/api/v1/",
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
