import React, { useMemo } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Carousel({ infinite = false, items = [], Component, settings = {}, def = 3, sm = 1, md = 2.5, lg = 3.5 }) {
  const { i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const defaultSettings = useMemo(() => ({
    spaceBetween: 20,
    navigation: true,
    pagination: false,
    scrollbar: false,
    lazyload: "ondemand",
    modules: [Navigation, Pagination, A11y],
    breakpoints: {
      320: {
        slidesPerView: sm,
      },
      768: {
        slidesPerView: md,
      },
      1024: {
        slidesPerView: lg,
      },
    },
  }), [sm, md, lg]);

  const swiperSettings = useMemo(() => {
    const mergedSettings = { ...defaultSettings, ...settings };
    if (!mergedSettings.pagination) {
      delete mergedSettings.pagination; // Remove pagination if it's false
    }
    return mergedSettings;
  }, [defaultSettings, settings]);

  return (
    <div className={`carousel-container ${direction}`}>
      {items?.length > 0 ? (
        <Swiper dir={direction} key={i18n.language} {...swiperSettings} infinite={infinite ? 'true' : undefined} dots={undefined}>
          {items?.map((item) => (
            <SwiperSlide key={item._id}>
              <Component item={item}/>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="d-flex justify-content-center align-items-center no-data">
          No data to show
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  infinite: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  Component: PropTypes.elementType.isRequired,
  settings: PropTypes.object,
  def: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

