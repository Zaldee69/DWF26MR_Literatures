import { useState, useEffect } from "react";
import NavbarCom from "../../components/molecules/NavbarComp";
import { InputGroup, FormControl, Container } from "react-bootstrap";
import "./AddLiterature.css";
import Button from "@restart/ui/esm/Button";
import { API } from "../../config/API";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";

const EditLiterature = () => {
  const [form, setForm] = useState({
    title: "",
    pages: "",
    publication_date: "",
    author: "",
    attachment: "",
  });

  const { id } = useParams();

  const successNotify = () => toast.success(`Edit literature success`);
  const failedNotify = (msg) => toast.error(msg);

  const getDetailLiteratures = () => {
    API.get(`/literatures/detail/${id}`)
      .then((res) => {
        setForm({
          ...form,
          title: res.data.literaturesData.title,
          pages: res.data.literaturesData.pages,
          publication_date: res.data.literaturesData.publication_date,
          author: res.data.literaturesData.author,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeHandle = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      attachment: e.target.files,
    }));
  };
  const onClickHandle = (e) => {
    if (
      !form.attachment ||
      !form.pages ||
      !form.publication_date ||
      !form.author
    ) {
      failedNotify("Please fill out all field");
    } else {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("pages", form.pages);
      formData.append("publication_date", form.publication_date);
      formData.append("author", form.author);
      formData.set("image", form.attachment[0], form.attachment[0].name);

      API.patch(`/literature/${id}`, formData, config)
        .then(() => {
          successNotify();
        })
        .catch((err) => {
          console.log(err);
          failedNotify(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    getDetailLiteratures();
  }, []);

  return (
    <div className="bg-dark ">
      <NavbarCom />
      <Container className="add-container">
        <h1 className="text-light fs-1 pb-3">Add Literature</h1>
        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Title"
            onChange={onChangeHandle}
            defaultValue={form.title}
            name="title"
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Publication Date"
            onChange={onChangeHandle}
            defaultValue={form.publication_date}
            name="publication_date"
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Pages"
            onChange={onChangeHandle}
            name="pages"
            type="number"
            defaultValue={form.pages}
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Author"
            onChange={onChangeHandle}
            name="author"
            defaultValue={form.author}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            type="file"
            onChange={onChangeHandle}
            name="attachment"
          />
        </InputGroup>
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            onClick={onClickHandle}
            className="btn btn-danger"
          >
            Save
          </Button>
        </div>
      </Container>
      <Toaster />
    </div>
  );
};

export default EditLiterature;
