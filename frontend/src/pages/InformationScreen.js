import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions';
const InformationScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { shippingAddress } = cart;
    if (cartItems.length < 1) {
        props.history.push('/cart');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const [city, setCity] = useState(shippingAddress.city);
    const dispatch = useDispatch();
    const formate = (price) => {
        return `${price}.000`;
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, address, city, phone })
        );
        props.history.push('/payment');
    };
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
                                    <div className="information__heading__text">Thông tin liên hệ</div>
                                </div>
                                <div className="information__heading__user">
                                    <div className="information__heading__user__name"><span>Họ và tên:</span>{userInfo.name}</div>
                                    <div className="information__heading__user__name"><span>Email:</span>{userInfo.email}</div>
                                </div>
                            </>
                        ) : (
                            <div className="information__heading">
                                <div className="information__heading__text">Thông tin liên hệ</div>
                                <div className="information__heading__link">Đã có tài khoản? <Link>Đăng nhập</Link></div>
                            </div>
                        )}

                        <div className="information__heading">
                            <div className="information__heading__text">Địa chỉ giao hàng</div>
                        </div>
                        <div className="information__heading__form">
                            <form onSubmit={submitHandler}>

                                <input type="text" className="information__heading__form__input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                <div className="information__heading__form__text">Họ tên người nhận</div>

                                <input type="text" className="information__heading__form__input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                <div className="information__heading__form__text">Địa chỉ</div>
                                <input type="text" className="information__heading__form__input" value={city} onChange={(e) => setCity(e.target.value)} required />
                                <div className="information__heading__form__text">Thành phố</div>
                                <input type="text" className="information__heading__form__input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <div className="information__heading__form__text">Số điện thoại</div>
                                <button className="btn-dark w-40" type="submit">HÌNH THỨC THANH TOÁN</button>
                            </form>
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
export default InformationScreen