import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
const ProductBanner = ({ gender }) => {
    const [imageBitisMan] = useState({
        imageMale: 'https://file.hstatic.net/1000230642/file/banner-cate-2_d5cc77ab5fa34ae5bea38ff9413ad60f_master.jpg',
        imageFamale: 'https://file.hstatic.net/1000230642/file/banner-main_72c5a4c7e3be459585e93d0cb037a47c.jpg',
    })

    return (
        <div className="cities__banner">
            {gender === 'male' ?
                <LazyLoadImage src={imageBitisMan.imageMale} alt='banner man' /> :
                <LazyLoadImage src={imageBitisMan.imageFamale} alt='banner man' />}
        </div>
    )
}
export default ProductBanner