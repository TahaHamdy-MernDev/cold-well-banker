import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BathRoom, BedRoom, FT as Ft } from '../../assets/icons';
import { MapPin } from 'lucide-react';
import { formatNumber } from '../../assets/common';
import LazyLoad from 'react-lazyload';

const Property = ({ item }) => {
  const { t, i18n } = useTranslation();

  // Memoize URLs and computed values to avoid recomputation
  const itemImage = useMemo(() => `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`, [item?.thumbnail]);
  const developer = useMemo(() => Array.isArray(item.developer) ? item.developer[0] : item.developer, [item.developer]);
  const developerImage = useMemo(() => developer ? `${import.meta.env.VITE_IMAGE_ORIGIN}/${developer.images[0]?.url}` : '', [developer]);
  const formattedPrice = useMemo(() => formatNumber(item.max_price), [item.max_price]);
  const firstTwoWords = useMemo(() => item.name[i18n.language].split(' ').slice(0, 3).join(' '), [item.name, i18n.language]);
 
  const locality = useMemo(() => item.addressLocality[i18n.language], [item.addressLocality, i18n.language]);
  const areaTitle = useMemo(() => {
    if (Array.isArray(item.area)) {
      return item.area[0]?.title[i18n.language] || '';
    } else {
      return item.area?.title[i18n.language] || '';
    }
  }, [item.area, i18n.language]);
  const saleStatus = useMemo(() => {
    if (item.forRent) return 'Rent';
    if (item.forSale) return 'Sale';
    if (item.resale) return 'Resale';
    return '';
  }, [item.forRent, item.forSale, item.resale]);
  return (
    <div className="custom-property-unit bg-white rounded-2" dir={i18n.dir()}>
      <div className="custom-property-image position-relative">
        <div className="z-3 p-2 position-absolute top-0 w-100 start-0 d-flex justify-content-end" style={{ borderRadius: '10px' }}>
          <div className="position-relative w-100">
            {item.featured && (
              <span className="custom-type position-absolute top-0 start-0 custom-type-featured p-1 rounded-4">
                {item.featured&&"featured"}
              </span>
            )}
            <span className="custom-type position-absolute top-0 end-0 custom-type-sale p-1 rounded-4">
            {saleStatus}
            </span>
          </div>
        </div>
         <img
          className="custom-property-thumbnail"
          width="100%"
          loading="lazy"
          height="230"
          src={itemImage}
          alt={firstTwoWords}
        />
       
        <span className="position-absolute custom-developer-logo">
          {developer && (
            <Link to={`/developer-details/${developer?._id}`}>
               <LazyLoad offset={100} once >

              <img
                className="w-100 h-100 rounded-circle"
                src={developerImage}
                alt={developer?.name[i18n.language] || ''}
                loading="lazy"
                />
                </LazyLoad>
            </Link>
          )}
        </span>
      </div>
      <div className="custom-property-unit-information-wrapper p-2">
        <p className="custom-property-unit_description mb-1">
          <MapPin size={18} /> {areaTitle}, {locality}
        </p>
        <Link className="custom-property-unit_name" to={`/property-details/${item._id}`}>
          <h3>{firstTwoWords}</h3>
        </Link>
        <p className="custom-property-unit_price mb-1">
          ${formattedPrice} {t('egp')}
        </p>
        <div className="d-flex justify-content-start gap-4 py-1">
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <BathRoom />
            {item.number_of_bathrooms}
          </span>
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <BedRoom />
            {item.number_of_bedrooms}
          </span>
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <Ft />
            {item.max_unit_area}m²
          </span>
        </div>
      </div>
    </div>
  );
};


Property.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    developer: PropTypes.oneOfType([
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ).isRequired,
        name: PropTypes.shape({
          en: PropTypes.string.isRequired,
          ar: PropTypes.string.isRequired,
        }),
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
            })
          ).isRequired,
          name: PropTypes.shape({
            en: PropTypes.string.isRequired,
            ar: PropTypes.string.isRequired,
          }),
        })
      ),
    ]),
    max_price: PropTypes.number.isRequired,
    name: PropTypes.shape({
      en: PropTypes.string.isRequired,
      ar: PropTypes.string.isRequired,
    }).isRequired,
    area: PropTypes.shape({
        title: PropTypes.shape({
          en: PropTypes.string,
          ar: PropTypes.string,
        }),
      }) .isRequired,
    addressLocality: PropTypes.shape({
      en: PropTypes.string.isRequired,
      ar: PropTypes.string.isRequired,
    }).isRequired,
    featured: PropTypes.bool.isRequired,
    forRent: PropTypes.bool.isRequired,
    forSale: PropTypes.bool.isRequired,
    resale: PropTypes.bool.isRequired,
    number_of_bathrooms: PropTypes.number.isRequired,
    number_of_bedrooms: PropTypes.number.isRequired,
    max_unit_area: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(Property);
