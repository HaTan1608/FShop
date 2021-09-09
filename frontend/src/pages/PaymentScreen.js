import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions';
const PaymentScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const formate = (price) => {
        return `${price}.000`;
    }
    if (!shippingAddress.address) {
        props.history.push('/checkout');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const { success, order } = orderCreate;
    const [sdkReady, setSdkReady] = useState(false);
    cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    cart.shippingPrice = 0;
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const successPaymentHandler = () => {
        dispatch(createOrder({ ...cart, paymentMethod: 'Paypal', orderItems: cart.cartItems }))
    }
    const setPaymentCOD = () => {
        dispatch(createOrder({ ...cart, paymentMethod: 'COD', orderItems: cart.cartItems }))
    }
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };


        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkReady(true);
        }


        if (success) {
            props.history.push(`/order/${order._id}`);
        }
    }, [success])
    return (
        <div className="information ">
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-5">
                        <h1>FShop</h1>
                        {userInfo ? (
                            <>
                                <div className="information__heading">
                                    <div className="information__heading__text">Thông tin giao hàng</div>
                                </div>
                                <div className="information__heading__user">
                                    <div className="information__heading__user__name"><span>Liên hệ:</span>{shippingAddress.phone}</div>
                                    <div className="information__heading__user__name"><span>Giao tới:</span>{shippingAddress.address + shippingAddress.city}</div>
                                </div>
                            </>
                        ) : (
                            <div className="information__heading">
                                <div className="information__heading__text">Thông tin liên hệ</div>
                                <div className="information__heading__link">Đã có tài khoản? <Link>Đăng nhập</Link></div>
                            </div>
                        )}

                        <div className="information__heading">
                            <div className="information__heading__text">Hình thức thanh toán</div>
                        </div>
                        <div className="information__heading__form">
                            <div className="information__heading__form__COD">
                                <div onClick={setPaymentCOD}>Thanh toán trực tiếp</div>
                            </div>
                            <div className="information__heading__form__momo">
                                <div>momo</div>
                            </div>
                            <div className="information__heading__form__paypal">
                                {!sdkReady ? (
                                    ''
                                ) : (
                                    <PayPalButton
                                        amount='40'
                                        onSuccess={successPaymentHandler}
                                    ></PayPalButton>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="col-5">
                        <div className="information__cart">
                            {cartItems.length > 0 ? cartItems.map((item) => (
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
                                        {formate(item.price * item.qty)}<span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>
                                </div>
                            )) : ('')}
                            <div className="information__cart__fee">
                                <div className="information__cart__fee__total">
                                    <div className="information__cart__fee__total__text">
                                        Tổng tiền
                                    </div>
                                    <div className="information__cart__fee__total__price">
                                        {formate(cartItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
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
                                    {formate(cartItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
        </div >
    )
}
export default PaymentScreen