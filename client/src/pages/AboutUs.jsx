import React from 'react'
import { useTranslation } from 'react-i18next'
import Carousel from '../components/Common/Carousel'
import Title from '../components/Common/Title'

export default function AboutUs() {
  const { t } = useTranslation()
  const TopSales = ({ item }) => ( <img height="300" className="rounded-2" src={item} alt="Top Sales" />)


  const topSalesImages = [
    '/top-sales/top-sales.jpg',
    '/top-sales/top-sales-2.jpg',
    '/top-sales/top-sales-3.jpg',
    '/top-sales/top-sales-4.jpg',
    '/top-sales/top-sales-5.jpg',
  ]

  const settings = {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: false,
  }

  return (
    <React.Fragment>
      <section
        className=" w-100 about-us-video"
        style={{
          height: '780px',
        }}
      >
        <video width="100%" height="100%" autoPlay muted loop>
          <source src="/input.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="container-xxl section-padding">
        <div className="container ">
          <div className="row card-style">
               <Title title={t('aboutUs.founder')}/>
          <div className="d-flex justify-content-start align-items-center">
            <div className="col-md-3">
              <img
                src="/founder.jpg"
                alt="founder "
                className=" object-fit-cover rounded-2 mb-2"
                // width="250"
                width="100%"
                height="380"
              />
              <div className=" text-center d-flex justify-content-center flex-column align-items-center gap-1">
                <h5 className=' fs-5 m-0'> 
                CEO <br/>
                 {/* COLDWELL BANKER NEW|ALEX */}
                 </h5>

                <p className='mb-0' style={{fontSize:"22px"}}> <strong>
                   Mr Hussein Younis </strong></p>
              </div>
            </div>
          </div>
          </div>
     
        </div>
      </section>
      <section className="container-xxl section-padding">
        <div className="container">
          <div className="row card-style">
          <Title title={t('aboutUs.services')}/>

        
          <div  className="row card-style mb-3" style={{background:"#f8f8f8 !important"}}>
            <div className="col-md-3 p-3">
              <span>
                <img src="/findHome.png" alt="findHome.png" width="" />
              </span>
              <h3 className="font-weight-normal my-0  service-title">
                {t('aboutUs.findHomeTitle')}
              </h3>
            </div>

            <div className="col-lg-8">
              <p style={{ fontSize: '14px' }}>
                {t('aboutUs.findHomeText')}
                <br />
                <br />
                {t('aboutUs.findHomeTextTwo')}
              </p>
            </div>
          </div>
          <div  className="row card-style mb-3" style={{background:"#f8f8f8 !important"}}>
            <div className="col-md-3 p-3">
              <span>
                <img src="/resale.png" alt="resale.png" width="" />
              </span>
              <h3 className="font-weight-normal my-0  service-title">
                {t('aboutUs.resaleTitle')}
              </h3>
            </div>
            <div className="col-lg-8">
              <p style={{ fontSize: '14px' }}>
                {t('aboutUs.resaleText')}
                <br />
                <br />
              </p>
            </div>
          </div>

          <div  className="row card-style mb-3" style={{background:"#f8f8f8 !important"}}>
            <div className="col-md-3 p-3">
              <span>
                <img
                  src="/Vacation Homes.png"
                  alt="Vacation Homes.png"
                  width=""
                />
              </span>
              <h3 className="font-weight-normal my-0  service-title">
                {t('aboutUs.vacationHomesTitle')}
              </h3>
            </div>

            <div className="col-lg-8">
              <p style={{ fontSize: '14px' }}>
                {t('aboutUs.vacationHomesText')}
                <br />
                <br />
              </p>
            </div>
          </div>

          <div  className="row card-style mb-3" style={{background:"#f8f8f8 !important"}}>
            <div className="col-md-3 p-3">
              <span>
                <img
                  src="/TrainingAcademy.png"
                  alt="TrainingAcademy.png"
                  width=""
                />
              </span>
              <h3 className="font-weight-normal my-0  service-title">
                {t('aboutUs.trainingAcademy')}
              </h3>
            </div>

            <div className="col-lg-8">
              <p style={{ fontSize: '14px' }}>
                {t('aboutUs.trainingAcademyText')}
                <br />
                <br />
              </p>
            </div>
          </div>

          <div  className="row card-style mb-3" style={{background:"#f8f8f8 !important"}}>
            <div className="col-md-3 p-3">
              <span>
                <img
                  src="/AuctionServices.png"
                  alt="AuctionServices.png"
                  width=""
                />
              </span>
              <h3 className="font-weight-normal my-0  service-title">
                {t('aboutUs.auctionServicesTitle')}
              </h3>
            </div>

            <div className="col-lg-8">
              <p style={{ fontSize: '14px' }}>
                {t('aboutUs.auctionServicesText')}
                <br />
                <br />
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-xxl section-padding">
        <div className="container top-sales">
          <div className="row card-style">
          <Title title={ t('aboutUs.topSalers')}/>
       
          <Carousel
            items={topSalesImages.map((image) => image)}
            Component={TopSales}
            settings={settings}
            />
            </div>
        </div>
      </section>
    </React.Fragment>
  )
}
