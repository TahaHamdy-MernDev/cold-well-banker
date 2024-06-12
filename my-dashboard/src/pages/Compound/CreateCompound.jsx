import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Joi, { object } from "joi";
import { useForm } from "react-hook-form";
import ImageUploader from "../../components/ImageUploader";
import { joiResolver } from "@hookform/resolvers/joi";
import ReactQuill from "react-quill";
import LocationPicker from "../../components/LocationPicker";
import MapPicker from "../../components/MapPicker";
import Api from "../../Api";
import { notify } from "../../components/Toaster";

const multiLanguageSchema = Joi.object({
  en: Joi.string().required().messages({
    "string.base": "English text must be a string",
    "string.empty": "English text is required",
    "any.required": "English text is required",
  }),
  ar: Joi.string().required().messages({
    "string.base": "Arabic text must be a string",
    "string.empty": "Arabic text is required",
    "any.required": "Arabic text is required",
  }),
});

const locationSchema = Joi.object({
  lat: Joi.number().required().messages({
    "number.base": "Latitude must be a number",
    "any.required": "Latitude is required",
  }),
  lng: Joi.number().required().messages({
    "number.base": "Longitude must be a number",
    "any.required": "Longitude is required",
  }),
});

const compoundSchema = Joi.object({
  contactUsNumber: Joi.number().required().messages({
    "number.base": "Contact Us Number must be a number",
    "any.required": "Contact Us Number is required",
  }),
  name: multiLanguageSchema,
  description: multiLanguageSchema,
  location: locationSchema,
  area: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "array.base": "Area must be an array",
      "string.pattern.base": "Area ID must be a valid ObjectId",
    }),
  developer: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "array.base": "Developer must be an array",
      "string.pattern.base": "Developer ID must be a valid ObjectId",
    }),
});

export default function CreateCompound() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(compoundSchema),
  });
  const [areas, setAreas] = useState([]);
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const areas = await Api.get("/area/get-names");
        const developer = await Api.get("/developer/get-names");
        setAreas(areas.data.data);
        setDevelopers(developer.data.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchData();
  }, []);
  const [useRichTextEditor, setUseRichTextEditor] = useState(true);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleFilesSelect = (files) => {
    setImages(files);
  };
   const handleThumbnailSelect = (file) => {
    setThumbnail(file);
  };
  const [useMap, setUseMap] = useState(true);
  const [mapLocation, setMapLocation] = useState({
    longitude: 31.23586166241668,
    latitude: 30.04426189357251,
    zoom: 5,
  });

  const handleLocationSelect = ({ latitude, longitude }) => {
    setValue("location.lat", latitude);
    setValue("location.lng", longitude);
    setMapLocation((prevState) => ({ ...prevState, latitude, longitude }));
  };

 

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("contactUsNumber", data.contactUsNumber);
      formData.append("name.en", data.name.en);
      formData.append("name.ar", data.name.ar);
      formData.append("description.en", data.description.en);
      formData.append("description.ar", data.description.ar);
      formData.append("location.lat", data.location.lat);
      formData.append("location.lng", data.location.lng);
      formData.append("area[0]", data.area);
      formData.append("developer[0]", data.developer);
      formData.append("thumbnail", thumbnail[0]);

      await Api.post("/compound/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  console.log(errors);
  return (
    <Container>
      <h1>Create Compound</h1>
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
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                as="select"
                {...register("area")}
                isInvalid={!!errors.area}
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name.en}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.area?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Developer</Form.Label>
              <Form.Control
                as="select"
                {...register("developer")}
                isInvalid={!!errors.developer}
              >
                <option value="">Select Developer</option>
                {developers.map((developer) => (
                  <option key={developer._id} value={developer._id}>
                    {developer.name.en}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.developer?.message}
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
          <Form.Label>Contact Us Number</Form.Label>
          <Form.Control
            type="number"
            {...register("contactUsNumber")}
            isInvalid={!!errors.contactUsNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contactUsNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Form.Group className="my-3">
            <Form.Label>Location</Form.Label>
            <ToggleButtonGroup
              type="radio"
              name="locationOptions"
              defaultValue={useMap ? 1 : 2}
              className="mb-3"
            >
              <ToggleButton
                id="tbg-radio-1"
                value={1}
                onClick={() => setUseMap(true)}
              >
                Choose from Map
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={2}
                onClick={() => setUseMap(false)}
              >
                Enter Coordinates
              </ToggleButton>
            </ToggleButtonGroup>

            {useMap ? (
              <MapPicker
                initialViewport={mapLocation}
                onLocationSelect={handleLocationSelect}
              />
            ) : (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      {...register("location.lat")}
                      isInvalid={!!errors.location?.lat}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location?.lat?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      {...register("location.lng")}
                      isInvalid={!!errors.location?.lng}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location?.lng?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <ImageUploader
            maxImages={6}
            name="images"
            onFilesSelect={handleFilesSelect}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Thumbnail</Form.Label>
          <ImageUploader
            maxImages={1}
            name="thumbnail"
            onFilesSelect={handleThumbnailSelect}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Compound
        </Button>
      </Form>
    </Container>
  );
}
