import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { FetchAreaDetails } from '../Api/ApiCalls'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { ContactUs } from '../components/Common/Buttons'
import Description from '../components/Common/Description'
export default function AreaDetails() {
  const { id } = useParams()
  const { i18n, t } = useTranslation()
  const [areaDetails, setAreaDetails] = React.useState(null)
  const fetchData = useCallback(async () => {
    const data = await FetchAreaDetails(id)
    setAreaDetails(data)
  }, [])
  console.log(areaDetails)
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  const areaImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${areaDetails?.images[0].url}`
  return (
    <div className="container-xxl my-5">
      <div className="container">
        <div className="row border-bottom d-flex justify-content-start align-items-center py-4">
          <div className="col-3 col-md-1 mb-4">
            <img
              src={areaImage}
              className=" object-fit-cover rounded-circle"
              loading="lazy"
              width="80"
              height="80"
              alt="area"
            />
          </div>
          <div className="col-6 col-md-9 mb-4">
            <div className=" d-flex flex-column justify-content-center">
              <h2 className=" area-title">{areaDetails?.title[i18n.language]}</h2>
              <p className="p-custom" >10 {t('areaDetails.propertiesAvailable')}</p>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-end justify-content-md-end align-items-end">

            <ContactUs number={ areaDetails?.callUsNumber}/>
          </div>
        </div>
      </div>
      <div className="container">
        <Description title={areaDetails?.title[i18n.language]} description={areaDetails?.description[i18n.language]} />
      </div>
    </div>
  )
}
