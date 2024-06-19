import React, { useEffect, useState, useCallback } from 'react'
import { FetchLatestLaunches } from '../Api/ApiCalls'
import Title from './Common/Title'
import { useTranslation } from 'react-i18next'
import Carousel from './Common/Carousel'
import LaunchCard from './Cards/LaunchCard'
import { Link } from 'react-router-dom'
import Spinner from './Common/Spinner'
import DataLoader from './Common/DataLoader'

export default function HomeLunch() {
  const { t } = useTranslation()
  const [lunch, setLunch] = useState([])

  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const data = await FetchLatestLaunches()
      setLunch(data)
    } catch (err) {
      setError(err.message)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error) return <div>{t('error.loadingData')}</div>

  return (
    <section className="container-xxl section-padding">
      <div className="container p-2">
        <div className="d-flex justify-content-between align-items-start">
          {/* <Title title= /> */}
<h2 className=' sup-title'>
{t('titles.newLaunches')}
</h2>
          <div>
            {lunch && lunch?.length > 5 && (
              <Link to="/all-launches">{t('showMore')}</Link>
            )}
          </div>
        </div>
        <div className="row">
          <Carousel
            md={2.2}
            lg={3.2}
            items={lunch?.map((item) => item)}
            Component={LaunchCard}
          />
        </div>
      </div>
    </section>
  )
}
