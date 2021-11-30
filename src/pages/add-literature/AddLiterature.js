import { useState } from "react";
import NavbarCom from "../../components/molecules/NavbarComp";
import { InputGroup, FormControl, Container } from "react-bootstrap";
import "./AddLiterature.css";
import Button from "@restart/ui/esm/Button";
import { API } from "../../config/API";
import toast, { Toaster } from "react-hot-toast";

const AddLiterature = () => {
  const [form, setForm] = useState({
    title: "",
    pages: "",
    publication_date: "",
    author: "",
    attachment: "",
  });

  const successNotify = () => toast.success(`Add literature success`);
  const failedNotify = () => toast.error(`Add literature failed`);

  const onChangeHandle = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      attachment: e.target.files,
    }));
  };

  const onClickHandle = async (e) => {
    if (
      !form.attachment ||
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
      await API.post("/literatures", formData, config)
        .then(() => {
          setForm({
            title: "",
            pages: "",
            publication_date: "",
            author: "",
            attachment: "",
          });
          successNotify();
        })
        .catch((err) => {
          failedNotify(err.response.data.message);
        });
    }
  };

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
            value={form.title}
            name="title"
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Publication Date"
            onChange={onChangeHandle}
            value={form.publication_date}
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
            value={form.pages}
          />
        </InputGroup>

        <InputGroup className="mb-4">
          <FormControl
            className="bg-secondary text-light shadow-none"
            placeholder="Author"
            onChange={onChangeHandle}
            name="author"
            value={form.author}
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
            Add Literature
          </Button>
        </div>
      </Container>
      <Toaster />
    </div>
  );
};

export default AddLiterature;
