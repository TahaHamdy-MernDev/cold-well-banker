import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaHome, FaPhone, FaHandshake } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

export default function SellProperty() {
  const { t, i18n } = useTranslation()
  const [location, setLocation] = useState('')
  const [compounds, setCompounds] = useState([])
  const { register, handleSubmit, watch } = useForm()

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
    // Fetch compounds based on location
    // This is a placeholder logic
    if (e.target.value === 'Location1') {
      setCompounds(['Compound1', 'Compound2'])
    } else {
      setCompounds([])
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className=" container-xxl my-5">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <FaHome size={64} className="mb-3" />
            <h1>{t('sellProperty.title')}</h1>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={8} className=' mx-auto'>
            <Row>
              <Col md={4} className="mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaHome size={48} className="mb-3" />
                    <Card.Title>
                      {t('sellProperty.steps.step1.title')}
                    </Card.Title>
                    <Card.Text>
                      {t('sellProperty.steps.step1.description')}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaPhone size={48} className="mb-3" />
                    <Card.Title>
                      {t('sellProperty.steps.step2.title')}
                    </Card.Title>
                    <Card.Text>
                      {t('sellProperty.steps.step2.description')}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <FaHandshake size={48} className="mb-3" />
                    <Card.Title>
                      {t('sellProperty.steps.step3.title')}
                    </Card.Title>
                    <Card.Text>
                      {t('sellProperty.steps.step3.description')}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={8} className="mx-auto ">
            <Col>
              <h2 className="text-center">{t('sellProperty.form.title')}</h2>
              <p className="text-center">
                {t('sellProperty.form.description')}
              </p>
            </Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formName">
                    {/* <Form.Label>
                      {t('sellProperty.form.inputs.name')}
                    </Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder={t('sellProperty.form.inputs.name')}
                      {...register('name', { required: true })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    {/* <Form.Label>
                      {t('sellProperty.form.inputs.phoneNumber')}
                    </Form.Label> */}
                    <Form.Control
                      type="tel"
                      placeholder={t('sellProperty.form.inputs.phoneNumber')}
                      {...register('phoneNumber', { required: true })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formLocation">
                    {/* <Form.Label>
                      {t('sellProperty.form.inputs.location')}
                    </Form.Label> */}
                    <Form.Control
                      as="select"
                      value={location}
                      onChange={handleLocationChange}
                      {...register('location', { required: true })}
                    >
                      <option value="">
                        {t('sellProperty.form.inputs.location')}
                      </option>
                      <option value="Location1">Location 1</option>
                      <option value="Location2">Location 2</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formCompound">
                    {/* <Form.Label>
                      {t('sellProperty.form.inputs.compound')}
                    </Form.Label> */}
                    <Form.Control
                      as="select"
                      disabled={!location}
                      {...register('compound')}
                    >
                      <option value="">
                        {t('sellProperty.form.inputs.compound')}
                      </option>
                      {compounds.map((comp, index) => (
                        <option key={index + 1} value={comp}>
                          {comp}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formPropertyType">
                {/* <Form.Label>
                  {t('sellProperty.form.inputs.propertyType')}
                </Form.Label> */}
                <Form.Control
                  as="select"
                  {...register('propertyType', { required: true })}
                >
                  <option value="">
                    {t('sellProperty.form.inputs.propertyType')}
                  </option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                {/* <Form.Label>
                  {t('sellProperty.form.inputs.description')}
                </Form.Label> */}
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder={t('sellProperty.form.inputs.description')}
                  {...register('description', { required: true })}
                />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100">
                {t('sellProperty.form.inputs.submit')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
