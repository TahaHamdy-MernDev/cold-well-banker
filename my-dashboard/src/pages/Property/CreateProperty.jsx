import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import Api from "../../Api";
import MapPicker from "../../components/MapPicker";
import ReactQuill from "react-quill";
export default function CreateProperty() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [areas, setAreas] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [compound, setCompound] = useState([]);
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const areas = await Api.get("/area/get-names");
        const developer = await Api.get("/developer/get-names");
        const compound = await Api.get("/compound/get-names");
        const types = await Api.get("/type/get");
        setAreas(areas.data.data);
        setDevelopers(developer.data.data);
        setCompound(compound.data.data);
        setTypes(types.data.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchData();
  }, []);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };
  const [useRichTextEditor, setUseRichTextEditor] = useState(true);
  const [useMap, setUseMap] = useState(true);
  const [mapLocation, setMapLocation] = useState({
    longitude: 31.23586166241668,
    latitude: 30.04426189357251,
    zoom: 5,
  });

  const handleLocationSelect = ({ latitude, longitude }) => {
    setValue("location.lat", latitude);
    setValue("location.long", longitude);
    setMapLocation((prevState) => ({ ...prevState, latitude, longitude }));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name.en", data.name.en);
    formData.append("name.ar", data.name.ar);
    formData.append("addressLocality.en", data.addressLocality.en);
    formData.append("addressLocality.ar", data.addressLocality.ar);
    formData.append("min_price", data.min_price);
    formData.append("max_price", data.max_price);
    formData.append("currency", data.currency);
    formData.append("number_of_bathrooms", data.number_of_bathrooms);
    formData.append("number_of_bedrooms", data.number_of_bedrooms);
    formData.append("finishing", data.finishing);
    formData.append("resale", data.resale);
    formData.append("property_type.name", data.property_type.name);
    formData.append("delivery_in", data.delivery_in);
    formData.append("sale_type", data.sale_type);
    formData.append("forSale", data.forSale);
    formData.append("forRent", data.forRent);
    formData.append("featured", data.featured);
    formData.append("contactUs", data.contactUs);
    formData.append("max_unit_area", data.max_unit_area);
    formData.append("location.lat", data.location.lat);
    formData.append("location.long", data.location.long);
    formData.append("description.en", data.description.en);
    formData.append("description.ar", data.description.ar);
    images.forEach((image, index) => formData.append(`images`, image));
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const response = await Api.post("/property/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submission response:", response.data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Container>
      <h1>Create Property</h1>
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
              <Form.Label>Address Locality (English)</Form.Label>
              <Form.Control
                type="text"
                {...register("addressLocality.en")}
                isInvalid={!!errors.addressLocality?.en}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressLocality?.en?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address Locality (Arabic)</Form.Label>
              <Form.Control
                type="text"
                {...register("addressLocality.ar")}
                isInvalid={!!errors.addressLocality?.ar}
              />
              <Form.Control.Feedback type="invalid">
                {errors.addressLocality?.ar?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                as="select"
                {...register("area")}
                isInvalid={!!errors.area}
                defaultValue=""
              >
                <option disabled value="">
                  Select Area
                </option>
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
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Compound</Form.Label>
              <Form.Control
                as="select"
                {...register("compound")}
                isInvalid={!!errors.compound}
                defaultValue=""
              >
                <option disabled value="">
                  Select Compound
                </option>
                {compound.map((compound) => (
                  <option key={compound._id} value={compound._id}>
                    {compound.name.en}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.compound?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Developer</Form.Label>
              <Form.Control
                as="select"
                {...register("developer")}
                isInvalid={!!errors.developer}
                defaultValue=""
              >
                <option disabled value="">
                  Select Developer
                </option>
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
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                {...register("min_price")}
                isInvalid={!!errors.min_price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.min_price?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                {...register("max_price")}
                isInvalid={!!errors.max_price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.max_price?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col col={4}>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                {...register("currency")}
                isInvalid={!!errors.currency}
              >
                <option value="">Select Currency</option>
                <option value="Dollar">Dollar</option>
                <option value="EGP">EGP</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.currency?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Bathrooms</Form.Label>
              <Form.Control
                type="number"
                {...register("number_of_bathrooms")}
                isInvalid={!!errors.number_of_bathrooms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number_of_bathrooms?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Bedrooms</Form.Label>
              <Form.Control
                type="number"
                {...register("number_of_bedrooms")}
                isInvalid={!!errors.number_of_bedrooms}
              />
              <Form.Control.Feedback type="invalid">
                {errors.number_of_bedrooms?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="number"
                {...register("max_unit_area")}
                isInvalid={!!errors.max_unit_area}
              />
              <Form.Control.Feedback type="invalid">
                {errors.max_unit_area?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Finishing</Form.Label>
          <Form.Control
            as="select"
            {...register("finishing")}
            isInvalid={!!errors.finishing}
          >
            <option value="">Select Finishing</option>
            <option value="Not Finished">Not Finished</option>
            <option value="Semi Finished">Semi Finished</option>
            <option value="Finished">Finished</option>
            <option value="Furnished">Furnished</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.finishing?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Resale</Form.Label>
          <Form.Check
            type="checkbox"
            {...register("resale")}
            isInvalid={!!errors.resale}
          />
          <Form.Control.Feedback type="invalid">
            {errors.resale?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Property Type</Form.Label>
          <Form.Control
            as="select"
            {...register("type")}
            isInvalid={!!errors.type?.name}
            defaultValue=""
          >
            <option disabled value="">
              Select Type
            </option>
            {types.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name.en}
              </option>
            ))}
          </Form.Control>

          <Form.Control.Feedback type="invalid">
            {errors.property_type?.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Delivery In</Form.Label>
          <Form.Control
            type="text"
            {...register("delivery_in")}
            isInvalid={!!errors.delivery_in}
          />
          <Form.Control.Feedback type="invalid">
            {errors.delivery_in?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sale Type</Form.Label>
          <Form.Control
            as="select"
            {...register("sale_type")}
            isInvalid={!!errors.sale_type}
            defaultValue=""
          >
            <option value="" disabled>
              Select Sale Type
            </option>
            <option value="Developer Sale">Developer Sale</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.sale_type?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>For Sale</Form.Label>
          <Form.Check
            type="checkbox"
            {...register("forSale")}
            isInvalid={!!errors.forSale}
          />
          <Form.Control.Feedback type="invalid">
            {errors.forSale?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>For Rent</Form.Label>
          <Form.Check
            type="checkbox"
            {...register("forRent")}
            isInvalid={!!errors.forRent}
          />
          <Form.Control.Feedback type="invalid">
            {errors.forRent?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Featured</Form.Label>
          <Form.Check
            type="checkbox"
            {...register("featured")}
            isInvalid={!!errors.featured}
          />
          <Form.Control.Feedback type="invalid">
            {errors.featured?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Us</Form.Label>
          <Form.Control
            type="number"
            {...register("contactUs")}
            isInvalid={!!errors.contactUs}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contactUs?.message}
          </Form.Control.Feedback>
        </Form.Group>

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
                    {...register("location.long")}
                    isInvalid={!!errors.location?.long}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location?.long?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Form.Group>

        <Form.Group className="mb-4 p-3 border rounded">
          <Form.Label className="mb-2">Rich Text Editor</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="richTextEditorOptions"
            defaultValue={useRichTextEditor ? 1 : 2}
            className="mb-3"
          >
            <ToggleButton
              id="tbg-radio-1"
              value={1}
              variant="outline-primary"
              className={`px-4 py-2 ${useRichTextEditor ? "active" : ""}`}
              onClick={() => setUseRichTextEditor(true)}
            >
              Enable Rich Text Editor
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              variant="outline-secondary"
              className={`px-4 py-2 ${!useRichTextEditor ? "active" : ""}`}
              onClick={() => setUseRichTextEditor(false)}
            >
              Disable Rich Text Editor
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
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
       

        {/* <Form.Group className="mb-3">
          <Form.Label>Description (English)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("description.en")}
            isInvalid={!!errors.description?.en}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.en?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description (Arabic)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("description.ar")}
            isInvalid={!!errors.description?.ar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.ar?.message}
          </Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleImagesChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type="file" onChange={handleThumbnailChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Property
        </Button>
      </Form>
    </Container>
  );
}
