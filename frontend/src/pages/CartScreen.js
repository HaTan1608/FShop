import React, { useEffect, useReducer, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md'
import { addToCart, removeFromCart } from '../actions/cartActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const formate = (price) => {
        return `${price}.000`;
    }
    const ctrl = (id, number) => {
        const newQty = parseInt(document.getElementById(`qty-input-${id}`).value) + number;
        document.getElementById(`qty-input-${id}`).value = newQty;
        if (productId === id) {
            props.history.push(`/cart/${id}?qty=${newQty}`)
        }
        else {

            console.log(id, newQty);
            dispatch(addToCart(id, newQty))
        }
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        alert('sdsadsa')
        props.history.push('/checkout');
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    return (
        <>
            <Header />
            <div className="cart">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <div className="row cart__title">
                                <div className="col-6 cart__title__product">SẢN PHẨM</div>
                                <div className="col-6 cart__title__atc">
                                    <span>GIÁ</span>
                                    <span>SỐ LƯỢNG</span>
                                    <span>THÀNH TIỀN</span>
                                </div>
                            </div>
                            {
                                cartItems.length > 0 ?
                                    (
                                        cartItems.map((item) => (
                                            <div className="row" key={item.name}>
                                                <div className="col-6 cart__infomation">

                                                    <div className="cart__infomation__image">
                                                        <LazyLoadImage src={item.image} />
                                                    </div>
                                                    <div className="cart__infomation__name">
                                                        {item.name}
                                                    </div>
                                                </div>
                                                <div className="col-6 cart__infomation">
                                                    <div className="cart__infomation__price">
                                                        {formate(item.price)}<span className="cart__infomation__price__dollor"> VNĐ</span>
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
                                                        {formate(item.price * item.qty)}<span className="cart__infomation__price__dollor"> VNĐ</span>
                                                    </div>
                                                    <div className="cart__infomation__delete">
                                                        <MdDeleteForever size={30} onClick={() => removeFromCartHandler(item.product)} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : ''
                            }

                        </div>
                        <div className="col-2">
                            <div className="cart__checkout">
                                <h2 className="cart__checkout__heading">TỔNG TIỀN </h2>

                                <div className="cart__checkout__total">{formate(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}<span className="cart__infomation__price__dollor"> VNĐ</span></div>
                                <div className="cart__checkout__qty">  ( {cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm ) </div>
                                <div className="cart__checkout__button">
                                    <button type='button' onClick={checkoutHandler} className="btn-dark">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <Footer />
        </>
    );
}