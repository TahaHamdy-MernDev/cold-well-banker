import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FetchLatestProperties, FetchTopTypes } from '../Api/ApiCalls';

const Footer = () => {
  const [topTypes, setTopTypes] = useState([]);
  const [latestProperties, setLatestProperties] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTypesData = await FetchTopTypes();
        const latestPropertiesData = await FetchLatestProperties();
        setTopTypes(topTypesData);
        setLatestProperties(latestPropertiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="container-xxl mt-5">
      <div className="container d-flex flex-column">
        <div className="row gy-4 gx-5 d-flex justify-content-between">
          {/* Contact Us */}
          <div className="col-md-4">
            <h4>{t('contactUs')}</h4>
            <div className="d-flex flex-column gap-2">
              {/* Address */}
              <div className="mb-2 d-flex gap-1 justify-content-start align-items-start">
                <MapPin style={{ size: '20px', width: '20px', height: '20px' }} />
                <address className="text-primary-black">
                  {t('footer.dir')}
                </address>
              </div>
              {/* Email */}
              <div className="mb-2 d-flex gap-1 justify-content-start align-items-start">
                <Mail style={{ size: '20px', width: '20px', height: '20px' }} />
                <a href="mailto:coldwellbanker@newalex.com" className="text-primary-black">
                  coldwellbanker@newalex.com
                </a>
              </div>
              {/* Phone */}
              <div className="mb-2 d-flex gap-1 justify-content-start align-items-start">
                <Phone style={{ size: '20px', width: '20px', height: '20px' }} />
                <p className="text-primary-black" dir='ltr'>
                  +2 03-4242098 - 012 22 24 24 88
                </p>
              </div>
              {/* Social Links */}
              <div className="footer-social d-flex flex-wrap gap-1">
                <div className="styled-social">
                  <a href="https://www.facebook.com/CBNewAlexEG?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    <Facebook style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a href="mailto:operationalex4@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a href="https://youtube.com/@coldwellbankernewalex8138?si=jpajTO02sS5bnLvF" target="_blank" rel="noopener noreferrer">
                    <Youtube style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
                <div className="styled-social">
                  <a href="https://www.instagram.com/coldwell.banker_new.alex?igsh=Mmd5N3ZmZzYxMDhx" target="_blank" rel="noopener noreferrer">
                    <Instagram style={{ width: '22px', height: '22px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Lists by Type */}
          <div className="col-md-4">
            <h4>{t('listsByType')}</h4>
            <div className="d-flex flex-column gap-2">
              {topTypes.map((type, index) => (
                <p key={index} className="mb-1">
                  {type.name[i18n.language]} ({type.propertiesCount || 0})
                </p>
              ))}
            </div>
          </div>
          {/* Latest Properties */}
          <div className="col-md-4">
            <h4>{t('latestProperties')}</h4>
            <div className="d-flex gap-2 flex-wrap">
              {latestProperties.slice(0, 4).map((item, index) => {
                const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`;
                return (
                  <Link to={`/property-details/${item._id}`} className="rounded-2" key={index}>
                    <img
                      width="150"
                      height="100"
                      loading="lazy"
                      className="rounded-2 object-fit-cover"
                      src={itemImage}
                      alt={`Property ${index}`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
