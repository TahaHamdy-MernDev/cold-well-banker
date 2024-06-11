import React, { useEffect, useState } from 'react'
import CompoundCard from './Cards/compoundCard'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import Carousel from './Common/Carousel'
import { FetchTopCompounds } from '../Api/ApiCalls'

export default function TopCompounds() {
  const { t } = useTranslation()
  const [topCompounds, setTopCompounds] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const data = await FetchTopCompounds()
      setTopCompounds(data)
    }
    fetchData()
  }, [])
  const customSettings = {
    dots: false,
    speed: 500,
    slidesToShow:8,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    lazyLoad: true,
    focusOnSelect: true,
    // responsive: [
    //   {
    //     breakpoint: 220,
    //     settings: {
    //       slidesToShow: 2.2,
    //     },
    //   },
    //   {
    //     breakpoint: 550,
    //     settings: {
    //       slidesToShow: 4.2,
    //     },
    //   },
    //   {
    //     breakpoint: 700,
    //     settings: {
    //       slidesToShow: 6.2,
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 7.2,
    //     },
    //   },
    // ],
  }

  return (
    <section className=" container-xxl section-padding">
      <div className="container card-style">
        <Title title={t('compoundDetails.topCompound')} />
        <div className="row">

        <Carousel
        lg={5}
          items={topCompounds?.map(item=>item)}
          Component={CompoundCard}
          settings={customSettings}
          />
          </div>
      </div>
    </section>
  )
}
