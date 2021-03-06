import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from '../components/Product/Rating';
import { ORDER_PAY_RESET } from '../types/orderTypes';
import { PRODUCT_REVIEW_CREATE_RESET } from '../types/productTypes';
import { ORDER_CREATE_RESET } from '../types/orderTypes';
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
        dispatch({ type: ORDER_CREATE_RESET })
        dispatch(detailsOrder(props.match.params.id))
        if (successReviewCreate) {
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
                <title>Th??ng tin ????n h??ng</title>
            </Helmet>
            <div className="information ">
                {orderDetailss ? (<div className="container">
                    <div className="row">
                        <div className="col-1 m-0"></div>
                        <div className="col-5 m-6 ">
                            <h1>FShop</h1>
                            <div className="information__heading">
                                <div className="information__heading__text">Th??ng tin giao h??ng</div>
                            </div>
                            <div className="information__heading__user">
                                <div className="information__heading__user__name"><span>T??n ng?????i nh???n:</span>{orderDetailss.shippingAddress.fullName}</div>
                                <div className="information__heading__user__name"><span>S??? ??i???n tho???i</span>{orderDetailss.shippingAddress.phone}</div>
                                <div className="information__heading__user__name"><span>?????a ch???</span>{orderDetailss.shippingAddress.address + ' ' + orderDetailss.shippingAddress.city}</div>
                                <div className="information__heading__text mt-2">H??nh th???c thanh to??n</div>

                                {orderDetailss.paymentMethod !== 'COD' ? (

                                    <div className="information__heading__user__name"><span>{orderDetailss.paymentMethod}</span>???? thanh to??n</div>
                                ) : (
                                    <div className="information__heading__user__name">Thanh to??n tr???c ti???p ( COD )</div>
                                )}
                                <div className="information__heading__text mt-2">Tr???ng th??i v???n chuy???n</div>
                                {orderDetailss.isDelivered !== true ? (

                                    <div className="information__heading__user__name">Ch??a v???n chuy???n</div>
                                ) : (
                                    <div className="information__heading__user__name">???? giao</div>
                                )}
                            </div>
                            <div className="information__heading__homepage"><Link to="/" >Ti???p t???c mua s???m</Link></div>
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
                                            <div className="information__review__rating">{orderDetailss.isDelivered ? <button className="btn-dark" onClick={() => openReview(item.product)} >Nh???n x??t</button> : ''}</div>
                                            {userInfo ? (
                                                <form className="hidden" onSubmit={submitHandler} id={item.product}>
                                                    <div className="information__review__rating">
                                                        <span className="pr-2">????nh gi??</span>
                                                        <Rating sendRateChild={getRate} />
                                                    </div>
                                                    <div className="information__review__comment">
                                                        <div>B??nh lu???n</div>
                                                        <textarea
                                                            id="comment"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                    <div className="information__review__rating">
                                                        <button className="btn-default" type="submit">
                                                            G???i nh???n x??t
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
                                            T???ng ti???n
                                        </div>
                                        <div className="information__cart__fee__total__price">
                                            {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </div>
                                    </div>
                                    <div className="information__cart__fee__ship">
                                        <div className="information__cart__fee__ship__text">
                                            Ph?? ship
                                        </div>
                                        <div className="information__cart__fee__ship__price">
                                            Mi???n ph??
                                        </div>
                                    </div>

                                </div>
                                <div className="information__cart__total">
                                    <div className="information__cart__total__text">
                                        T???ng
                                    </div>
                                    <div className="information__cart__total__price">
                                        {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="information__heading__show">
                            <div className={toggle ? 'information__toggle-close' : 'information__toggle-open'} onClick={() => setToggle(!toggle)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div><span className="information__heading__show__text">Th??ng tin gi??? h??ng</span>
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
                                            <div className="information__review__rating">{orderDetailss.isDelivered ? <button className="btn-dark" onClick={() => openReview(item.product)} >Nh???n x??t</button> : ''}</div>
                                            {userInfo ? (
                                                <form className="hidden" onSubmit={submitHandler} id={item.product}>
                                                    <div className="information__review__rating">
                                                        <span className="pr-2">????nh gi??</span>
                                                        <Rating sendRateChild={getRate} />
                                                    </div>
                                                    <div className="information__review__comment">
                                                        <div>B??nh lu???n</div>
                                                        <textarea
                                                            id="comment"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                    <div className="information__review__rating">
                                                        <button className="btn-default" type="submit">
                                                            G???i nh???n x??t
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
                                            T???ng ti???n
                                        </div>
                                        <div className="information__cart__fee__total__price">
                                            {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </div>
                                    </div>
                                    <div className="information__cart__fee__ship">
                                        <div className="information__cart__fee__ship__text">
                                            Ph?? ship
                                        </div>
                                        <div className="information__cart__fee__ship__price">
                                            Mi???n ph??
                                        </div>
                                    </div>
                                </div>
                                <div className="information__cart__total">
                                    <div className="information__cart__total__text">
                                        T???ng
                                    </div>
                                    <div className="information__cart__total__price">
                                        {(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
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