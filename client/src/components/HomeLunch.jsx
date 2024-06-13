import React, { useEffect, useState } from 'react'
import { FetchLatestLunches } from '../Api/ApiCalls'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import Carousel from './Common/Carousel'
import LaunchCard from './Cards/LaunchCard'
import { Link } from 'react-router-dom'

export default function HomeLunch() {
  const { t, i18n } = useTranslation()
  const [lunch, setLunch] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await FetchLatestLunches()
    
      setLunch(data)
    }
    fetchData()
  }, [])

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    lazyLoad: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.2,
        },
      },
    ],
  }

  return (
    <section className="container-xxl section-padding">
      <div className="container card-style">
        <div className=" d-flex justify-content-between align-items-start">
          <Title title={t('titles.newLaunches')} />
         <div>
           <Link to="/all-launches">{t('showMore')}</Link>
        </div>
        </div>
        <div className="row">
          <Carousel
          md={2.2}
          lg={3.2}
            items={lunch?.map((item) => item)}
            Component={LaunchCard}
            settings={settings}
          />
        </div>
      </div>
    </section>
  )
}
