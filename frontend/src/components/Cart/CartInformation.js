import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder } from '../../actions/orderActions';
import { createReview } from '../../actions/productActions';
import { ORDER_PAY_RESET } from '../../types/orderTypes';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../types/productTypes';
import Rating from '../Product/Rating';
const CartInformation = (props) => {
    const orderDetailss = useSelector((state) => state.orderDetails.orderDetails);

    const cartFinal = useSelector((state) => state.orderDetails);
    const cart = useSelector((state) => state.cart);
    let { cartItems } = cart;
    const getRate = (rate) => {
        setRating(rate);
    }
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
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
    if (cartItems) {
        if (cartItems.length < 1) {

        }
    } else {

        cartItems = cartFinal.orderDetails.orderItems;
    }
    useEffect(() => {
        console.log(cartItems)
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch({ type: ORDER_PAY_RESET })
    }, [])
    return (
        <div className="information__cart">
            {cartItems.length > 0 ? cartItems.map((item) => (
                <>
                    <div className="information__cart__item" key={item.product}>
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
                            })}<span className="information__cart__item__total__dollor"> VNĐ</span>
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
                </>
            )) : ('')}
            <div className="information__cart__fee">
                <div className="information__cart__fee__total">
                    <div className="information__cart__fee__total__text">
                        Tổng tiền
                    </div>
                    <div className="information__cart__fee__total__price">
                        {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
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
                    {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                    })} <span className="information__cart__item__total__dollor"> VNĐ</span>
                </div>
            </div>
        </div>
    )
}
export default CartInformation;