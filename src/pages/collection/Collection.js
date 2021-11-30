import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavbarComp from "../../components/molecules/NavbarComp";
import { API } from "../../config/API";
import Thumbnail from "../../components/atom/Thumbnail";

const Collection = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    API.get("/collections")
      .then((response) => {
        setData(response.data.collectionsData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div>
      <NavbarComp />
      {!isLoading && (
        <Container fluid style={{ padding: "0 100px", paddingTop: "100px" }}>
          <h1
            style={{
              fontFamily: "Times New Roman,",
              color: "#ffff",
              paddingBottom: "20px",
            }}
          >
            My Collections
          </h1>
          <div className="d-flex flex-row gap-5 flex-wrap">
            {data.map((item, index) => {
              return (
                <Thumbnail
                  key={index}
                  author={item.literatures?.author}
                  title={item.literatures?.title}
                  publish={item.literatures?.publication_date}
                  id={item.literatures?.id}
                  attachment={item.literatures?.attachment}
                />
              );
            })}
          </div>
        </Container>
      )}
    </div>
  );
};

export default Collection;
