import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FetchAllLaunches } from '../Api/ApiCalls'
import { Link } from 'react-router-dom'

export default function AllLaunches() {
  const { t, i18n } = useTranslation()
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      const data = await FetchAllLaunches()
      setData(data)
    }
    fetchData()
  }, [])
  return (
    <section className=" container-xxl section-padding">
      <div className="container ">
        <div className="title mb-3">{t('launches.launchingSoon')}</div>
<div className="row gy-4 gx-5">

        {data?.map((item, index) => {
          const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`

          return (
            <div className="col-md-4" key={index}>
              <Link className="launch-card" to={`/launch-details/${item._id}`}>
                <img
                  loading="lazy"
                  className="img-fluid rounded-2"
                  src={itemImage}
                  alt="Launch Image"
                  width="393"
                  height="221"
                  />

              </Link>
              <h5 className='mt-2' style={{fontSize:"20px"}}>{item.launchName[i18n.language]}</h5>
            </div>
          )
          })}
        </div>
      </div>
    </section>
  )
}
