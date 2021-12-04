import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { API } from "../../../config/API";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = ({
  modalLogin,
  openModalRegister,
  closeModalLogin,
  register,
}) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const failedNotify = (text) => toast.error(text);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginOnChangeHandler = (e) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginOnClickHandler = (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      failedNotify("Please fill out all field");
    } else {
      e.preventDefault();

      //variabel for configuration content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //convert userLogin data to string
      const body = JSON.stringify(login);
      //insert data user to database
      API.post("/login", body, config)
        .then((response) => {
          if (response?.status === 200) {
            //send data to AuthContext
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: response.data,
            });
          }

          navigate("/home");
        })
        .catch((err) => {
          failedNotify(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <Modal show={modalLogin}>
        <Modal.Body className="modal-content bg-dark">
          <div className="d-flex flex-row justify-content-between py-4 align-content-center">
            <h2 className="text-center text-light ">Login</h2>
            <button
              type="button"
              class="btn-close bg-light"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModalLogin}
            ></button>
          </div>

          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-light">
                Email address
              </Form.Label>
              <Form.Control
                className="bg-secondary text-light shadow-none"
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={login.email === "" ? register.email : login.email}
                onChange={loginOnChangeHandler}
              />
              <p
                className="text-danger pt-1 ps-1"
                style={{ fontSize: "12px" }}
              ></p>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-light">Password</Form.Label>
              <Form.Control
                className="bg-secondary text-light shadow-none"
                placeholder="Password"
                name="password"
                type="password"
                defaultValue={
                  login.password === "" ? register.password : login.password
                }
                onChange={loginOnChangeHandler}
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2 ">
              <Button
                className="text-light fw-bold"
                variant="danger"
                type="submit"
                required
                onClick={loginOnClickHandler}
              >
                Submit
              </Button>
              <small className="text-center text-danger">
                Don't have an account ? click{" "}
                <a href onClick={() => openModalRegister()}>
                  Here
                </a>
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Toaster />
    </div>
  );
};

export default Login;
