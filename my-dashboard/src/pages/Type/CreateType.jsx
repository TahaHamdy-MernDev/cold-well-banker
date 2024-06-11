import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Api from "../../Api";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { notify } from "../../components/Toaster";

const schema = Joi.object({
  name: Joi.object({
    en: Joi.string().required().messages({
      "string.empty": "Name (English) is required",
    }),
    ar: Joi.string().required().messages({
      "string.empty": "Name (Arabic) is required",
    }),
  }).required(),
});
export default function CreateType() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
  });
 

  const onSubmit = async (data) => {
    try {
      const response = await Api.post('/type/create', data);
      notify()
    } catch (error) {
      console.error("Error creating type:", error);
    }
  };

  return (
    <Container>
      <h1>Create Type</h1>
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
        <Button variant="primary" type="submit">
          Create Type
        </Button>
      </Form>
    </Container>
  );
}
