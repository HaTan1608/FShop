import React, { useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ProductBanner = () => {


    return (
        <div className="homepage__banner">
            <div className="homepage__banner">

                <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true} emulateTouch={true}>
                    <div>
                        <LazyLoadImage src='https://cdn.shopify.com/s/files/1/0565/9931/4585/files/Banner_Men_s_Sandal_900x.jpg?v=1623380326' alt='banner 1' />
                    </div>
                    <div>
                        <LazyLoadImage src='https://cdn.shopify.com/s/files/1/0565/9931/4585/files/Baner_Women_s_Sneaker_900x.jpg?v=1623380413' alt='banner 2' />
                    </div>
                    <div>
                        <LazyLoadImage src='https://cdn.shopify.com/s/files/1/0565/9931/4585/files/Banner_Women_s_sandal_900x.jpg?v=1623382127' alt='banner 3' />
                    </div>
                </Carousel>

            </div>
        </div>
    )
}
export default ProductBanner