import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  FetchAlTypesNames,
  FetchAllAreaNames,
  FetchAllCompoundsNames,
} from '../Api/ApiCalls'
import {
  Button,
  // Button,
  Col,
  // Container,
  Form,
  Row,
  // ToggleButton,
  // ToggleButtonGroup,
} from 'react-bootstrap'
export default function Hero() {
  const { t, i18n } = useTranslation()
  const [areas, setAreas] = useState(null)
  const [compounds, setCompounds] = useState(null)
  const [types, setTypes] = useState(null)
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    async function fetchData() {
      const areas = await FetchAllAreaNames()
      const compounds = await FetchAllCompoundsNames()
      const types = await FetchAlTypesNames()
      setAreas(areas)
      setCompounds(compounds)
      setTypes(types)

      // const areas = await fetchAllAreas()
    }
    fetchData()
  }, [])
  const onSubmit = (data) => {
    console.log(data)
  }
  console.log('types', areas)
  return (
    <section
      className="hero-section w-100 overflow-hidden position-relative"
      style={{ height: '750px' }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content position-absolute top-50 start-50 translate-middle w-75">
        <h1 className=" display-5  mb-4 text-primary-white text-center">
          {t('Header.Heading.findA')}{' '}
          <span className="text-primary-white">
            {t('Header.Heading.perfectHome')}
          </span>{' '}
          {t('Header.Heading.toLive')}
        </h1>
        <p className="mb-4 pb-2 text-secondary-blue text-center">
          {t('Header.SubHeading')}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: '32px' }}
          className="search row rounded-2 d-flex justify-content-center align-items-center px-0"
        >
          <Row className=" d-flex justify-content-center align-items-center gap-2">
            {/* Compound */}
            <Col md={3} className="p-0">
              <Form.Group className="mb-3 mb-md-0">
                <Form.Control
                  as="select"
                  required
                  {...register('compound')}
                  defaultValue=""
                >
                  <option disabled value="">
                    {t('Search.compound')}
                  </option>
                  {compounds?.map((compound) => (
                    <option key={compound._id} value={compound._id}>
                      {compound.name[i18n.language]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="p-0">
              <Form.Group className="mb-3 mb-md-0">
                <Form.Control
                  as="select"
                  required
                  {...register('type')}
                  defaultValue=""
                >
                  <option disabled value="">
                    {t('search.propertyTypes')}
                  </option>
                  {types?.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name[i18n.language]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="p-0">
              <Form.Group className="mb-3 mb-md-0">
                <Form.Control
                  as="select"
                  required
                  {...register('beds')}
                  defaultValue=""
                >
                  <option disabled value="">
                    {t('Search.beds')}
                  </option>
                  <option value="1"> 1 {t('Search.beds')}</option>
                  <option value="2"> 2 {t('Search.beds')}</option>
                  <option value="3"> 3 {t('Search.beds')}</option>
                  <option value="4"> 4 {t('Search.beds')}</option>
                  <option value="5+"> 5+ {t('Search.beds')}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="p-0">
              <Form.Group className="mb-3 mb-md-0">
                <Form.Control
                  as="select"
                  required
                  {...register('price')}
                  defaultValue=""
                >
                  <option disabled value="">
                    {t('Search.price')}
                  </option>
                  <option value="1">  {t('Search.price1')}</option>
                  <option value="2">  {t('Search.price2')}</option>
                  <option value="3">  {t('Search.price3')}</option>
                  <option value="4">  {t('Search.price4')}</option>
                  <option value="5">  {t('Search.price5')}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className=" p-0">
              <Button
                variant="primary"
                className="button-primary w-100 mb-0 rounded-2"
                type="submit"
              >
                {t('Search.Search')}
              </Button>
            </Col>
          </Row>
          {/* <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('city')} className="form-select" id="city">
          <option value=""  disabled>
         
          </option>
          {areas?.map((item, index) => (
            <option key={index} value={item._id}>
              {item?.name[i18n.language]}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('type')} className="form-select" id="type">
          <option value="" disabled>
            {t('search.propertyTypes')}
          </option>
        
        </select>
      </div>
     
      <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('beds')} className="form-select" id="beds">
          <option value=""  disabled>
            {t('search.beds')}
          </option>
        </select>
      </div> */}

          {/* <div className="search-select rounded-2 mx-0 my-2 d-flex align-items-end">
        <label htmlFor="submit" className="form-label">
          {' '}
        </label>
        {/* <button type="submit" ">
         
        {/* </button
     
      </div> */}
        </form>
      </div>
    </section>
  )
}
