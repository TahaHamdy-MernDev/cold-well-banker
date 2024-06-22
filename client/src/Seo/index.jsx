import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
const Seo = ({
  title = 'Coldwell Banker | New Alex  Prime Real Estate in Egypt ',
  description = 'Coldwell Banker | New Alex  offers unparalleled real estate services in Egypt. Buy, sell or invest in properties with ease, guided by experts.',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={import.meta.env.VITE_WEBSITE_URI} />
      <meta property="og:image" content='/favicon.png' />
      <meta property="og:site_name" content='Coldwell Banker New Alex' />

    </Helmet>
  );
};
Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  };
export default Seo;

/**
Title
  Coldwell Banker | Prime Real Estate in Egypt
  44 characters
Description
  Coldwell Banker Egypt offers unparalleled real estate services in Egypt. Buy, sell or invest in properties with ease, guided by experts.
  136 characters
Keywords
  Keywordsis missing.
JSON-LD
  Organization
URL
  https://coldwellbanker-eg.com/
Canonical
  https://coldwellbanker-eg.com/
Robots Tag
  Robots meta tagis missing.
Lang
  en
total DOM elements
  1685 elements
Style tag
  tag count : 11 (15.95KB) 

 */
/*
Title
  Nawy Estate | Premium Real Estate in Egypt
  42 characters
Description
  The ultimate real estate broker in Egypt. Browse areas, compounds, and properties by price, location, and amenities to find the perfect place.
  142 characters
Keywords
  Keywordsis missing.
JSON-LD
  Organization,Corporation, Residence
URL
  https://www.nawy.com/
Canonical
  https://www.nawy.com/
Robots Tag
  INDEX,FOLLOW
Lang
  en
total DOM elements
  1371 elements
Style tag
  tag count : 47 (13.17KB)

*/