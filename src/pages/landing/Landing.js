import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Login from "../../components/molecules/auth-modal/Login";
import Register from "../../components/molecules/auth-modal/Register";
import LandingNavbar from "../../components/molecules/LandingNavbar";

import "./Landing.css";

const Landing = () => {
  const [modal, setModal] = useState(false);
  //useState for register modal
  const [registerModal, setRegisterModal] = useState(false);

  const [register, setRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });

  //Open modal function
  const openModalLogin = () => {
    setModal(true);
    setRegisterModal(false);
  };

  const openModalRegister = () => {
    setRegisterModal(true);
    setModal(false);
  };

  //Close modal function
  const closeModalLogin = () => setModal(false);
  const closeModalRegister = () => {
    setRegister({
      fullname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      gender: "",
    });
    setRegisterModal(false);
  };
  return (
    <div>
      <LandingNavbar />
      <Container className="bg-dark" fluid>
        <div className="d-flex flex-row align-items-center  justify-content-between custom-container">
          <div>
            <h1 className="text-light">
              Source <span className="fst-italic"> of </span>intelligence
            </h1>
            <p className="text-light">
              Sign up and receive unlimited accesss to all of your literatur -
              share your literature.
            </p>
            <div className="d-flex gap-2 pt-3">
              <Button onClick={openModalRegister} className="btn btn-danger ">
                Sign Up
              </Button>
              <Button onClick={openModalLogin} className="btn btn-light ">
                Sign In
              </Button>
            </div>
          </div>
          <div>
            <img src="/assets/hero.png"></img>
          </div>
        </div>
        <Login
          modalLogin={modal}
          closeModalLogin={closeModalLogin}
          setRegisterModal={setRegisterModal}
          openModalRegister={openModalRegister}
          register={register}
        />
        <Register
          setModal={setModal}
          closeModalRegister={closeModalRegister}
          setRegisterModal={setRegisterModal}
          registerModal={registerModal}
          openModalLogin={openModalLogin}
          register={register}
          setRegister={setRegister}
        />
      </Container>
    </div>
  );
};

export default Landing;
