import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const LaunchCard = ({ item }) => {
  const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`;

  return (
    <Link className="launch-card" to={`/launch-details/${item._id}`}>
      <img
        loading="lazy"
        className="img-fluid rounded-2"
        src={itemImage}
        alt="Launch"
        width="393"
        height="221"
      />
    </Link>
  );
};

// PropTypes definition for LaunchCard component
LaunchCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    thumbnail: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default LaunchCard;
