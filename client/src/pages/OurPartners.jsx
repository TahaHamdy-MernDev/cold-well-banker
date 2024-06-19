import React from 'react'

export default function OurPartners() {
  const images = [
    '/partners/image1.png',
    '/partners/image2.png',
    '/partners/image3.png',
    '/partners/image4.png',
    '/partners/image5.png',
    '/partners/image6.png',
    '/partners/image7.jpg',
    '/partners/image8.jpg',
    '/partners/image9.jpg',
    '/partners/image10.jpg',
    '/partners/image11.jpg',
    '/partners/image12.jpg',
    '/partners/image13.jpg',
    '/partners/image14.jpg',
    '/partners/image15.jpg',
    '/partners/image16.jpg',
    '/partners/image17.jpg',
    '/partners/image18.jpg',
    '/partners/image19.jpg',
  ]
  return (
    <div className=" container-xxl section-padding">
      <section className="container">
        <div className=" d-flex justify-content-center align-items-center ">
          <img
            src="/partners/logo (2).png"
            className="blue-filter object-fit-contain"
            width="227"
            height="227"
            alt=""
          />
        </div>
        <div className="row g-4">
          {images?.map((image, index) => {
            return (
              <div
                className="col-6 col-md-2 p-3 d-flex justify-content-center align-items-center"
                key={`${'image-' + index + 1}`}
              >
                <div
                  style={{ width: '200px', height: '150px' }}
                  className="bg-white shadow rounded-4 d-flex justify-content-center align-items-center"
                >
                  <img
                    src={image}
                    alt={`partner-${index - 1}`}
                    className=" object-fit-cover"
                    width="130"
                    height="100"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
