import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../components/Common/Carousel';
import Title from '../components/Common/Title';

const TopSalesItem = ({ item }) => (
  <img src={item} alt="Top Sales" loading='lazy' className="rounded-2" height='300' />
);

const AboutUs = () => {
  const { t } = useTranslation();


  const topSalesImages = [
    '/top-sales/top-sales.jpg',
    '/top-sales/top-sales-2.jpg',
    '/top-sales/top-sales-3.jpg',
    '/top-sales/top-sales-4.jpg',
    '/top-sales/top-sales-5.jpg',
  ];

  const carouselSettings = {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: false,
  };

  // Service item component
  const ServiceItem = ({ icon, title, text }) => (
    <div className="row mb-3 px-2 py-3 rounded-2 mx-auto" style={{ background: '#f2f2f0' }}>
      <div className="col-md-3 p-3">
        <img src={icon} alt={title} width="" />
        <h3 className="font-weight-normal my-0 service-title">{title}</h3>
      </div>
      <div className="col-lg-8">
        <p style={{ fontSize: '14px' }}>{text}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Video section */}
      <section className="w-100 about-us-video" style={{ height: '780px' }}>
        <video width="100%" height="100%" autoPlay muted loop>
          <source src="/input.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Founder section */}
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row card-style">
            <Title title={t('aboutUs.founder')} />
            <div className="d-flex justify-content-start align-items-center">
              <div className="col-md-3">
                <img
                  src="/founder.jpg"
                  alt="founder"
                  className="object-fit-cover rounded-2 mb-2"
                  loading="lazy"
                  width="100%"
                  height="380"
                />
                <div className="text-center d-flex justify-content-center flex-column align-items-center gap-1">
                  <h5 className="fs-5 m-0">CEO</h5>
                  <p className="mb-0" style={{ fontSize: '22px' }}>
                    <strong>Mr Hussein Younis</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row card-style mx-auto">
            <Title title={t('aboutUs.services')} />
            <ServiceItem
              icon="/findHome.png"
              title={t('aboutUs.findHomeTitle')}
              text={`${t('aboutUs.findHomeText')} ${t('aboutUs.findHomeTextTwo')}`}
            />
            <ServiceItem icon="/resale.png" title={t('aboutUs.resaleTitle')} text={t('aboutUs.resaleText')} />
            <ServiceItem
              icon="/Vacation Homes.png"
              title={t('aboutUs.vacationHomesTitle')}
              text={t('aboutUs.vacationHomesText')}
            />
            <ServiceItem
              icon="/TrainingAcademy.png"
              title={t('aboutUs.trainingAcademy')}
              text={t('aboutUs.trainingAcademyText')}
            />
            <ServiceItem
              icon="/AuctionServices.png"
              title={t('aboutUs.auctionServicesTitle')}
              text={t('aboutUs.auctionServicesText')}
            />
          </div>
        </div>
      </section>

      {/* Top Sales section */}
      <section className="container-xxl section-padding">
        <div className="container top-sales">
          <h2 className='sup-title'>

          </h2>
          <div className="row card-style">
            <Title title={t('aboutUs.topSalers')} />
            <Carousel items={topSalesImages} Component={TopSalesItem} settings={carouselSettings} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
