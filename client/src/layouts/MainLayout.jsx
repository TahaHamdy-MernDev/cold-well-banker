import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Nav } from '../components';
import { useTranslation } from 'react-i18next';

const CopyRight = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center p-2 mt-4">
      <p className="mb-0 text-secondary-blue text-center text-md-start">
        &copy; {currentYear} Cold Well Banker New Alex. {t("footer.copyRights")}
      </p>
    </div>
  );
};

const BackToTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="back-to-top" onClick={handleScrollTop}>
      <i className="bi bi-arrow-up-short"></i>
    </button>
  );
};

export default function MainLayout() {
  return (
    <React.Fragment>
      <Nav />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <CopyRight />
      <BackToTop />
    </React.Fragment>
  );
}
