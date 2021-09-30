import { LazyLoadImage } from "react-lazy-load-image-component";
import React from 'react'
const ProductImage = ({ img }) => {
    return (
        <div className="cities__body__image">
            <LazyLoadImage src={img} alt={img} />
        </div>
    )
}
export default ProductImage;