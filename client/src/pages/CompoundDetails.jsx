import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { FetchCompound } from '../Api/ApiCalls'
import Gallery from '../components/Common/Gallery'

import { Whatsapp, ContactUs } from '../components/Common/Buttons'
import { formatNumber } from '../assets/common'
import { MapPin } from 'lucide-react'
import Form from '../components/Common/Form'
import MapComponent from '../components/Map/MapContainer'
import Carousel from '../components/Common/Carousel'
import Property from '../components/Cards/Property'

export default function CompoundDetails() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const [compound, setCompound] = useState(null)
  const [details, setDetails] = useState([])
  const [recommendations, setRecommendations] = useState()
  useEffect(() => {
    async function FetchData() {
      const data = await FetchCompound(id)
      console.log(data)
      setCompound(data.compound)
      setDetails(data.compoundPropertiesInfo)
      setRecommendations(data.recommendations)
    }
    FetchData()
  }, [id])
  const developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${compound?.developer[0].images[0].url}`
  const compoundDescription = compound?.description[i18n.language]
  const locations = details[0]?.allPropertyLocations
 
  return (
    <React.Fragment>
      <Gallery property={compound} />
      <section className=" container-xxl section-padding">
        <div className="container">
          <div className="row  card-style">
            <div className="col-md-12 d-flex flex-column flex-md-row mx-auto">
              <div className="col-md-2 d-flex justify-content-md-center align-items-center ">
                <Link to={`/developer-details/${compound?.developer[0]._id}`}>
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
              <div
                className="col-md-10 d-flex flex-column mt-2 "
                style={{ marginRight: '15px' }}
              >
                <div className=" col-md-12 d-flex flex-column ">
                  <div className=" d-flex flex-column flex-md-row">
                    <h1 className="property-title fs-3 mt-2 col-md-10 justify-content-center align-items-center">
                      {compound?.name[i18n.language]}
                    </h1>
                  </div>

                  <div className=" d-flex gap-1 justify-content-start">
                    <MapPin size={16} />
                    <p className="">
                      {compound?.area[0].title[i18n.language]},{' '}
                      {/* {property?.addressLocality[i18n.language]} */}
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
                          {formatNumber(
                            details[0]?.minPriceProperty?.min_price
                          )}{' '}
                          {t('egp')}
                        </h3>
                        <span className=" d-flex justify-content-start align-items-start flex-column flex-md-row align-items-md-center ">
                          <p style={{ fontSize: '12px' }} className=" mb-0">
                            {t('propertyDetails.maxPrice')}:
                          </p>{' '}
                          <h3>
                            {formatNumber(
                              details[0]?.maxPriceProperty?.max_price
                            )}{' '}
                            {t('egp')}
                          </h3>
                        </span>
                      </span>
                    </div>
                    <div className=" mt-2 d-flex justify-content-start flex-wrap align-items-center justify-content-md-end gap-2">
                      <ContactUs number={compound?.contactUsNumber} />
                      <Whatsapp
                        number={compound?.contactUsNumber}
                        itemName={compound?.name[i18n.language]}
                        developerName={
                          compound?.developer[0].name[i18n.language]
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-xxl section-padding position-relative">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col-md-9">
              <div className="row card-style mb-4">
                <h2 className="title">
                  {t('propertyDetails.about')} {compound?.name[i18n.language]}
                </h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: compoundDescription }}
                />
              </div>
              <div className="row card-style">
                <h2 className="title">{t('launches.viewMap')}</h2>
                <div className="map-container">
                  {locations?.length > 0 && (
                    <MapComponent
                      locations={locations}
                      width="100%"
                      height="100%"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{ position: 'relative' }}>
              <div className="row">
                <div
                  className="position-sticky card-style"
                  style={{ top: '100px' }}
                >
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {recommendations?.length > 0 && (
        <section className="container-xxl section-padding">
          <div className="container card-style">
            <h2 className=" title">
              {t('titles.exploreUnits')} {compound?.name[i18n.language]}
            </h2>
            <Carousel
sm={1.1}
md={2.2}
lg={3.2}
              items={recommendations?.map((item) => item)}
            
              Component={Property}
            />
          </div>
        </section>
      )}
    </React.Fragment>
  )
}
