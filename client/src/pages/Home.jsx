import React, { lazy } from 'react'
import Seo from '../Seo'
import { useTranslation } from 'react-i18next'

const Hero = lazy(() => import('../components/Hero'))
const HomeLunch = lazy(() => import('../components/HomeLunch'))
const TopCompounds = lazy(() => import('../components/TopCompounds'))
const TopAreas = lazy(() => import('../components/TopAreas'))
const LatestProperties = lazy(() => import('../components/LatestProperties'))
const ContactForm = lazy(() => import('../components/ContactForm'))

export default function Home() {
  const {t} = useTranslation()
  return (
    <React.Fragment>
      <Seo page={t('PagesName.home')} description={t('PagesDescriptions.home')} />
      <Hero />
      <HomeLunch />
      <TopCompounds />
      <TopAreas />
      <LatestProperties />
      <ContactForm />
    </React.Fragment>
  )
}
