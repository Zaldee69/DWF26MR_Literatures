import { useState, useContext, useEffect } from "react";
import { Container, Button, Tab, Tabs } from "react-bootstrap";
import NavbarComp from "../../components/molecules/NavbarComp";
import "./MyProfile.css";
import { AuthContext } from "../../context/AuthContext";
import Thumbnail from "../../components/atom/Thumbnail";
import { API } from "../../config/API";

const MyProfile = () => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    image: "",
  });
  const [preview, setPreview] = useState("");

  const getLiteratures = () => {
    API.get("/literatures/user")
      .then((response) => {
        setData(response.data.literaturesData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function for set setForm
  const onChangeHandler = (e) => {
    e.preventDefault();
    setForm({
      image: e.target.files,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const onClickHandler = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);

      //patching user data
      await API.patch("/users", formData, config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLiteratures();
  }, []);

  const republishLiterature = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const status = {
      status: "Waiting Approve",
    };

    API.patch(`/literatures/${id}`, status, config)
      .then(() => {
        getLiteratures();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLiterature = (id) => {
    API.delete(`/literatures/${id}`)
      .then((res) => {
        console.log(res);
        getLiteratures();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavbarComp />
      <Container fluid className="profile-container ps-0 bg-dark ">
        <Container className="d-flex px-5 py-4  data-container bg-secondary rounded justify-content-between">
          <div className="profile-content px-4">
            <h1 className="mb-4 text-light">Profile</h1>
            <div className="d-flex align-items-center gap-3 mb-4 ">
              <img alt="" className="img-1" src="/assets/enve.png"></img>
              <div>
                <p className="fw-bold text-light">{state.user?.email}</p>
                <small className="text-light">Email</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-4 ">
              <img alt="" src="/assets/male.png"></img>
              <div>
                <p className="fw-bold text-light">{state.user?.gender}</p>
                <small className="text-light">Gender</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-4 ">
              <img alt="" src="/assets/phone.png"></img>
              <div>
                <p className="fw-bold text-light">{state.user?.phone}</p>
                <small className="text-light">Mobile Phone</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-4 ">
              <img alt="" src="/assets/map.png"></img>
              <div>
                <p className="fw-bold text-light">{state.user?.address}</p>
                <small className="text-light">Adress</small>
              </div>
            </div>
          </div>
          <div className="d-flex profile-img flex-column gap-2 position-relative mb-4">
            <input
              onChange={onChangeHandler}
              name="image"
              type="file"
              id="actual-btn"
              hidden
            />
            <label for="actual-btn">
              <img
                alt=""
                className="position-absolute camera"
                src="/assets/camera.png"
              ></img>
            </label>

            {preview ? (
              <img
                alt=""
                style={{ width: "350px", height: "350px" }}
                src={preview}
              ></img>
            ) : (
              <img
                alt=""
                style={{ width: "350px", height: "350px" }}
                src={state.user?.profile_pic}
              ></img>
            )}

            <Button
              className="btn btn-danger text-light fw-bold"
              id="actual-btn"
              onClick={onClickHandler}
            >
              Save
            </Button>
          </div>
        </Container>
        <h1 className="history-trip">Literature</h1>

        <Container>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Approve">
              <div className="d-flex flex-row gap-4">
                {data
                  .filter((item) => {
                    if (item.status === "Approve") {
                      return item;
                    }
                  })
                  .map((item) => {
                    return (
                      <Thumbnail
                        author={item.author}
                        publish={item.publication_date}
                        id={item.id}
                        title={item.title}
                        attachment={item.attachment}
                        status={item.status}
                        republish={republishLiterature}
                        deleteLiterature={deleteLiterature}
                      />
                    );
                  })}
              </div>
            </Tab>
            <Tab className="px-3" eventKey="profile" title="Waiting Approve">
              <div className="d-flex flex-row gap-4">
                {data
                  .filter((item) => {
                    if (item.status === "Waiting Approve") {
                      return item;
                    }
                  })
                  .map((item) => {
                    return (
                      <Thumbnail
                        author={item.author}
                        publish={item.publication_date}
                        id={item.id}
                        title={item.title}
                        attachment={item.attachment}
                        status={item.status}
                        republish={republishLiterature}
                        deleteLiterature={deleteLiterature}
                      />
                    );
                  })}
              </div>
            </Tab>
            <Tab eventKey="contact" title="Cancel">
              <div className="d-flex flex-row gap-4">
                {data
                  .filter((item) => {
                    if (item.status === "Cancel") {
                      return item;
                    }
                  })
                  .map((item) => {
                    return (
                      <Thumbnail
                        author={item.author}
                        publish={item.publication_date}
                        id={item.id}
                        title={item.title}
                        attachment={item.attachment}
                        status={item.status}
                        republish={republishLiterature}
                        deleteLiterature={deleteLiterature}
                      />
                    );
                  })}
              </div>
            </Tab>
          </Tabs>
        </Container>
      </Container>
    </div>
  );
};

export default MyProfile;
