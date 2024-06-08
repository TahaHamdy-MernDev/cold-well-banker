import React from 'react'
import { FetchLatestProperties } from '../Api/ApiCalls'
import Property from './Cards/Property'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import DataLoader from './Common/DataLoader'
import Carousel from './Common/Carousel'

export default function LatestProperties() {
  const { t } = useTranslation()
  const [latestProperties, setLatestProperties] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchLatestProperties()
     
        setLatestProperties(data)
      } catch (error) {
        console.error('Error fetching latest properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const setting = {
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3.1,
        spaceBetween: 30,
      },
    },
  }
  return (
    <section className="container-xxl section-padding mb-4">
      <div className="container card-style latest-properties">
        <Title title={t('latestProperties')} />
        <div className="row gx-4 gy-5">
         <Carousel Component={Property} settings={setting} items={latestProperties?.map((item)=>item)}/>
        </div>

      </div>
    </section>
  )
}
