import React from 'react';
import Form from './Common/Form';
import LazyLoad from 'react-lazyload';

const ContactForm = () => {
  return (
    <section className='container-xxl section-padding'>
      <div className="row">
        <div className="col-md-6 section-padding d-flex justify-content-center align-items-center container">
          <Form />
        </div>
        <div className="col-md-6 hidden-sm">
          <img
            loading="lazy"
            width="100%"
            className="contact-img object-fit-cover"
            height="600"
            alt="contact-us"
            src="/contact-us.jpg"
            />
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactForm);
