import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import MapComponent from '../components/Map/MapContainer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { ContactRequest } from '../Api/ApiCalls'
import { toast } from 'react-toastify'

export default function ContactUs() {
  const { t, i18n } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading('Submitting your data...')
    try {
       await ContactRequest(data)
       toast.update(loadingToastId, {
        render: 'Successfully submitted!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (error) {
      console.error('Error submitting data:', error)
      toast.update(loadingToastId, {
        render:
          error.response?.data?.message ||
          'Failed to submit. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }

  }

  return (
    <React.Fragment>
      <section
        className="position-relative container"
        style={{ marginTop: '2rem', height: '467px' }}
      >
        <MapComponent
          locations={[
            {
              lng: 29.965682,
              lat: 31.207802,
              name: 'ColdWell Banker | New Alex',
            },
          ]}
          width="100%"
          height="100%"
        />
      </section>

      <section className="container-xxl section-padding">
        <Container>
          <Row>
            <Col md={5}>
              <div
                className=" contact__form bg-white z-3 p-4 rounded"
                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <h3 className="text-center mb-4">{t('contactUsPage.title')}</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>{t('contactUsPage.name')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('contactUsPage.namePlaceholder')}
                      {...register('name', { required: true })}
                    />
                    {errors.name && <span>{t('contactUsPage.nameError')}</span>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>{t('contactUsPage.phone')}</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder={t('contactUsPage.phonePlaceholder')}
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && (
                      <span>{t('contactUsPage.phoneError')}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>{t('contactUsPage.email')}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t('contactUsPage.emailPlaceholder')}
                      {...register('email', { required: true })}
                    />
                    {errors.email && (
                      <span>{t('contactUsPage.emailError')}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>{t('contactUsPage.message')}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder={t('contactUsPage.messagePlaceholder')}
                      {...register('message', { required: true })}
                    />
                    {errors.message && (
                      <span>{t('contactUsPage.messageError')}</span>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    {t('contactUsPage.send')}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}
