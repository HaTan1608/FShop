import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md'
import { addToCart, removeFromCart } from '../actions/cartActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
export default function CartScreen(props) {
    const productId = props.match.params.id;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const [empty] = useState({
        logo: '/assets/images/emptycart.png',
    })
    const ctrl = (id, number) => {
        const newQty = parseInt(document.getElementById(`qty-input-${id}`).value) + number;
        if (newQty > 0) {
            document.getElementById(`qty-input-${id}`).value = newQty;
            dispatch(addToCart(id, number))
        }
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        props.history.push('/checkout');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Helmet>
                <title>Giỏ hàng</title>

            </Helmet>
            <Header />
            <div className="cart">
                <div className="container">
                    {cartItems.length > 0 && (<div className="cart__link">
                        <Link to='/'>Tiếp tục mua sắm</Link></div>)}
                    <div className="row">


                        {cartItems.length > 0
                            ? (<>

                                <div className="col-10 m-12 s-12">


                                    <div className="row cart__title m-0">
                                        <div className="col-6 cart__title__product m-0">SẢN PHẨM</div>
                                        <div className="col-6 cart__title__atc m-0 ">
                                            <span>GIÁ</span>
                                            <span>SỐ LƯỢNG</span>
                                            <span>THÀNH TIỀN</span>
                                        </div>
                                    </div>
                                    {
                                        cartItems.map((item) => (
                                            <div className="row" key={item.product}>
                                                <div className="col-6 cart__infomation">

                                                    <div className="cart__infomation__image">
                                                        <LazyLoadImage src={item.image} />
                                                    </div>
                                                    <div className="cart__infomation__name">
                                                        {item.name}
                                                    </div>
                                                    <div className="cart__infomation__size">
                                                        Size {item.size}
                                                    </div>
                                                </div>
                                                <div className="col-6 cart__infomation">
                                                    <div className="cart__infomation__price">
                                                        {(item.price).toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}<span className="cart__infomation__price__dollor"> VNĐ</span>
                                                    </div>
                                                    <div className="cart__infomation__qty ">
                                                        <span className='ctrl cart__infomation__stepper'>
                                                            <div className='ctrl__button ctrl__button--decrement' onClick={(e) => ctrl(item.product, -1)}>&ndash;</div>
                                                            <div className='ctrl__counter'>
                                                                <input className='ctrl__counter-input' type='text' id={`qty-input-${item.product}`} defaultValue={item.qty} onChange={(e) =>
                                                                    dispatch(
                                                                        addToCart(item.product, Number(e.target.value))
                                                                    )
                                                                } />
                                                            </div>
                                                            <div className='ctrl__button ctrl__button--increment ' onClick={(e) => ctrl(item.product, 1)}>+</div>
                                                        </span>
                                                    </div>
                                                    <div className="cart__infomation__total">
                                                        {(item.price * item.qty).toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </div>
                                                    <div className="cart__infomation__delete">
                                                        <MdDeleteForever size={30} onClick={() => removeFromCartHandler(item.product)} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))

                                    }
                                </div>
                                <div className="col-2 m-12 s-12">
                                    <div className="cart__checkout">
                                        <h2 className="cart__checkout__heading">TỔNG TIỀN </h2>

                                        <div className="cart__checkout__total">{(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}<span className="cart__infomation__price__dollor"> VNĐ</span></div>
                                        <div className="cart__checkout__qty">  ( {cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm ) </div>
                                        <div className="cart__checkout__button">
                                            <button type='button' onClick={checkoutHandler} className="btn-dark">Checkout</button>
                                        </div>
                                    </div>
                                </div></>)
                            : (<>
                                <div className="cart__empty">
                                    <LazyLoadImage src={empty.logo} alt={empty.logo} />

                                </div>
                                <div className="cart__empty__link">
                                    <Link to='/'>Tiếp tục mua sắm</Link>
                                </div></>
                            )}


                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}