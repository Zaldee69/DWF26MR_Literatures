import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import Thumbnail from "../../components/atom/Thumbnail";
import NavbarComp from "../../components/molecules/NavbarComp";
import { API } from "../../config/API";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [options, setOptions] = useState("");

  const query = useParams();

  const onChangeHandle = (e) => {
    setSearch(e.target.value);
  };

  const getLiteratures = () => {
    setIsLoading(true);
    API.get(`/literatures/search?title=${search === "" ? query.title : search}`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getLiteratures();
  }, []);

  return (
    <>
      <NavbarComp />
      {!isloading && (
        <>
          <div
            style={{ width: "35%", paddingLeft: "100px" }}
            className="mb-3 mt-5 d-inline-flex gap-1 "
          >
            <InputGroup>
              <FormControl
                placeholder="Search for literature"
                aria-label="Last name"
                className="shadow-none bg-secondary outline-none d-inline text-light"
                onChange={onChangeHandle}
              />
            </InputGroup>
            <Button onClick={getLiteratures} className="btn btn-danger ">
              <img src="/assets/se.png"></img>
            </Button>
          </div>
          <Container
            style={{ paddingLeft: "100px" }}
            className=" flex-wrap d-flex mt-5 flex-row gap-5"
            fluid
          >
            {data.length === 0 ? (
              <>
                <div>
                  <p className="text-danger">Choose Date</p>
                  <div className="input-group mb-3">
                    <select
                      onChange={(e) => setOptions(e.target.value)}
                      className="bg-secondary text-light rounded ps-4 shadow-none form-select"
                      id="inputGroupSelect01"
                    >
                      <option value="">Anytime</option>
                      <option value="2020">Since 2020</option>
                      <option value="2021">Since 2021</option>
                      <option value="2022">Since 2022</option>
                    </select>
                  </div>
                </div>
                <div
                  style={{ paddingLeft: "450px" }}
                  className="d-flex flex-column gap-5 justify-content-center"
                >
                  <img
                    style={{ width: "500px" }}
                    src="/assets/undraw1.svg"
                  ></img>
                  <h1 className="text-danger text-center">
                    Oppss {search === "" ? query.title : search} not found
                  </h1>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-danger">Anytime</p>
                  <div className="input-group mb-3">
                    <select
                      onChange={(e) => setOptions(e.target.value)}
                      className="bg-secondary rounded ps-4 shadow-none form-select"
                      id="inputGroupSelect01"
                    >
                      <option value="">Anytime</option>
                      <option value="2020">Since 2020</option>
                      <option value="2021">Since 2021</option>
                      <option value="2022">Since 2022</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-row flex-wrap gap-5">
                  {data
                    ?.filter((item) => {
                      if (item.publication_date.includes(options)) {
                        return item;
                      } else if (!options) {
                        return item;
                      }
                    })
                    .map((item) => {
                      return (
                        <Thumbnail
                          title={item.title}
                          author={item.author}
                          publish={item.publication_date}
                          id={item.id}
                          attachment={item.attachment}
                        />
                      );
                    })}
                </div>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Search;
