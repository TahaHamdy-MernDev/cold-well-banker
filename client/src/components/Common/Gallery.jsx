import React, { useState, useCallback, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Lightbox = React.lazy(() => import('./Lightbox'));

const Gallery = React.memo(({ property }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleMouseEnter = useCallback((index) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <section className="container-xxl section-padding mb-2">
      <div className="container">
        <ImageGallery>
          {property?.images.map((image, index) => (
            <ImageContainer
              className={index === activeIndex ? 'active' : ''}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              onClick={()=> openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openLightbox(index);
                }
              }}
            >
              <GalleryImage
                loading="lazy"
                src={`${import.meta.env.VITE_IMAGE_ORIGIN}/${image.url}`}
                alt={`${index + 1}`}
              />
            </ImageContainer>
          ))}
        </ImageGallery>
        {isOpen && (
          <Suspense fallback={<Spinner />}>
            <Lightbox
              property={property}
              activeIndex={activeIndex}
              settings={settings}
              closeLightbox={closeLightbox}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              onSubmit={onSubmit}
              i18n={i18n}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
});

Gallery.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.objectOf(PropTypes.string).isRequired,
  }),
};

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
`;

const ImageGallery = styled.div`
  height: 500px;
  max-width: 100%;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  transition: flex 0.3s ease-in-out;
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;

  &.active {
    flex: 5;
  }

  &:not(.active) {
    flex: 1;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

export default Gallery;