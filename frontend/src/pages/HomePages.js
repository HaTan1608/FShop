import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import ProductImage from "../components/Product/ProductImage";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProductsHome } from "../actions/productActions";
import { Link } from "react-router-dom";
import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import { addToCart } from "../actions/cartActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet-async";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MessageBox from "../components/Message/MessageBox";
const HomePage = () => {
    const [imageBitis] = useState({
        image1: 'https://cdn.shopify.com/s/files/1/0565/9931/4585/files/z2584381159043_cf151161ee8677aae2f15686c3a75531_c00ba712-f330-47d9-8554-f2b3e6fe9673.jpg?v=1625049290',
        image2: 'https://fshop-app.s3.us-east-2.amazonaws.com/bitis2.PNG',
    })
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productListHome);
    const { loading, products } = productList;
    let product3 = [];
    let product4 = [];
    const rating = (number) => {
        let container = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= number) {
                container.push(<BsFillStarFill key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
            } else {
                if (number + 1 - i > 0) {
                    container.push(<BsStarHalf key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
                }
                else {
                    container.push(<BsStar key={i} size={20} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
                }
            }
        }
        return container;
    }
    if (!loading) {
        if (products.male) {
            products.male.map(product => product3.push(product))
        }
        if (products.famale) {
            products.famale.map(product => product4.push(product))
        }
    }
    const [openMess, setOpenMess] = useState('')
    const addToCartHandler = (productId, gender, index) => {
        if (gender === 'male') {
            setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Đã thêm sản phẩm vào giỏ hàng', type: 'success' })
            dispatch(addToCart(productId, 1, product3[index].size[0].size, 'yes'));
        } else {
            setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Đã thêm sản phẩm vào giỏ hàng', type: 'success' })
            dispatch(addToCart(productId, 1, product4[index].size[0].size, 'yes'));
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(listProductsHome());
    }, [dispatch]);
    return (
        <>
            <Helmet>
                <title>Welcome Fshop!</title>
                <meta name="description" content="Giày Bitis chính hãng" />
                <meta name='keywords' content='giày, bitis, bitis hunter, sandals' />
            </Helmet>
            <Header />
            <div className="homepage">
                <MessageBox messData={openMess} />
                <div className="homepage__banner" >

                    <Carousel showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true} emulateTouch={true}>
                        <div>
                            <LazyLoadImage src={imageBitis.image1} alt={imageBitis.image} />
                        </div>
                        <div>
                            <LazyLoadImage src={imageBitis.image2} alt={imageBitis.image} />
                        </div>
                    </Carousel>
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
                <div className="homepage__banner__center">
                    <ReactPlayer url='https://cdn.shopify.com/s/files/1/0565/9931/4585/files/output_compress-video-online.com_1.mp4?v=1629797501' playing={true} loop={true} muted={true} width='70%'
                        height='70%' />
                </div>
                <div className="container">

                    <div className="homepage__heading">
                        <h1>
                            NAM
                        </h1>
                    </div>
                    {loading ? '' : (
                        <div className="row">
                            {product3.length > 2 ? product3.map((product, index) => (
                                <div className="col-4 m-4 s-6 xs-12 p-15" key={product._id}>
                                    <div className="cities__body animation">
                                        <Link to={`/product/${product._id}`}>
                                            <ProductImage img={product.images[0].image} />
                                        </Link>
                                        <div className="cities__body__contents ">
                                            <div className="cities__body__contents__top">
                                                <div className="cities__body__contents__top__name">{product.name}</div>
                                            </div>
                                            <div className="product__details__contents__rating">
                                                {rating(product.rating)}
                                            </div>
                                            <div className="cities__body__contents__price">
                                                {(product.price).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </div>
                                            <div className="cities__body__contents__button">
                                                <button className='btn-default' onClick={() => addToCartHandler(product._id, product.gender, index)} >Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
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
                            {product4.length > 2 ? product4.map((product, index) => (
                                <div className="col-4 m-4 s-6 xs-12 p-15" key={product._id}>
                                    <div className="cities__body animation">
                                        <Link to={`/product/${product._id}`}>
                                            <ProductImage img={product.images[0].image} />
                                        </Link>
                                        <div className="cities__body__contents ">
                                            <div className="cities__body__contents__top">
                                                <div className="cities__body__contents__top__name">{product.name}</div>
                                            </div>
                                            <div className="product__details__contents__rating">
                                                {rating(product.rating)}
                                            </div>
                                            <div className="cities__body__contents__price">
                                                {(product.price).toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </div>
                                            <div className="cities__body__contents__button">
                                                <button className='btn-default' onClick={() => addToCartHandler(product._id, product.gender, index)} >Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
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