import React from 'react'
import MapComponent from '../components/Map/MapContainer'
import { useTranslation } from 'react-i18next'

export default function ContactUs() {
    const {t}= useTranslation()
  return (
   <React.Fragment>  
 <section
        className=" position-relative w-100"
        style={{ 
          height: "700px",
        }}
      > 
      {/* ,  */}
        <MapComponent locations={[
            {
                lng: 29.965682,
                    lat:31.207802,
                    name: "ColdWell Banker | New Alex"
    
            }
        ]} width="100%" height="100%"  /> 
        </section>

<section className="container-xxl section-padding">
    <div className="container">
        <div className="col-md-4">
            <form>

                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    </div>
</section>
   </React.Fragment>
  )
}
