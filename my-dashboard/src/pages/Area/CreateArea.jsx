import React, { useState} from "react";
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

export default function CreateArea() {
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
  const [areaImages, setAreaImages] = useState(null);
  const handleFilesSelect = (files) => {
    setAreaImages(files);
    console.log("Selected files:", files);
  };
  const onSubmit = async (data) => {
    data = { ...data, images: areaImages[0] };
    try {
      await Api.post("/area/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Container>
      <h1>Create Area</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader
          maxImages={1}
          name="images"
          onFilesSelect={handleFilesSelect}
        />
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
                  rows={3}
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
                  rows={3}
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

    

        <Button variant="primary" type="submit">
          Create Area
        </Button>
      </Form>
    </Container>
  );
}
