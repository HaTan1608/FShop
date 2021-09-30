import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { BsFillStarFill, BsStar } from 'react-icons/bs';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart } from '../actions/cartActions';
import LoadingBox from '../components/Message/LoadingBox';
import MessageBox from '../components/Message/MessageBox';
import SlideImage from '../components/Product/SlideImage';
import { Helmet } from "react-helmet-async";
export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product } = productDetails;
    const [qty, setQty] = useState(1);
    const [openMess, setOpenMess] = useState({ open: false, tittle: '', content: '', type: '', duration: 0 });
    const [size, setSize] = useState(product && product.size[0].size)
    const ctrl = (number) => {
        document.getElementById("qty-input").value = parseInt(qty) + parseInt(number);
        setQty(parseInt(qty + number));
    }
    const rating1 = (number, size) => {
        let container = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= number) {
                container.push(<BsFillStarFill key={i} size={size} color="#df2189" className="reviews__body__contents__info__rating__icon" />)
            } else {
                container.push(<BsStar key={i} size={size} color="#df2189" className="reviews__body__contents__info__rating__icon" />)

            }
        }
        return container;
    }
    const [mainImage, setMainImage] = useState(0);
    const getIndexImage = (index) => {
        if (index > 0) {
            if (mainImage < product.images.length - 1) {
                setMainImage(mainImage + index);
            }
        }
        if (index < 0) {
            if (mainImage > 0) {
                setMainImage(mainImage + index);
            }
        }
    }
    const addToCartHandler = (id, qty) => {
        console.log(size)
        console.log(product.size[0].size)
        if (!size) {
            console.log('Khong co ne')
            if (qty > 0) {
                setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Đã thêm sản phẩm vào giỏ hàng', type: 'success' })
                dispatch(addToCart(id, qty, product.size[0].size), 'yes');
            } else {
                setOpenMess({ ...openMess, open: true, title: 'Thất bại', content: 'Số lượng cần lớn hơn 0', type: 'error' })
            }
        }
        else {
            console.log('Co ne')
            if (qty > 0) {
                setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Đã thêm sản phẩm vào giỏ hàng', type: 'success' })
                dispatch(addToCart(id, qty, parseFloat(size), 'yes'));
            } else {
                setOpenMess({ ...openMess, open: true, title: 'Thất bại', content: 'Số lượng cần lớn hơn 0', type: 'error' })
            }
        }
    }
    useEffect(() => {
        dispatch(detailsProduct(productId));

        window.scrollTo(0, 0);
    }, [dispatch, productId]);
    return (
        <>
            {product && <Helmet>
                <title>{product.name}</title>
                <meta name="description" content={product.name} />
                <meta name='keywords' content={`giày, bitis, bitis hunter, sandals, ${product.name}`} />
            </Helmet>}
            <Header />
            <div className="product__details">
                {loading ? (
                    <LoadingBox />
                ) : (<>
                    <MessageBox messData={openMess} />
                    <div className="container">
                        <div className="row ">
                            <div className="col-6 m-6 s-12 xs-12">
                                {product.images && (<>
                                    <SlideImage image={product.images[mainImage].image} getIndex={getIndexImage} />
                                    <div className="product__details__slide">
                                        {product.images.map((image, index) => (
                                            <div className="product__details__slide__img" onClick={() => setMainImage(index)} key={index}>
                                                <LazyLoadImage
                                                    src={image.image}
                                                    alt={image.image}
                                                />
                                            </div>
                                        ))}
                                    </div></>)}
                            </div>
                            <div className="col-6 m-6 s-12 xs-12  ">
                                <div className="product__details__contents">
                                    <div className="product__details__contents__name">
                                        <h1>{product.name}</h1>
                                    </div>
                                    <div className="product__details__contents__rating__rating">
                                        {rating1(product.rating, 20)}
                                    </div>
                                    <h2 className="product__details__contents__price"> {(product.price).toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}</h2>
                                    <div className="product__details__contents__status">
                                        {product.countInStock > 0 ? (
                                            <div className="product__details__contents__status--true">Còn hàng</div>
                                        ) : (
                                            <div className="product__details__contents__status--false">Hết hàng</div>
                                        )}
                                    </div>
                                    <div className="product__details__contents__size__text"><span>SIZE</span>{product.size ? (size ? size : product.size[0].size) : ''}</div>
                                    <div className="product__details__contents__size">
                                        <div className="wrapperRadio" >
                                            {product.size && product.size.map((size, index) => (
                                                (index === 0 ? (<input type="radio" name="select" key={index} id={`option-${index + 1}`} defaultChecked value={size.size} onClick={(e) => setSize(e.target.value)} />) : (<input type="radio" name="select" id={`option-${index + 1}`} value={size.size} onClick={(e) => setSize(e.target.value)} />))
                                            ))}
                                            {product.size && product.size.map((size, index) => (

                                                <label htmlFor={`option-${index + 1}`} className={`option option-${index + 1}`} >

                                                    <span>{size.size}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {product.countInStock > 0 ? (
                                        <>
                                            <span className='ctrl'>
                                                <div className='ctrl__button ctrl__button--decrement' onClick={() => ctrl(-1)}>&ndash;</div>
                                                <div className='ctrl__counter'>
                                                    <input className='ctrl__counter-input' type='text' id='qty-input' defaultValue={1} onChange={(e) => setQty(e.target.value)} /> </div>
                                                <div className='ctrl__button ctrl__button--increment ' onClick={() => ctrl(1)}>+</div>
                                                <button className="btn-dark ml-2" onClick={() => addToCartHandler(product._id, qty)}>Thêm vào giỏ hàng</button>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn-dark mb-2" disabled>Thêm vào giỏ hàng</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container"> <div className="row"><div className="product__reviews">
                        <div className="heading">
                            Mô tả sản phẩm
                        </div>
                        <ul className="product__details__contents__description__msg">
                            {product.descriptions.map((x, index) => (<li key={index} className="animation"> {x.text} </li>))}
                        </ul></div>
                        <div className="product__reviews animation"><h2 className="heading">Nhận xét & đánh giá</h2>
                            {product.reviews.length === 0 && (
                                <div className="product__reviews__review__comment">Chưa có nhận xét đánh giá nào</div>
                            )}
                            {product.reviews.map((review) => (
                                <div className="product__reviews__review animation">
                                    <div className="product__reviews__review__name">
                                        {review.name}
                                        <span className="product__reviews__review__date">
                                            {review.createdAt.substring(0, 10)}
                                        </span>
                                    </div>
                                    <div className="product__reviews__review__rating">
                                        {rating1(review.rating, 17)}
                                    </div>
                                    <div className="product__reviews__review__comment">
                                        {review.comment}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </>
                )}
            </div>
            <Footer />
        </>
    );
}