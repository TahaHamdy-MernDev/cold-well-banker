import React from 'react'
import {
  LatestProperties,
  Hero,
  WhyChooseUs,
  TopAreas,
  ForRent,
  TopTypes,
  ContactForm,
  HomeLunch,
  TopCompounds,
} from '../components'

export default function Home() {
  return (
    <>
      <Hero />
<HomeLunch/>
<TopCompounds/>
      <TopAreas />
      <LatestProperties />

      {/* <TopTypes /> */}
      {/* <WhyChooseUs /> */}
      {/* <ForRent /> */}
      <ContactForm/>
    </>
  )
}
