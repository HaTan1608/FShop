import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions';
import InformationScreen from './InformationScreen';
import CartInformation from '../components/Cart/CartInformation';
import { Helmet } from "react-helmet-async";
const PaymentScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, cartItems } = cart;
    const dispatch = useDispatch();

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
        if (!cartItems || cartItems.length === 0) {
            props.history.push('/');
        }
    }, [success, cartItems])
    const [toggle, setToggle] = useState(false);

    return (<>
        <Helmet>
            <title>Thanh toán</title>

        </Helmet>
        <div className="information ">
            <div className="container">
                <div className="row">
                    <div className="col-1 m-0"></div>
                    <div className="col-5 m-6">
                        <div className="links__back xs-0 s-0"><Link to='/checkout'>Quay về</Link></div>
                        <h1>FShop</h1>
                        {userInfo ? (
                            <>
                                <div className="information__heading">
                                    <div className="information__heading__text">Thông tin giao hàng</div>
                                </div>
                                <div className="information__heading__user">
                                    <div className="information__heading__user__name"><span>Liên hệ:</span>{shippingAddress.phone}</div>
                                    <div className="information__heading__user__name"><span>Giao tới:</span>{shippingAddress.address}&nbsp; {shippingAddress.city}</div>
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

                    <div className="col-5 m-6 s-0">
                        <CartInformation />
                    </div>
                    <div className="information__heading__show">
                        <div className={toggle ? 'information__toggle-close' : 'information__toggle-open'} onClick={() => setToggle(!toggle)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div><span className="information__heading__show__text">Thông tin giỏ hàng</span>
                    </div>
                    <div className="col-5 m-6 s-12">
                        <div className={toggle ? 'information__cart-open' : 'information__cart-close'}><CartInformation /></div>
                    </div>
                    <div className="col-1 m-0 s-0"></div>
                </div>

            </div>
        </div ></>
    )
}
export default PaymentScreen