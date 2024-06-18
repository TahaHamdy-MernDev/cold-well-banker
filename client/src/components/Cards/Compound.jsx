import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

const Compound = ({ item, index }) => {
  const { i18n } = useTranslation();

  const itemImage = useMemo(() => `${import.meta.env.VITE_IMAGE_ORIGIN}/${item.thumbnail[0].url}`, [item.thumbnail]);
  const developerImage = useMemo(() => `${import.meta.env.VITE_IMAGE_ORIGIN}/${item.developer?.images[0]?.url}`, [item.developer?.images]);

  const firstTwoWords = useMemo(() => item.name[i18n.language].split(' ').slice(0, 3).join(' '), [item.name, i18n.language]);
  const description = useMemo(() => item.description[i18n.language].slice(0, 250 - 3) + '...', [item.description, i18n.language]);

  return (
    <div className="custom-compound-unit bg-white rounded-2">
      <div className="custom-compound-image position-relative">
        <img
          className="w-100 custom-compound-thumbnail"
          width="auto"
          height="250"
          loading="lazy"
          src={itemImage}
          alt={item.name[i18n.language]}
        />
        {item.developer && (
          <span className="position-absolute custom-developer-logo">
            <Link to={`/developer-details/${item.developer[0]._id}`}>
              <img
                className="w-100 h-100 rounded-circle"
                src={developerImage}
                alt={item.developer[0].name[i18n.language]}
                loading="lazy"
              />
            </Link>
          </span>
        )}
      </div>
      <div className="custom-compound-unit-information-wrapper p-2">
        <p className="custom-compound-unit_description mb-1">
          <MapPin size={18} /> {item.area[0].title[i18n.language]}
        </p>
        <Link className="custom-compound-unit_name" to={`/compound-details/${item._id}`}>
          <h3>{firstTwoWords}</h3>
        </Link>
        <p className="custom-compound-unit_description">{description}</p>
        <div className="d-flex justify-content-start gap-2 py-1">
          {item.amenities.map((amenity) => (
            <span key={amenity._id} className="badge bg-primary-blue text-white">
              {amenity.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


Compound.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    developer: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        images:PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ),
        name: PropTypes.shape({
          en: PropTypes.string,
          ar: PropTypes.string,
        }),
      })
    ),
    name: PropTypes.shape({
      en: PropTypes.string,
      ar: PropTypes.string,
    }).isRequired,
    description: PropTypes.shape({
      en: PropTypes.string,
      ar: PropTypes.string,
    }).isRequired,
    area: PropTypes.shape({
        title: PropTypes.shape({
          en: PropTypes.string,
          ar: PropTypes.string,
        }),
      }).isRequired,
    amenities: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number, 
};

export default React.memo(Compound);
