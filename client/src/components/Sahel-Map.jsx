import React from 'react'
import { Link } from 'react-router-dom'
import Img from './Img'

export default function SahelMap() {
  return (
    <section className="container-xxl section-padding" >
        <div className="container sahel-map">
           {/* <Link draggable="false" to="/sahel-map" > */}
        <Img
          image={{ src: '/sahel-map.jpg', width: '100%', height: '100%' }}
          className="sahel-map position-absolute top-50 start-0 object-fit-cover rounded-2 sahel-map"
          style={{ overflow: 'hidden'  }}
        />
      {/* </Link>   */}
        </div>
     
    </section>
  )
}
