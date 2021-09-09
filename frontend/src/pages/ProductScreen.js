import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { BsFillStarFill, BsStar } from 'react-icons/bs';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart } from '../actions/cartActions';
export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product } = productDetails;
    const [qty, setQty] = useState(1);
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const formate = (price) => {
        return `${price}.000`;
    }
    const ctrl = (number) => {

        document.getElementById("qty-input").value = qty + number;
        setQty(parseInt(qty + number));
    }
    const rating = (number) => {
        let container = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= number) {
                container.push(<BsFillStarFill key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
            } else {
                container.push(<BsStar key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)

            }
        }
        return container;
    }

    const addToCartHandler = (id, qty) => {
        let a = cartItems.find(item => item.product === id);
        if (a) {
            console.log(a);
            dispatch(addToCart(id, a.qty + qty));
        } else {
            dispatch(addToCart(id, qty));
        }
    }
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    return (
        <>

            <Header />
            {loading ? (
                ''
            ) : (<>
                <div className="product__details">
                    <div className="container">
                        <div className="row ">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-9">
                                        <div className="product__details__image">
                                            <LazyLoadImage
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="product__details__contents">
                                    <div className="product__details__contents__name">
                                        <h1>{product.name}</h1>
                                    </div>
                                    <div className="product__details__contents__rating">
                                        {rating(product.rating)}
                                    </div>
                                    <h2 className="product__details__contents__price"> {formate(product.price)}<span className="product__details__contents__price__dollor">VNĐ</span></h2>

                                    <div className="product__details__contents__status">
                                        {product.countInStock > 0 ? (
                                            <div className="product__details__contents__status--true">Còn hàng</div>
                                        ) : (
                                            <div className="product__details__contents__status--false">Hết hàng</div>
                                        )}
                                    </div>
                                    {product.countInStock > 0 ? (
                                        <>
                                            <span className='ctrl'>
                                                <div className='ctrl__button ctrl__button--decrement' onClick={() => ctrl(-1)}>&ndash;</div>
                                                <div className='ctrl__counter'>
                                                    <input className='ctrl__counter-input' type='text' id='qty-input' defaultValue={1} onChange={(e) => setQty(parseInt(e.target.value))} />
                                                </div>
                                                <div className='ctrl__button ctrl__button--increment ' onClick={() => ctrl(1)}>+</div>
                                                <button className="btn-dark ml-2" onClick={() => addToCartHandler(product._id, qty)}>Thêm vào giỏ hàng</button>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn-dark mb-2" disabled>Thêm vào giỏ hàng</button>
                                        </>
                                    )}
                                    <div className="product__details__contents__description__heading">
                                        Mô tả sản phẩm
                                    </div>
                                    <div className="product__details__contents__description__msg">{product.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container"> <div className="row">

                    <div className="product__reviews"> Nhận xét, đánh giá</div>
                </div>
                </div>
            </>
            )}
            <Footer />
        </>

    );
}