import React from "react";
import { Link } from "react-router-dom";

const Thumbnail = ({ title, publish, author, id, attachment }) => {
  return (
    <div id={id} className="rounded">
      <div className="thumbnail-container rounded ">
        <iframe
          className="rounded"
          style={{ height: "270px" }}
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
      </div>
    </div>
  );
};

export default Thumbnail;
