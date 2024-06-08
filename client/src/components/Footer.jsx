import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FetchLatestProperties, FetchTopTypes } from '../Api/ApiCalls'

export default function Footer() {
  
  const [topTypes, setTopTypes] = useState([])
  const [latestProperties, setLatestProperties] = useState([])
  const { t, i18n } = useTranslation()
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchTopTypes()
        const latestProperties = await FetchLatestProperties()

        setLatestProperties(latestProperties)
        setTopTypes(data)
      } catch (error) {
        console.error('Error fetching latest properties:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <footer className=" container-xxl  mt-5 " dir='ltr'>
      <div className="container-xxl d-flex flex-column">
        <div className="row gy-4 gx-5 d-flex justify-content-between">
          <div className="col-md-4 ">
            <h4>{t('contactUs')}</h4>
            <div className="d-flex flex-column gap-2">
              <div className=" mb-2 d-flex gap-1 justify-content-start align-items-start">
                <div>
                  <MapPin
                    style={{ size: '20px', width: '20px', height: '20px' }}
                  />
                </div>{' '}
                <p className=" text-primary-black">
              {t('footer.dir')}
                </p>
              </div>
              <div className=" mb-2 d-flex gap-1 justify-content-start align-items-start">
                <div>
                  <Mail
                    style={{ size: '20px', width: '20px', height: '20px' }}
                  />
                </div>
                <p className=" text-primary-black">
                  {' '}
                  coldwellbanker@newalex.com{' '}
                </p>
              </div>
              <div className=" mb-2 d-flex gap-1 justify-content-start align-items-start">
                <Phone
                  style={{ size: '20px', width: '20px', height: '20px' }}
                />
                <p className=" text-primary-black">
                  {' '}
                  +2 03-4242098 - 012 22 24 24 88{' '}
                </p>
              </div>
              <div className=" footer-social d-flex flex-wrap gap-1">
                <div className="styled-social">
                  <a   href="https://www.facebook.com/CBNewAlexEG?mibextid=ZbWKwL">
                    <Facebook style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a  target='_blank' rel="noreferrer" href="mailto:operationalex4@gmail.com">
                    <Mail style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a  target='_blank' rel="noreferrer" href='https://youtube.com/@coldwellbankernewalex8138?si=jpajTO02sS5bnLvF'>
                    <Youtube style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a  target='_blank' rel="noreferrer" href="https://www.instagram.com/coldwell.banker_new.alex?igsh=Mmd5N3ZmZzYxMDhx">
                    <Instagram style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h4>{t('listsByType')}</h4>
            <div className=" d-flex flex-column gap-2">
              {topTypes?.map((type, index) => (
              
              // <Link
              //     style={{ cursor: 'pointer' }}
              //     key={index}
              //     to={`/properties-type/${type._id}`}
              //   >
                  <p  key={index} className=" mb-1">
                    {type.name[i18n.language]}({type.propertiesCount||0}){' '}
                  </p>
                // </Link>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h4>{t('latestProperties')}</h4>
            <div className=" d-flex gap-2 flex-wrap">
              {Array.isArray(latestProperties) &&
                latestProperties.slice(0, 4).map((item, index) => {
                  let itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`
                  return ( 
                    <Link
                      to={`/property-details/${item._id}`}
                      className="rounded-2"
                      key={index}
                    >
                      <img
                        width="150"
                        className=" rounded-2 object-fit-cover"
                        height="100"
                        src={itemImage}
                        alt={`image-${index}`}
                      />
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
       
      </div>
    </footer>
  )
}
