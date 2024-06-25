import React from 'react';
import Form from './Common/Form';

import Img from './Img';

const ContactForm = () => {
  const contactImageProps = {
    src: "/contact.jpg",
    alt: "contact-us",
    width: "100%",
    height: "600",
  };

  return (
    <section className='container-xxl section-padding'>
      <div className="row">
        <div className="col-md-6 section-padding d-flex justify-content-center align-items-center container">
          <Form />
        </div>
        <div className="col-md-6 hidden-sm">
          <Img
            loading="lazy"
            className="contact-img object-fit-cover rounded-2"
            image={contactImageProps}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactForm);
