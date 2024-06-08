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
    slidesPerView: 8,
  }

  return (
    <section className=" container-xxl section-padding">
      <div className="container card-style">
        <Title title={t('compoundDetails.topCompound')} />
        <Carousel
          items={topCompounds?.map(item=>item)}
          Component={CompoundCard}
          settings={customSettings}
        />
      </div>
    </section>
  )
}
