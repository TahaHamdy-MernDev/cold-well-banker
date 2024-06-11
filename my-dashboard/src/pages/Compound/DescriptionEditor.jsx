import React from "react";
import { Col, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ReactQuill from "react-quill";

export default function DescriptionEditor({ useFormMethods, values }) {
  const {  setValue, watch, formState: { errors } } = useFormMethods;

  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Description (English)</Form.Label>
            <ReactQuill
              theme="snow"
              value={watch("description.en") || ""}
              onChange={(value) => setValue("description.en", value)}
              onBlur={() => {}}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.en?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Description (Arabic)</Form.Label>
            <ReactQuill
              theme="snow"
              value={watch("description.ar") || ""}
              onChange={(value) => setValue("description.ar", value)}
              onBlur={() => {}}
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
          defaultValue={values.useRichTextEditor ? 1 : 2}
          className="mb-3"
        >
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={() => values.setUseRichTextEditor(true)}
          >
            Enable Rich Text Editor
          </ToggleButton>
          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={() => values.setUseRichTextEditor(false)}
          >
            Disable Rich Text Editor
          </ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>
    </>
  );
}
