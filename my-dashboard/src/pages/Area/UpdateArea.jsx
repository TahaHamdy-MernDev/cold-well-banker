import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import ImageUploader from "../../components/ImageUploader";
import Api from "../../Api";
import { notify } from "../../components/Toaster";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const schema = Joi.object({
  title: Joi.object({
    en: Joi.string().required().messages({
      "string.empty": "Title (English) is required",
    }),
    ar: Joi.string().required().messages({
      "string.empty": "Title (Arabic) is required",
    }),
  }).required(),
  description: Joi.object({
    en: Joi.string().required().messages({
      "string.empty": "Description (English) is required",
    }),
    ar: Joi.string().required().messages({
      "string.empty": "Description (Arabic) is required",
    }),
  }).required(),
  callUsNumber: Joi.string().required().messages({
    "string.empty": "Call Us Number is required",
  }),
});

export default function UpdateArea() {
  const { id } = useParams();
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const [useRichTextEditor, setUseRichTextEditor] = useState(true);
  const [areaImages, setAreaImages] = useState([]);
  const [oldImages , setOldImages]=useState(true)
  const [area, setArea] = useState(null);
  const handleFilesSelect = (files) => {
    setAreaImages(files);
    setOldImages(false)
    console.log("Selected files:", files);
  };

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await Api.get(`/area/get/${id}`);
        const data = response.data.data.area;
        setArea(data);
        console.log(data);
        setValue("title.en", data.title.en);
        setValue("title.ar", data.title.ar);
        setValue("description.en", data.description.en);
        setValue("description.ar", data.description.ar);
        setValue("callUsNumber", data.callUsNumber);
      } catch (error) {
        console.error("Failed to fetch area data:", error);
      }
    };

    fetchArea();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("Submitting your data...");
    console.log(areaImages);
    data = { ...data, images: areaImages[0] };
    try {
      await Api.put(`/area/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.update(loadingToastId, {
        render: "Successfully Updated!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      // history.push("/areas"); // Redirect to areas list or appropriate page after update
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Container>
      <h1>Update Area</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title (English)</Form.Label>
              <Form.Control
                type="text"
                {...register("title.en")}
                isInvalid={!!errors.title?.en}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.en?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title (Arabic)</Form.Label>
              <Form.Control
                type="text"
                {...register("title.ar")}
                isInvalid={!!errors.title?.ar}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.ar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <ToggleButtonGroup
            type="radio"
            name="richTextEditorOptions"
            defaultValue={useRichTextEditor ? 1 : 2}
            className="mb-3 row d-flex"
          >
            <ToggleButton
              id="tbg-radio-1"
              value={1}
              variant="outline-primary"
              onClick={() => setUseRichTextEditor(true)}
              className={`px-4 col-6 py-2 ${useRichTextEditor ? "active" : ""}`}
            >
              Enable Text Editor
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              variant="outline-secondary"
              onClick={() => setUseRichTextEditor(false)}
              className={`px-4 col-6 py-2 ${!useRichTextEditor ? "active" : ""}`}
            >
              Disable Text Editor
            </ToggleButton>
          </ToggleButtonGroup>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description (English)</Form.Label>
              {useRichTextEditor ? (
                <ReactQuill
                  theme="snow"
                  value={watch("description.en") || ""}
                  onChange={(value) => setValue("description.en", value)}
                  onBlur={() => {}}
                />
              ) : (
                <Form.Control
                  as="textarea"
                  rows={6}
                  {...register("description.en")}
                  isInvalid={!!errors.description?.en}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors.description?.en?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description (Arabic)</Form.Label>
              {useRichTextEditor ? (
                <ReactQuill
                  theme="snow"
                  value={watch("description.ar") || ""}
                  onChange={(value) => setValue("description.ar", value)}
                  onBlur={() => {}}
                />
              ) : (
                <Form.Control
                  as="textarea"
                  rows={6}
                  {...register("description.ar")}
                  isInvalid={!!errors.description?.ar}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors.description?.ar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group className="mb-3">
          <Form.Label>Rich Text Editor</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="richTextEditorOptions"
            defaultValue={useRichTextEditor ? 1 : 2}
            className="mb-3"
          >
            <ToggleButton
              id="tbg-radio-1"
              value={1}
              onClick={() => setUseRichTextEditor(true)}
            >
              Enable Rich Text Editor
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              onClick={() => setUseRichTextEditor(false)}
            >
              Disable Rich Text Editor
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Call Us Number</Form.Label>
          <Form.Control
            type="text"
            {...register("callUsNumber")}
            isInvalid={!!errors.callUsNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.callUsNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <ImageUploader
            maxImages={1}
            name="images"
            onFilesSelect={handleFilesSelect}
          />

          {oldImages && area?.images.map((item, index) => {
       
            return (
              <img
                key={index + 1}
                src={`${import.meta.env.VITE_IMAGE_ORIGIN}/${item.url}`}
                alt={`Preview ${index + 1}`}
                style={{ maxWidth: "100px", marginRight: "10px" }}
              />
            );
          })}
        </Row>

        <Button variant="primary" className=" mt-3" type="submit">
          Update Area
        </Button>
      </Form>
    </Container>
  );
}
