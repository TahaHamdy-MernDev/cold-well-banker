import React, { lazy } from 'react'
import Seo from '../Seo'

const Hero = lazy(() => import('../components/Hero'))
const HomeLunch = lazy(() => import('../components/HomeLunch'))
const TopCompounds = lazy(() => import('../components/TopCompounds'))
const TopAreas = lazy(() => import('../components/TopAreas'))
const LatestProperties = lazy(() => import('../components/LatestProperties'))
const ContactForm = lazy(() => import('../components/ContactForm'))

export default function Home() {
  return (
    <React.Fragment>
      <Seo title='Coldwell Banker | New Alex  Prime Real Estate in Egypt | Home ' />
      <Hero />
      <HomeLunch />
      <TopCompounds />
      <TopAreas />
      <LatestProperties />
      <ContactForm />
    </React.Fragment>
  )
}
