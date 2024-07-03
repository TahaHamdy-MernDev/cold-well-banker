import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import Img from './Img'

export default function Nav() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    const direction = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('selectedLanguage', newLang);
  }
  

  React.useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage')
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage)
      const direction = selectedLanguage === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('dir', direction)
    
    }
  }, [i18n])
  const imageProps = {
    src: '/logo.png',
    alt: 'logo',
    width: '350',
    height: '50',
  }
  return (
    <nav className="navbar nav-bar sticky-top navbar-expand-lg bg-white shadow navbar-light py-0 px-4 rounded-bottom-1">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center text-center"
      >
        <Img
          className="img-fluid nav-bar-logo"
          image={imageProps}
        />
      </Link>
      <div className="d-flex">
        <button
          onClick={toggleLanguage}
          className="btn d-lg-none lang-switcher "
        >
          <span className=' mb-0'>{i18n.language.toUpperCase()}</span> <Globe size={20} />
        </button>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="collapse navbar-collapse p-2" id="navbarCollapse">
        <div className="navbar-nav ms-auto">
          <Link to="/" className="nav-item nav-link active">
            {t('Nav.home')}
          </Link>
          <Link to="/developers" className="nav-item nav-link">
            {t('Nav.developer')}
          </Link>
          <Link to="/about-us" className="nav-item nav-link">
            {t('Nav.about')}
          </Link>

          <Link
            to="/contact-us"
            className="nav-item nav-link d-flex flex-nowrap"
          >
            {t('Nav.contact')}
          </Link>
          <Link to="/our-partners" className="nav-item nav-link">
            {t('Nav.ourPartners')}
          </Link>
          <Link to="/academy" className="nav-item nav-link">
            {t('Nav.academy')}
          </Link>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-1">
          <Link to="/sell-property">
            <button className=" btn button-primary mb-0">
              {t('Nav.addProperty')}
            </button>
          </Link>
          <button
            onClick={toggleLanguage}
            className="btn lang-switcher d-none d-lg-block gap-1"
          >
            <h6 className=" d-inline-block mb-0">{i18n.language.toUpperCase()}</h6>{' '}
            <Globe size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
