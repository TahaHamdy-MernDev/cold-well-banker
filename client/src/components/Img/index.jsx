import React from 'react'
import {
  LazyLoadImage,
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({ image, ...props }) => {
  return (
    <div>
      <LazyLoadImage
        key={image.key}
        alt={image.alt}
        height={image.height}
        src={image.src}
        width={image.width}
        effect="blur"
        {...props}
      />
    </div>
  )
}

export default Img
