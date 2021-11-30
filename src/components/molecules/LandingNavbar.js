import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import DropdownComp from "../atom/Dropdown";
import { AuthContext } from "../../context/AuthContext";

const LandingNavbar = () => {
  const { state } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ padding: "0 100px", height: "100px" }} fluid>
        <img src="/assets/grp.png"></img>
        {state.isLogin && <DropdownComp />}
      </Container>
    </Navbar>
  );
};

export default LandingNavbar;
