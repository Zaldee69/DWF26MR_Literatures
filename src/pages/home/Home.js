import { useState, useContext } from "react";
import NavbarComp from "../../components/molecules/NavbarComp";
import { InputGroup, FormControl, Container } from "react-bootstrap";
import "./Home.css";
import Button from "@restart/ui/esm/Button";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import LandingNavbar from "../../components/molecules/LandingNavbar";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [search, setSearch] = useState("");
  const { state } = useContext(AuthContext);

  const navigate = useNavigate();

  const onClickHandle = () => {
    if (search === "") {
      return;
    } else {
      navigate(`/literatures/search/${search}`);
    }
  };

  return (
    <div className="bg-dark ">
      {state.user.role === "admin" ? <LandingNavbar /> : <NavbarComp />}

      <Container className="d-flex gap-5 justify-content-center align-items-center flex-column home-container">
        <div className="m-auto">
          <img alt="" src="/assets/Vector.png"></img>
        </div>
        <div>
          <div className="mb-3 d-inline-flex gap-1">
            <InputGroup>
              <FormControl
                style={{ width: "700px" }}
                placeholder="Search for literature"
                aria-label="Last name"
                className="shadow-none bg-secondary outline-none d-inline text-light"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Button onClick={onClickHandle} className="btn btn-danger ">
              <img alt="" src="/assets/se.png"></img>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
