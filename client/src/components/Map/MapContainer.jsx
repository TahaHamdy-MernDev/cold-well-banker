import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { useTranslation } from 'react-i18next'

mapboxgl.accessToken =
  'pk.eyJ1IjoidGFoYWhhbWR5MDIiLCJhIjoiY2x3a2RpaWFkMTc5ajJta3gyaW5yd2wwcSJ9.r0bKbuRuQ5DBlG9RaM5Ftg'

export default function MapComponent({ width, height, locations = [] }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [zoom, setZoom] = useState(10)
const {i18n} = useTranslation()
  useEffect(() => {
    if (map.current) return
    const defaultCenter = locations.length
      ? [locations[0].lng, locations[0].lat]
      : [-70.9, 42.35]

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: zoom,
    })

    locations.forEach((location) => {
   
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.style.backgroundImage = 'url(/public/mark.png)'
      el.style.width = '26px'
      el.style.height = '35px'
      el.style.backgroundSize = '100%'

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current)
        const currentLanguage = i18n.language;
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.name[currentLanguage]|| location.name)

      marker.setPopup(popup)
    })
  }, [i18n.language, locations, zoom])

  return (
    <div style={{ width, height }} className="rounded-2">
      <div
        ref={mapContainer}
        loading="lazy"
        className="rounded-2"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
