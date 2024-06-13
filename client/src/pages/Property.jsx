import React, { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

import { Link, useParams } from 'react-router-dom'
import { FetchProperty } from '../Api/ApiCalls'
import ShareDropdown from '../components/Common/Share'
import { useTranslation } from 'react-i18next'
import { FaPrint } from 'react-icons/fa'
import { formatNumber } from '../assets/common'
import Gallery from '../components/Common/Gallery'
import { ContactUs, Whatsapp } from '../components/Common/Buttons'
import Form from '../components/Common/Form'
import MapComponent from '../components/Map/MapContainer'
import Spinner from '../components/Common/Spinner'

export default function PropertyDetails() {
  const { t, i18n } = useTranslation()
  const { id } = useParams()

  const [property, setProperty] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchProperty(id)
        setProperty(data)
        console.log(data.location);
        setLocation([
          {
            lng: data?.location?.lng,
            lat: data?.location?.lat,
            name: data?.name[i18n.language],
          },
        ])
      } catch (error) {
        console.error('Error fetching property:', error)
      }
    }
    fetchData()
  }, [i18n.language, id])

  if (!property) {
    return <Spinner />
  }


  let developerImage = ''
  if (property.developer && property.developer[0]) {
    developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${property.developer[0].images[0]?.url}`
  }

  const propertyDescription = property?.description[i18n.language]
  const finishingTranslations = {
    'Not Finished': t('propertyDetails.not_finished'),
    'Semi Finished': t('propertyDetails.semi_finished'),
    Finished: t('propertyDetails.finished'),
    Furnished: t('propertyDetails.furnished'),
  }
  const translatedFinishing = finishingTranslations[property?.finishing]

  return (
    <>
      <Gallery property={property} />
      <section className=" position-relative container-xxl section-padding">
        <div className="mt-2 w-100 position-absolute d-none top-0 d-md-flex justify-content-end align-items-center gap-2 px-4">
          <button
            style={{ cursor: 'pointer' }}
            className=" btn font-inter bg-white rounded-2 p-2 shadow-sm"
          >
            <FaPrint /> {t('print')}
          </button>
          <ShareDropdown />
        </div>
        <div className="row">
          <div className="col-md-12 d-flex flex-column justify-content-center flex-md-row mx-auto">
            {property?.developer && property?.developer[0] && (
              <div className="col-md-2 d-flex justify-content-md-center align-items-center">
                <Link to={`/developer-details/${property?.developer[0]._id}`}>
                  <img
                    loading="lazy"
                    src={developerImage}
                    className=" object-fit-cover rounded-4 border shadow"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="developer logo"
                  />
                </Link>
              </div>
            )}
            {/* <div className="col-md-2 d-flex justify-content-md-center align-items-center ">

              <Link to={`/developer-details/${property?.developer[0]._id}`}>
                <img
                  loading="lazy"
                  src={developerImage}
                  className=" object-fit-cover rounded-4 border shadow"
                  draggable="false"
                  width="140"
                  height="140"
                  alt="developer logo"
                />
              </Link>
            </div> */}
            <div
              className="col-md-10 d-flex flex-column mt-2 "
              style={{ marginRight: '15px' }}
            >
              {/* <div className=" d-flex">
                <span className="tag tag-blue text-white">
                  {t(property?.forRent ? 'rent' : 'sale')}
                </span>
              </div> */}
              <div className=" col-md-12 d-flex flex-column ">
                <div className=" d-flex flex-column flex-md-row">
                  <h1 className="property-title fs-3 mt-2 col-md-10 justify-content-center align-items-center">
                    {property?.name[i18n.language]}
                  </h1>
                </div>

                <div className="d-flex gap-1 justify-content-start">
                  <MapPin size={16} />
                  <p>
                    {property?.area[0]?.title[i18n.language]},{' '}
                    {property?.addressLocality[i18n.language]}
                  </p>
                </div>
                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <div>
                    <p style={{ fontSize: '12px' }} className="mb-0">
                      {' '}
                      {t('propertyDetails.pricesStartFrom')}
                    </p>
                    <span className=" d-flex justify-content-start gap-0 gap-md-2 flex-column flex-md-row">
                      <h3>
                        {formatNumber(property?.min_price)} {t('egp')}
                      </h3>
                      <span className=" d-flex justify-content-start align-items-start flex-column flex-md-row align-items-md-center ">
                        <p style={{ fontSize: '12px' }} className=" mb-0">
                          {t('propertyDetails.maxPrice')}:
                        </p>{' '}
                        <h3>
                          {formatNumber(property?.max_price)} {t('egp')}
                        </h3>
                      </span>
                    </span>
                  </div>
                  <div className=" mt-2 d-flex justify-content-start flex-wrap align-items-center justify-content-md-end gap-2">
                    <ContactUs number={property?.contactUs} />
                    {property?.developer && property?.developer[0] && (
                       <Whatsapp
                      number={property?.contactUs}
                      itemName={property?.name[i18n.language]}
                      developerName={property?.developer[0].name[i18n.language]}
                    /> 
                    )}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col-md-9">
              <div className="row card-style mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-start">
                  <div className="col-md-6">
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.propertyType')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.type[0].name[i18n.language]}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.referenceNo')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.reference_No}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.bedrooms')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.number_of_bedrooms}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.bathrooms')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.number_of_bathrooms}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.unitArea')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.max_unit_area}
                        {t('propertyDetails.sizeUnit')}{' '}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.deliveryIn')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.delivery_in}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.compound')}:{' '}
                      </strong>{' '}
                      <Link
                        to={`/compound-details/${property?.compound[0]._id}`}
                      >
                        <p
                          className=" text-decoration-underline mb-0"
                          style={{ fontSize: '18px' }}
                        >
                          {property?.compound[0].name[i18n.language]}
                        </p>
                      </Link>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.saleType')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {property?.sale_type}
                      </p>
                    </div>
                    <div className=" mb-2 d-flex align-items-center justify-content-start gap-1">
                      <strong className=" mb-0">
                        {' '}
                        {t('propertyDetails.finishing')}:{' '}
                      </strong>{' '}
                      <p className=" mb-0" style={{ fontSize: '18px' }}>
                        {translatedFinishing}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* payment Plans */}
              {/* <div className="row card-style mb-4">
              <h2 className="title">
                {t('propertyDetails.paymentPlans')}
              </h2>
              <div className=' d-flex flex-column'>
              {property?.payment_plans.length > 0 ? (
        property?.payment_plans.map((plan, index) => (  
          <span key={plan._id} className="plan-details">
          <div>
              <span className="installment-value offer">
                {plan.down_payment.value}
              </span>
              <span className="installment-periodicity">
                Down Payment
              </span>
            </div>
            <div>
              <span className="downpayment-value">
                {plan.equal_installments.value === "monthly" ? "Monthly" : "Quarterly"} 
                - Equal Installments
              </span>
            </div>
            <div>
              <span className="installment-years">
                {plan.years} Years
              </span>
            </div>
        </span>
        ))
      ) : (
        <p>{t('propertyDetails.noPaymentPlans')}</p>
      )}
              </div>
              </div> */}
              <div className=" row card-style mb-4">
                <h2 className="title">
                  {t('propertyDetails.about')} {property?.name[i18n.language]}
                </h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: propertyDescription }}
                />
              </div>
              <div className="row  card-style">
                <h2 className="title">{t('launches.viewMap')}</h2>
                <div className="map-container">
                  <MapComponent
                    locations={location}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className=" card-style p-2 position-sticky"
                style={{ top: '160px' }}
              >
                <Form />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
