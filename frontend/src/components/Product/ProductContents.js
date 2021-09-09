import React from "react";

import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
const ProductContents = ({ name, price, ratingStar, addCart }) => {
    const formate = (price) => {
        return `${price}.000`;
    }
    const sendData = () => {
        addCart();
    }
    const rating = (number) => {
        let container = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= number) {
                container.push(<BsFillStarFill key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
            } else {
                if (number + 1 - i > 0) {
                    container.push(<BsStarHalf key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
                }
                else {
                    container.push(<BsStar key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
                }


            }
        }
        return container;
    }
    return (
        <div className="cities__body__contents">
            <div className="cities__body__contents__top">
                <div className="cities__body__contents__top__name">{name}</div>

            </div>
            <div className="product__details__contents__rating">
                {rating(ratingStar)}
            </div>
            <div className="cities__body__contents__price">
                {formate(price)}

                <span className="cities__body__contents__price__dollor">VNĐ</span>
            </div>

            <div className="cities__body__contents__button">
                <button className='btn-default' onClick={sendData} >Thêm vào giỏ hàng</button>
            </div>
        </div>
    )
}
export default ProductContents;