import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Carousel({ items = [], Component, settings = {},def=3, sm=1,md=2.5,lg=3.5 }) {
  console.log("items", items);
  const { i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const rtlSwitch = i18n?.dir();

  const defaultSettings = {
    spaceBetween: 50,
    slidesPerView: def,
    navigation: true,
    pagination: false,
    scrollbar: false,
    modules:[Navigation, Pagination, A11y],
    breakpoints: {
      320: {
        slidesPerView: sm,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: md,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: lg,
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
           
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            key={i18n.language}
            {...swiperSettings}
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

