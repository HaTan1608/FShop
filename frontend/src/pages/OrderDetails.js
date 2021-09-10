import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';
import { createReview } from '../actions/productActions';

import { BsFillStarFill, BsStar } from 'react-icons/bs';
import { ORDER_PAY_RESET } from '../types/orderTypes';
import { PRODUCT_REVIEW_CREATE_RESET } from '../types/productTypes';
import Rating from '../components/Product/Rating';
const OrderDetails = (props) => {

    const orderDetailss = useSelector((state) => state.orderDetails.orderDetails);
    const dispatch = useDispatch();
    const formate = (price) => {
        return `${price}.000`;
    }
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [productId, setProductId] = useState('');
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;
    const [open, setOpen] = useState(false)
    const openReview = (id) => {
        setOpen(!open);
        setProductId(id);
        if (open) {

            document.getElementById(id).className = 'hidden';
        } else {

            document.getElementById(id).className = '';
        }
    }
    const getRate = (rate) => {
        setRating(rate);
    }
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name })
            );
        } else {
            alert('Please enter comment and rating');
        }
    };
    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch({ type: ORDER_PAY_RESET })
        dispatch(detailsOrder(props.match.params.id))
    }, [])
    return (
        <div className="information ">
            {orderDetailss ? (<div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-5">
                        <h1>FShop</h1>
                        <div className="information__heading">
                            <div className="information__heading__text">Thông tin giao hàng</div>
                        </div>
                        <div className="information__heading__user">
                            <div className="information__heading__user__name"><span>Tên người nhận:</span>{orderDetailss.shippingAddress.fullName}</div>
                            <div className="information__heading__user__name"><span>Số điện thoại</span>{orderDetailss.shippingAddress.phone}</div>
                            <div className="information__heading__user__name"><span>Địa chỉ</span>{orderDetailss.shippingAddress.address + ' ' + orderDetailss.shippingAddress.city}</div>
                            <div className="information__heading__text mt-2">Hình thức thanh toán</div>

                            {orderDetailss.paymentMethod !== 'COD' ? (

                                <div className="information__heading__user__name"><span>{orderDetailss.paymentMethod}</span>Đã thanh toán</div>
                            ) : (
                                <div className="information__heading__user__name">Thanh toán trực tiếp ( COD )</div>
                            )}

                            <div className="information__heading__text mt-2">Trạng thái vận chuyển</div>
                            {orderDetailss.isDelivered !== true ? (

                                <div className="information__heading__user__name">Chưa vận chuyển</div>
                            ) : (
                                <div className="information__heading__user__name">Đã giao</div>
                            )}
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="information__cart">
                            {orderDetailss.orderItems.length > 0 ? orderDetailss.orderItems.map((item) => (
                                <>  <div className="information__cart__item" key={item.product}>
                                    <div className="information__cart__item__image">
                                        <LazyLoadImage src={item.image} alt={item.image} />
                                    </div>
                                    <div className="information__cart__item__qty">
                                        {item.qty}
                                    </div>
                                    <div className="information__cart__item__name">
                                        {item.name}
                                    </div>
                                    <div className="information__cart__item__total">
                                        {formate(item.price * item.qty)}<span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>

                                </div>



                                    <div className="informartion__review">
                                        <div className="information__review__rating">{orderDetailss.isDelivered ? <button className="btn-dark" onClick={() => openReview(item.product)} >Nhận xét</button> : ''}</div>


                                        {userInfo ? (

                                            <form className="hidden" onSubmit={submitHandler} id={item.product}>

                                                <div className="information__review__rating">
                                                    <span className="pr-2">Đánh giá</span>
                                                    <Rating sendRateChild={getRate} />
                                                </div>
                                                <div className="information__review__comment">
                                                    <div>Bình luận</div>
                                                    <textarea
                                                        id="comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div className="information__review__rating">
                                                    <button className="btn-default" type="submit">
                                                        Gửi nhận xét
                                                    </button>
                                                </div>
                                                <div>
                                                    {loadingReviewCreate && ''}
                                                    {errorReviewCreate && (
                                                        ''
                                                    )}
                                                </div>
                                            </form>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </>
                            )) : ('')}
                            <div className="information__cart__fee">
                                <div className="information__cart__fee__total">
                                    <div className="information__cart__fee__total__text">
                                        Tổng tiền
                                    </div>
                                    <div className="information__cart__fee__total__price">
                                        {formate(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>
                                </div>
                                <div className="information__cart__fee__ship">
                                    <div className="information__cart__fee__ship__text">
                                        Phí ship
                                    </div>
                                    <div className="information__cart__fee__ship__price">
                                        Miễn phí
                                    </div>
                                </div>

                            </div>
                            <div className="information__cart__total">
                                <div className="information__cart__total__text">
                                    Tổng
                                </div>
                                <div className="information__cart__total__price">
                                    {formate(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>) : ('')}

        </div >
    )
}
export default OrderDetails