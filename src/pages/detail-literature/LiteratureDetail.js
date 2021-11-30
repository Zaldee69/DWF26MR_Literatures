import { Container, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import NavbarComp from "../../components/molecules/NavbarComp";
import { API } from "../../config/API";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const LiteratureDetail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { state } = useContext(AuthContext);

  const successNotify = () => toast.success(`Success add to collections`);
  const failedNotify = () => toast.error(`Collections already exist`);

  const getLiterature = () => {
    setIsLoading(true);
    API.get(`/literatures/detail/${id}`)
      .then((response) => {
        setData(response.data.literaturesData);
        console.log(response.data.literaturesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const addCollection = (e) => {
    e.preventDefault();

    const literature = {
      id,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    API.post("/collections", literature, config)
      .then(() => successNotify())
      .catch((error) => {
        failedNotify();
      });
  };

  const downloader = async (fileURL, filename) => {
    try {
      await fetch(fileURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${filename}.pdf`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLiterature();
  }, []);

  return (
    <div>
      <NavbarComp />
      {!isLoading && (
        <Container
          style={{ width: "80%" }}
          className="d-flex flex-row gap-5 justify-content-center pt-5"
          fluid
        >
          <iframe
            style={{ width: "400px", height: "543px" }}
            src={data?.attachment}
            alt=""
          ></iframe>
          <div>
            <div style={{ height: "35px" }} className="d-flex gap-5   flex-row">
              <h1 className="text-light fs-2">{data?.title}</h1>
              {state.user?.id !== data.users?.id && (
                <Button
                  onClick={addCollection}
                  className="btn btn-danger px-2 fw-xl shadow-none"
                >
                  Add My Collection <img alt="" src="/assets/book.png"></img>
                </Button>
              )}
            </div>
            <p className="text-secondary">{data?.author}</p>
            <div className="pt-4">
              {" "}
              <h4 className="text-light">Publication Date</h4>
              <p className="text-secondary">{data?.publication_date}</p>
            </div>
            <div className="pt-4">
              <h4 className="text-light">Pages</h4>
              <p className="text-secondary">{data?.pages}</p>
            </div>
            <div className="pt-4">
              {" "}
              <h4 className="text-danger">ISBN</h4>
              <p className="text-secondary">{data?.isbn}</p>
            </div>
            <Button
              onClick={() => downloader(data?.attachment, data?.attachment)}
              className="btn btn-danger mt-4 shadow-none"
            >
              Download <img src="/assets/do.png"></img>
            </Button>
          </div>
          <Toaster />
        </Container>
      )}
    </div>
  );
};

export default LiteratureDetail;
