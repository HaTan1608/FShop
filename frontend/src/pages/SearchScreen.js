import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import ProductImage from "../components/Product/ProductImage";
import ProductContents from "../components/Product/ProductContents";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useParams } from "react-router";
const SearchScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
    } = useParams();
    const addToCartHandler = (productId) => {

        dispatch(addToCart(productId, 1));

    }
    useEffect(() => {
        alert(name);
        dispatch(listProducts({
            name
        }));
    }, [dispatch, name]);

    return (
        <>

            <Header />
            <div className='cities'>
                <div className='container'>
                    <div className='cities__container'>
                        <h2 className="heading">Cities in Polo</h2>

                        <div className="row mr-minus-15 ml-minus-15">
                            <div className="col-2 p-15">
                            </div>
                            <div className="col-10 p-15">
                                {loading ? '' : (
                                    <div className="row">
                                        {products.length > 0 ? products.map((product) => (
                                            <div className="col-4 p-15" key={product._id}>
                                                <div className="cities__body">
                                                    <Link to={`/product/${product._id}`}>
                                                        <ProductImage img={product.image} />
                                                    </Link>
                                                    <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id)} />


                                                </div>
                                            </div>
                                        )) : ''}
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default SearchScreen