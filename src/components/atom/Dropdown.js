import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Dropdown.css";

const DropdownComp = () => {
  const { state, dispatch } = useContext(AuthContext);

  //function for handling logout
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <div className="dropdown p-5  ">
        <img alt="" className="polygon " src="assets/Polygon.png" />

        <div className="small-profile position-relative">
          <img src="assets/download.png" alt="Profile" />
        </div>
        <div className="dropdown-content py-3 px-3">
          <div className="desc d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-2">
              <img alt="" src="/assets/buk.png"></img>
              <Link to="/admin-page">
                <a href className="fw-bold text-dark">
                  Literature
                </a>
              </Link>
            </div>
            <div
              onClick={logOutHandler}
              className="d-flex align-items-center po-hover gap-2"
            >
              <img alt="" src="/assets/logout.png"></img>
              <a href className="fw-bold text-dark">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownComp;
