import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Thumbnail = ({
  title,
  publish,
  author,
  id,
  attachment,
  status,
  deleteLiterature,
  republish,
}) => {
  const navigate = useNavigate();

  return (
    <div id={id} className="rounded">
      <div>
        <iframe
          className="rounded"
          style={{ height: "400px" }}
          src={attachment}
        ></iframe>

        <Link to={`/literature/detail/${id}`}>
          <h4
            style={{ fontFamily: "Times New Roman" }}
            className="text-light pt-2"
          >
            {title}
          </h4>
        </Link>
        <div
          style={{ fontFamily: "Times New Roman" }}
          className="d-flex flex-row text-secondary justify-content-between"
        >
          <small>{author}</small>
          <small>{publish}</small>
        </div>
        {status === "Cancel" && (
          <>
            {/* <p className="text-danger">Cancel By Admin</p> */}
            <div className="d-flex gap-2 ">
              <Button
                onClick={() => republish(id)}
                className="shadow-none"
                variant="success"
              >
                Republish
              </Button>
              <Button
                onClick={() => deleteLiterature(id)}
                className="shadow-none"
                variant="danger"
              >
                Delete
              </Button>
              <Button
                onClick={() => navigate(`/edit-literature/${id}`)}
                className="shadow-none"
                variant="warning"
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
