import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Title({title,text}) {
  const {i18n} =useTranslation()
  return (
    <div className="main-title"
    data-aos={i18n.language ==='en'?"fade-right":"fade-left"}
      data-aos-duration="1000" >
    <h2 className="mb-0">{title}</h2>
    {/* <p style={{ fontSize: "14px" }}>
      {text}
    </p> */}
    </div>
  )
}
