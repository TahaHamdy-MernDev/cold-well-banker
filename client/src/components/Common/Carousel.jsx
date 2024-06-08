import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Carousel({ items = [], Component, settings = {} }) {
  console.log("items", items);
  const { i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const rtlSwitch = i18n?.dir();

  const defaultSettings = {
    spaceBetween: 50,
    slidesPerView: 3,
    navigation: true,
    pagination: false,
    scrollbar: false,
    modules: [Navigation, Pagination, A11y],
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 50,
      },
    },
  };

  const swiperSettings = { ...defaultSettings, ...settings };

  return (
    <>
      {items.length > 0 ? (
        <div className={`carousel-container ${direction}`}>
          <Swiper
            dir={rtlSwitch}
            {...swiperSettings}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            key={i18n.language}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <Component item={item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center no-data">
          No data to show
        </div>
      )}
    </>
  );
}

