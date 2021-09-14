import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BsSearch } from 'react-icons/bs';
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/signinActions';
import Toggle from './Menu/Toggle';
import SearchBox from './Menu/SearchBox';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const Header = () => {
    const [state] = useState({
        logo: '/assets/images/logo.png',
        logoEmpty: '/assets/images/emptycartsmall.png',

    })
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [openSearch, setOpenSearch] = useState(false);
    const [openToggle, setOpenToggle] = useState(false);
    const getToggle = () => {
        setOpenToggle(!openToggle);
    }
    return (
        <div className="header">
            <div className="container">
                <div className="row header__container">
                    <Toggle getOpen={getToggle} />
                    <BsSearch className="search" onClick={() => setOpenSearch(!openSearch)} />

                    {openSearch ? <div className='navLayer zi-10' onClick={() => setOpenSearch(!openSearch)}></div> : ''}

                    <div className={openSearch ? 'header__search__small header__search__small--open' : 'header__search__small header__search__small--close'} >

                        <SearchBox />
                    </div>

                    <div className="header__logo">
                        <Link to='/'>
                            <div className='header__logo__text'>Fshop</div></Link>
                    </div>
                    <Route
                        render={({ history }) => <SearchBox history={history}></SearchBox>}
                    ></Route>
                    <div className="header__right">
                        <div className="header__right__cart__icon">
                            <div className="wrapper">
                                <div className="icon">
                                    <div className="tooltip mt-1  w-30 r-3">

                                        {cartItems && (cartItems.length > 0 ? (
                                            <>
                                                <div className="header__cart__heading">
                                                    <div>Sản phẩm</div>
                                                    <div>Số lượng</div>
                                                </div>
                                                {cartItems.map(item => (
                                                    <div className="header__cart__items" key={item.product}>
                                                        <div className="header__cart__items__name">
                                                            <LazyLoadImage src={item.image} alt={item.image} />
                                                            <div className="header__cart__items__name--name">{item.name}</div>
                                                        </div>
                                                        <div>x{item.qty}</div>
                                                    </div>
                                                ))}
                                                <div className="header__cart__total">
                                                    <div className="header__cart__total__text">Tổng tiền:</div>
                                                    <div className="header__cart__total__price">
                                                        {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}</div>
                                                </div>
                                            </>) :
                                            (
                                                <div className="header__cart__items__empty">
                                                    <LazyLoadImage src={state.logoEmpty} alt={state.logoEmpty} />
                                                </div>
                                            )

                                        )}

                                    </div>
                                    {cartItems && (cartItems.length > 0 ? (
                                        <div className="header__cart__count">{cartItems.reduce((a, c) => a + c.qty, 0)}</div>
                                    ) : "")}
                                    <Link to='/cart'><MdShoppingCart size={30} /></Link>
                                </div>
                            </div>
                        </div>
                        {userInfo ? userInfo.isAdmin ? (

                            <div className="wrapper">
                                <div className="icon">
                                    <div className="tooltip mt-5">
                                        <div className="header__right__user">
                                            <div className="header__right__user__heading">
                                                <Link to="/dashboard">Dashboard</Link>
                                            </div>
                                            <div className="header__right__user__heading">
                                                <Link to="/productlist">Products</Link>
                                            </div>
                                            <div className="header__right__user__heading">
                                                <Link to="/orderlist">Orders</Link>
                                            </div>
                                            <div className="header__right__user__heading">
                                                <Link to="/userlist">Users</Link>
                                            </div>

                                            <div className="header__right__user__child" onClick={() => dispatch(signout())}>
                                                Đăng xuất
                                            </div>
                                        </div>

                                    </div>
                                    <div className="header__right__name">
                                        {userInfo.name}
                                    </div>
                                </div >
                            </div >



                        ) : (
                            <div className="wrapper">
                                <div className="icon">
                                    <div className="tooltip mt-5">
                                        <div className="header__right__user">
                                            <div className="header__right__user__heading">
                                                <Link to="/profile" >
                                                    Thông tin tài khoản
                                                </Link>
                                            </div>

                                            <div className="header__right__user__child" onClick={() => dispatch(signout())}>
                                                Đăng xuất
                                            </div>
                                        </div>

                                    </div>
                                    <div className="header__right__name">
                                        {userInfo.name}
                                    </div>
                                </div >
                            </div >
                        ) : (<div className="header__right__user__heading">
                            <Link to="/profile" >
                                Đăng nhập
                            </Link>
                        </div>)}

                    </div >
                </div >
                <div className="row ">
                    <div className={openToggle ? "header__links header__links--open" : "header__links header__links--close"}>
                        <div className="header__links__small">
                            <div>
                                <Link to=''>About Fshop</Link></div>
                            <div>
                                <Link to='/products/male'>Nam</Link></div>

                            <div>
                                <Link to='/products/famale'>Nữ</Link></div>

                            <div>
                                <Link to=''>Khuyến mãi</Link></div>
                            <div className="header__links__small__add"> <Link to=''>Đăng nhập</Link></div>
                            <div className="header__links__small__add"> <Link to=''>Tạo tài khoản</Link></div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}
export default Header;