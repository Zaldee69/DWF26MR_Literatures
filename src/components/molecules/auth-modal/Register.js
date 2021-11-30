//Bootstrap component
import { Button, Modal, Form } from "react-bootstrap";

import { API } from "../../../config/API";

import toast, { Toaster } from "react-hot-toast";

const Register = ({
  registerModal,
  closeModalRegister,
  openModalLogin,
  setRegisterModal,
  setModal,
  register,
  setRegister,
}) => {
  const registerOnChangeHandler = (e) => {
    e.preventDefault();
    setRegister((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const failedNotify = (text) => toast.error(text);

  const registerSubmitHandler = (e) => {
    if (
      !register.fullname ||
      !register.email ||
      !register.password ||
      !register.gender ||
      !register.address ||
      !register.address
    ) {
      e.preventDefault();
      failedNotify("Please fill out all field");
    } else {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(register);

      API.post("/register", body, config)
        .then((res) => {
          setRegisterModal((prevstate) => ({
            ...prevstate,
            fullname: "",
            phone: "",
            address: "",
            gender: "",
          }));

          setRegisterModal(false);
          setModal(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          failedNotify(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <Modal show={registerModal}>
        <Modal.Body className="modal-content position-relative bg-dark">
          <div
            style={{ top: "120px", left: "170px" }}
            className="text-center position-absolute"
          ></div>
          <div className="flex-row justify-content-between align-items-center py-4 d-flex">
            <h2 className="text-center text-light">Register</h2>
            <button
              type="button"
              class="btn-close bg-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModalRegister}
              required
            ></button>
          </div>

          <Form>
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className="fw-bold text-light">Fullname</Form.Label>
              <Form.Control
                name="fullname"
                onChange={registerOnChangeHandler}
                type="text"
                required
                className="bg-secondary shadow-none"
                defaultValue={register.fullname}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="fw-bold text-light">
                Email address
              </Form.Label>
              <Form.Control
                onChange={registerOnChangeHandler}
                type="email"
                name="email"
                className="bg-secondary shadow-none"
                required
                defaultValue={register.email}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-bold text-light">Password</Form.Label>
              <Form.Control
                onChange={registerOnChangeHandler}
                type="password"
                name="password"
                className="bg-secondary shadow-none"
                required
                defaultValue={register.password}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPhone">
              <Form.Label className="fw-bold text-light">Phone</Form.Label>
              <Form.Control
                onChange={registerOnChangeHandler}
                name="phone"
                type="text"
                required
                className="bg-secondary shadow-none"
                defaultValue={register.phone}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="fw-bold text-light">Address</Form.Label>
              <Form.Control
                onChange={registerOnChangeHandler}
                as="textarea"
                name="address"
                rows={3}
                className="bg-secondary shadow-none"
                defaultValue={register.address}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Form.Group className="mb-4" controlId="gender">
              <Form.Label className="fw-bold text-light">Gender</Form.Label>
              <Form.Control
                onChange={registerOnChangeHandler}
                name="gender"
                type="text"
                required
                className="bg-secondary shadow-none"
                defaultValue={register.gender}
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2 ">
              <Button
                className="text-white fw-bold"
                variant="danger"
                type="submit"
                onClick={registerSubmitHandler}
              >
                Submit
              </Button>
              <small className="text-center text-danger">
                Have an account ? click{" "}
                <a href onClick={openModalLogin}>
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

export default Register;
