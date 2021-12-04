import { useState, useEffect } from "react";
import LandingNavbar from "../../components/molecules/LandingNavbar";
import { Container, Table } from "react-bootstrap";
import { API } from "../../config/API";
import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [data, setData] = useState([]);

  const getLiterature = () => {
    API.get("/literatures")
      .then((result) => {
        setData(result.data.literaturesData);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLiterature();
  }, []);

  const approveLiteratures = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const status = {
      status: "Approve",
    };

    API.patch(`/literatures/${id}`, status, config)
      .then((response) => {
        getLiterature();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelLiteratures = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const status = {
      status: "Cancel",
    };

    API.patch(`/literatures/${id}`, status, config)
      .then((response) => {
        getLiterature();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ paddingBottom: " 460px" }} className="bg-light">
      <LandingNavbar />
      <Container fluid style={{ padding: "110px" }}>
        <h2 className="pb-2">Book Verification</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>User Or Author</th>
              <th>ISBN</th>
              <th>Literature</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.author}</td>
                  <td>{item.isbn} </td>
                  <td>
                    {" "}
                    <a className="text-primary" href={item.attachment}>
                      {item.title}
                    </a>{" "}
                  </td>
                  <td
                    className={
                      item.status === "Waiting Approve"
                        ? "text-warning"
                        : item.status === "Cancel"
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {item.status}
                  </td>
                  <td className="d-flex justify-content-center">
                    {item.status === "Waiting Approve" ? (
                      <div className="d-flex flex-row gap-2">
                        <Button
                          onClick={() => cancelLiteratures(item.id)}
                          className="btn btn-danger shadow-none"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => approveLiteratures(item.id)}
                          className="btn btn-success shadow-none"
                        >
                          Approve
                        </Button>
                      </div>
                    ) : item.status === "Approve" ? (
                      <img
                        alt=""
                        style={{ width: "34px" }}
                        src="/assets/c.png"
                      ></img>
                    ) : (
                      <img alt="" src="/assets/x.png"></img>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminPage;
