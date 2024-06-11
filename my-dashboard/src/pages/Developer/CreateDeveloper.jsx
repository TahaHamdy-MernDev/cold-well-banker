import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Dropdown,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "../../components/ImageUploader";
import Api from "../../Api";

// Joi validation schema
const schema = Joi.object({
  name: Joi.object({
    en: Joi.string().required().messages({
      "string.empty": "Name (English) is required",
    }),
    ar: Joi.string().required().messages({
      "string.empty": "Name (Arabic) is required",
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
  areaId: Joi.string().required().messages({
    "string.empty": "Area is required",
  }),
});

export default function CreateDeveloper() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const [areas, setAreas] = useState([]);
  useEffect(() => {

    const fetchAreas = async () => {
      try {
        const response = await Api.get("/area/get-names");
        console.log(response.data.data);
        setAreas(response.data.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);
  const [developerImage, setDeveloperImages] = useState(null);
  const [useRichTextEditor, setUseRichTextEditor] = useState(true);

  const handleFilesSelect = (files) => {
    setDeveloperImages(files);
    console.log("Selected file : ",files);
  };

  const onSubmit = async (data) => {
    data = {
      ...data,
      images:developerImage[0]
    };
console.log(data);
    try {
      const response = await Api.post("/developer/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submission response:", response);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Container>
      <h1>Create Developer</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name (English)</Form.Label>
              <Form.Control
                type="text"
                {...register("name.en")}
                isInvalid={!!errors.name?.en}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.en?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name (Arabic)</Form.Label>
              <Form.Control
                type="text"
                {...register("name.ar")}
                isInvalid={!!errors.name?.ar}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.ar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>

        <Form.Group className="mb-3">
          <Form.Label>Select Area</Form.Label>
          <Controller
            name="areaId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Dropdown onSelect={(areaId) => setValue("areaId", areaId)}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {field.value ? (
                    areas.find((area) => area._id === field.value)?.name.en
                    ) : (
                      "Select Area"
                      )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {areas.map((area) => (
                    <Dropdown.Item key={area._id} eventKey={area._id}>
                      {area.name.en}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.areaId?.message}
          </Form.Control.Feedback>
        </Form.Group>
                </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description (English)</Form.Label>
              <Controller
                name="description.en"
                control={control}
                render={({ field }) =>
                  useRichTextEditor ? (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...field}
                      isInvalid={!!errors.description?.en}
                    />
                  )
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.en?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description (Arabic)</Form.Label>
              <Controller
                name="description.ar"
                control={control}
                render={({ field }) =>
                  useRichTextEditor ? (
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...field}
                      isInvalid={!!errors.description?.ar}
                    />
                  )
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.ar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
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
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>Upload Developer Image</Form.Label>
          <ImageUploader
            maxImages={1}
            name="images"
            onFilesSelect={handleFilesSelect}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Developer
        </Button>
      </Form>
    </Container>
  );
}
