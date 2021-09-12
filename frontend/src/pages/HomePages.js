import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import ProductImage from "../components/Product/ProductImage";
import ProductContents from "../components/Product/ProductContents";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
const HomePage = () => {
    const [imageBitis] = useState({
        image1: 'https://fshop-app.s3.us-east-2.amazonaws.com/bitis1.PNG',
        image2: 'https://fshop-app.s3.us-east-2.amazonaws.com/bitis2.PNG',
    })
    const dispatch = useDispatch();
    const [category, setCategory] = '';
    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    let product3 = [];
    if (!loading) {

        product3 = products.slice(0, 3);
    }
    const addToCartHandler = (productId) => {

        dispatch(addToCart(productId, 1));
    }

    useEffect(() => {
        dispatch(listProducts({}));
        console.log(product3)
    }, [dispatch]);
    return (
        <>
            <Header />
            <div className="homepage">
                <div className="homepage__banner">
                    <LazyLoadImage src={imageBitis.image1} alt={imageBitis.image} />
                </div>

                <div className="container">

                    <div className="homepage__heading">
                        <h1>
                            We are FSHOP
                        </h1>

                    </div>
                    <div className="homepage__text">

                        <div>
                            Chuyên cung cấp sản phẩm chính hãng của Biti's
                        </div>
                    </div>

                </div>
                <div className="homepage__banner">
                    <LazyLoadImage src={imageBitis.image2} alt={imageBitis.image} />
                </div>

                <div className="container">

                    <div className="homepage__heading">
                        <h1>
                            NAM
                        </h1>
                    </div>
                    {loading ? '' : (
                        <div className="row">
                            {product3.length > 2 ? product3.map((product) => (
                                <div className="col-4 p-15" key={product._id}>
                                    <div className="cities__body">
                                        <Link to={`/product/${product._id}`}>
                                            <ProductImage img={product.images[0].image} />
                                        </Link>
                                        <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id)} />


                                    </div>
                                </div>
                            )) : ''}
                        </div>
                    )}
                    <div className="homepage__button">
                        <button className='btn-orange' ><Link to='/products/male'>Xem thêm sản phẩm</Link></button>

                    </div>
                    <div className="homepage__heading">
                        <h1>
                            NỮ
                        </h1>
                    </div>
                    {loading ? '' : (
                        <div className="row">
                            {product3.length > 0 ? product3.map((product) => (
                                <div className="col-4 p-15" key={product._id}>
                                    <div className="cities__body">
                                        <Link to={`/product/${product._id}`}>
                                            <ProductImage img={product.images[0].image} />
                                        </Link>
                                        <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id)} />


                                    </div>
                                </div>
                            )) : ''}
                        </div>
                    )}
                    <div className="homepage__button">
                        <button className='btn-orange' ><Link to='/products/famale'>Xem thêm sản phẩm</Link></button>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default HomePage