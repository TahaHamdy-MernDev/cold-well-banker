import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CompoundCard = ({ item }) => {
  const { t, i18n } = useTranslation();

  const compoundImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`;

  return (
    <div className="compound-card d-inline-block position-relative">
      <Link to={`/compound-details/${item._id}`}>
        <img
          loading="lazy"
          alt="compound"
          width="100%"
          height="220"
          className="object-fit-cover rounded-2"
          src={compoundImage}
        />
        <div className="compound-image-layer">
          <div className="compound-image-text">
            <h5>{item.name[i18n.language]}</h5>
            <p>
              {item.numberOfProperties} {t('property')}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};


CompoundCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.shape({
      en: PropTypes.string.isRequired,
      ar: PropTypes.string.isRequired,
    }).isRequired,
    numberOfProperties: PropTypes.number.isRequired,
  }).isRequired,
};

export default CompoundCard;
