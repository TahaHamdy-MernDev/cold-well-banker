import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = 'en';

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng,
    // debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', 
    },
    react: {
      useSuspense: true, 
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
