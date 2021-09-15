import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from '../components/Product/Rating';
import { ORDER_PAY_RESET } from '../types/orderTypes';
import { PRODUCT_REVIEW_CREATE_RESET } from '../types/productTypes';
import { createReview } from '../actions/productActions';

import { Helmet } from "react-helmet-async";
const OrderDetails = (props) => {

    const orderDetailss = useSelector((state) => state.orderDetails.orderDetails);
    const dispatch = useDispatch();
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const getRate = (rate) => {
        setRating(rate);
    }
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [productId, setProductId] = useState('');
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
        dispatch(detailsOrder(props.match.params.id))
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch({ type: ORDER_PAY_RESET })
    }, [])

    const [toggle, setToggle] = useState(false);
    return (
        <>
            <Helmet>
                <title>Thông tin đơn hàng</title>
            </Helmet>
            <div className="information ">
                {orderDetailss ? (<div className="container">
                    <div className="row">
                        <div className="col-1 m-0"></div>
                        <div className="col-5 m-6 ">
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
                            <div className="information__heading__homepage"><Link to="/" >Tiếp tục mua sắm</Link></div>
                        </div>
                        <div className="col-5 m-6 s-0">
                            <div className="information__cart">
                                {orderDetailss.orderItems.length > 0 ? orderDetailss.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <div className="information__cart__item" >
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
                                                {(item.price * item.qty).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </div>
                                        </div>
                                        {orderDetailss && (<div className="informartion__review">
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
                                        </div>)}
                                    </div>
                                )) : ('')}
                                <div className="information__cart__fee">
                                    <div className="information__cart__fee__total">
                                        <div className="information__cart__fee__total__text">
                                            Tổng tiền
                                        </div>
                                        <div className="information__cart__fee__total__price">
                                            {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })} <span className="information__cart__item__total__dollor"> VNĐ</span>
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
                                        {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="information__heading__show">
                            <div className={toggle ? 'information__toggle-close' : 'information__toggle-open'} onClick={() => setToggle(!toggle)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div><span className="information__heading__show__text">Thông tin giỏ hàng</span>
                        </div>
                        <div className="col-5 m-6 s-12">
                            <div className={toggle ? 'information__cart-open' : 'information__cart-close'}><div className="information__cart">
                                {orderDetailss.orderItems.length > 0 ? orderDetailss.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <div className="information__cart__item" >
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
                                                {(item.price * item.qty).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </div>
                                        </div>
                                        {orderDetailss && (<div className="informartion__review">
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
                                        </div>)}
                                    </div>
                                )) : ('')}
                                <div className="information__cart__fee">
                                    <div className="information__cart__fee__total">
                                        <div className="information__cart__fee__total__text">
                                            Tổng tiền
                                        </div>
                                        <div className="information__cart__fee__total__price">
                                            {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })} <span className="information__cart__item__total__dollor"> VNĐ</span>
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
                                        {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>
                                </div>
                            </div></div>
                        </div>
                        <div className="col-1 m-0 s-0"></div>
                    </div>

                </div>) : ('')}

            </div ></>
    )
}
export default OrderDetails