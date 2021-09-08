import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/signinActions';
const Header = () => {
    const [state] = useState({
        logo: '/assets/images/logo.png',
    })
    const formate = (price) => {
        return `${price}.000`;
    }
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div className="header">
            <div className="container">
                <div className="row header__container">
                    <div className="header__logo">

                        <LazyLoadImage src={state.logo} alt="logo image" />
                    </div>
                    <div className="header__right">
                        <div className="header__right__cart__icon">
                            <div className="wrapper">
                                <div className="icon">
                                    <div className="tooltip mt-1  w-30">
                                        <div className="header__cart__heading">
                                            <div>Sản phẩm</div>
                                            <div>Số lượng</div>
                                        </div>
                                        {cartItems.length > 0 ? (
                                            cartItems.map(item => (
                                                <div className="header__cart__items" key={item.name}>
                                                    <div className="header__cart__items__name">
                                                        <LazyLoadImage src={item.image} alt={item.image} />
                                                        <div className="header__cart__items__name--name">{item.name}</div>
                                                    </div>
                                                    <div>x{item.qty}</div>
                                                </div>
                                            ))
                                        ) :
                                            (
                                                <div>không</div>
                                            )

                                        }
                                        <div className="header__cart__total">
                                            <div className="header__cart__total__text">Tổng tiền:</div>
                                            <div className="header__cart__total__price">
                                                {formate(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}<span className="header__cart__total__price__dollor "> VNĐ</span></div>
                                        </div>
                                    </div>
                                    <Link to='/cart'><MdShoppingCart size={30} /></Link>
                                </div>
                            </div>
                        </div>
                        {userInfo ? (
                            <div className="wrapper">
                                <div className="icon">
                                    <div className="tooltip mt-5">
                                        <Link to="/" className="header__right__heading">
                                            Thông tin tài khoản
                                        </Link>
                                        <div className="header__right__text" onClick={() => dispatch(signout())}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                    <div className="header__right__name">
                                        {userInfo.name}
                                    </div>
                                </div>
                            </div>

                        ) : (

                            <Link to="/signin">Đăng nhập</Link>
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}
export default Header;