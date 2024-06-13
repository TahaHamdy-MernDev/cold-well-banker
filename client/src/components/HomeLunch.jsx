import React, { useEffect, useState } from 'react'
import { FetchLatestLaunches } from '../Api/ApiCalls'
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
      const data = await FetchLatestLaunches()
    
      setLunch(data)
    }
    fetchData()
  }, [])

  const settings = {
    dots: false,
    speed: 500,
    slidestoshow: 3,
    slidestoscroll: 1,
    infinite: false,
    autoplay: false,
    lazyload: "true",
    focusonselect: "true",
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidestoshow: 1.2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidestoshow: 2.2,
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
