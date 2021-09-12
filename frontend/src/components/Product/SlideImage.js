import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { GrPrevious, GrNext } from 'react-icons/gr'
const SlideImage = ({ image, getIndex }) => {
    const nextClick = () => {
        getIndex(1)
    }
    const previousClick = () => {
        getIndex(-1)
    }
    return (
        <div className="product__details__image">
            <LazyLoadImage
                src={image}
                alt={image}
            />
            <span className="previous" onClick={() => previousClick()} ><GrPrevious size={22} /> </span>

            <span className="next" onClick={() => nextClick()} ><GrNext size={22} /> </span>
        </div>
    )
}
export default SlideImage