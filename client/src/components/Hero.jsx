import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FetchAllAreaNames } from '../Api/ApiCalls'
export default function Hero() {
  const { t,i18n } = useTranslation()
  const [areas,setAreas] = useState(null)
  const { register, handleSubmit } = useForm()
  useEffect(()=>{
    async function fetchData(){
const types =  await FetchAllAreaNames()
setAreas(types)

// const areas = await fetchAllAreas()
    }
    fetchData()
  },[])
  const onSubmit = (data) => {
    console.log(data)
  }
  console.log("types" , areas);
  return (
    <section
      className="hero-section w-100 overflow-hidden position-relative"
      style={{ height: '750px' }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content position-absolute top-50 start-50 translate-middle w-75">
        <h1 className=" display-5  mb-4 text-primary-white text-center">
          {t('Header.Heading.findA')}{' '}
          <span className="text-primary-white">
            {t('Header.Heading.perfectHome')}
          </span>{' '}
          {t('Header.Heading.toLive')}
        </h1>
        <p className="mb-4 pb-2 text-secondary-blue text-center">
          {t('Header.SubHeading')}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="row rounded-2 p-2 bg-primary-white d-flex flex-column flex-md-row justify-content-between">
        <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('city')} className="form-select" id="city">
          <option value=""  disabled>
            {t('search.city')}
          </option>
          {areas?.map((item, index) => (
            <option key={index} value={item._id}>
              {item?.name[i18n.language]}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('type')} className="form-select" id="type">
          <option value="" disabled>
            {t('search.propertyTypes')}
          </option>
        
        </select>
      </div>
     
      <div className="col-md-3 rounded-2 mx-0 my-2">
        <select defaultValue="" {...register('beds')} className="form-select" id="beds">
          <option value=""  disabled>
            {t('search.beds')}
          </option>
        </select>
      </div>
  
      <div className="search-select rounded-2 mx-0 my-2 d-flex align-items-end">
        <label htmlFor="submit" className="form-label">
          {' '}
        </label>
        <button type="submit" className="button-primary w-100 mb-0 rounded-2">
          {t('search.search')}
        </button>
      </div>
    </form>
      </div>
    </section>
  )
}
