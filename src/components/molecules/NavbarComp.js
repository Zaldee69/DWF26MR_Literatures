import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
//Hooks
import { useContext } from "react";

//Global state
import { AuthContext } from "../../context/AuthContext";

//
import { Link, useNavigate, NavLink } from "react-router-dom";

const NavbarComp = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  //Logout handler
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <Navbar className="align-items-center" bg="dark" expand="lg">
      <Container
        style={{ padding: "0 100px" }}
        className="m-0  align-items-center"
        fluid
      >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto gap-4 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Item>
              <NavLink to="/profile" className="text-light nav-item">
                Profile
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/collections" className="text-light nav-item">
                My Collections
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/add-literature" className="text-light nav-item">
                Add Literature
              </NavLink>
            </Nav.Item>
            <Nav
              onClick={(e) => logOutHandler(e)}
              className="text-light"
              style={{ cursor: "pointer" }}
              href="#"
            >
              Logout
            </Nav>
          </Nav>
          <Link to="/home">
            <Nav className="text-light">
              <img alt="apa" className="pb-2" src="/assets/grp.png"></img>
            </Nav>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
