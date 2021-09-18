import React, { useState } from "react";

import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import MessageBox from "../Message/MessageBox";
const ProductContents = ({ name, price, ratingStar, addCart }) => {
    const [openMess, setOpenMess] = useState({ open: false, tittle: '', content: '', type: '', duration: 0 });

    const sendData = () => {
        setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Đã thêm sản phẩm vào giỏ hàng', type: 'success' })
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
    return (<>
        <MessageBox messData={openMess} />
        <div className="cities__body__contents ">


            <div className="cities__body__contents__top">
                <div className="cities__body__contents__top__name">{name}</div>

            </div>
            <div className="product__details__contents__rating">
                {rating(ratingStar)}
            </div>
            <div className="cities__body__contents__price">
                {(price).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                })}


            </div>

            <div className="cities__body__contents__button">
                <button className='btn-default' onClick={sendData} >Thêm vào giỏ hàng</button>
            </div>
        </div>
    </>
    )
}
export default ProductContents;