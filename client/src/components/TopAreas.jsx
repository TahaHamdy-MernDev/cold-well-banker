import React, { useEffect, useState } from 'react'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FetchTopAreas } from '../Api/ApiCalls'
import DataLoader from './Common/DataLoader'

export default function TopAreas() {
  const { t, i18n } = useTranslation()
  const [topArea, setTopArea] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchTopAreas()
   
        setTopArea(data)
      } catch (error) {
        console.error('Error fetching latest properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <section className="container-xxl section-padding">
      <div className="container card-style">
        <Title title={t('topArea')} />
        <div className="row    gy-5 ">
          {topArea?.map((area, index) => {
            const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${area?.images[0].url}`
            const name = area.title[i18n.language]
            return (
              <div
                // data-aos="fade-up"
                // data-aos-duration="1000"
                // data-aos-delay={300 * index}
                className="col-md-3 "
                key={index}
              >
                <Link
                  key={index}
                  to={`/properties-in/${area._id}`}
                  className="area-card px-2 py-5 border rounded-2 d-flex  flex-column gap-2  align-items-center justify-content-center mb-2"
                >
                  <img
                    loading="lazy"
                    src={itemImage}
                    style={{ height: '75px', width: '75px' }}
                    className=" object-fit-cover rounded-circle"
                  />
                  <div className=" z-3 text-primary-white  w-100 d-flex justify-content-center flex-column gap-2 align-items-center">
                    <h4 className="text-primary-black text-center text-wrap mb-0">
                      {name}
                    </h4>
                    <p className=" mb-0 text-secondary-gray">
                      {area.numberOfCompounds || 0} {t('titles.compounds')}
                    </p>
                    <p className=" mb-0 text-secondary-gray">
                      {area.numberOfProperties || 0} {t('titles.propertiesAvailable')}
                    </p>
                  </div>
                  </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
