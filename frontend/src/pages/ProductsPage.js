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
import Menu from "../components/Menu/Menu";
import { LazyLoadImage } from "react-lazy-load-image-component";
const ProductsPage = () => {
    const [imageBitisMan] = useState({
        image: 'assets/images/bitisman.png',
    })
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const { name } = useParams();
    const addToCartHandler = (productId) => {

        dispatch(addToCart(productId, 1));

    }
    const [checkPrice, setCheckPrice] = useState({ min: 0, max: 1000000 })
    const [orderBy, setOrderBy] = useState('');
    const getPrice = (price) => {
        setCheckPrice({ ...checkPrice, min: price.min, max: price.max })
    }
    const [category, setCategory] = useState('all');
    const getCategory = (category) => {
        setCategory(category);
    }
    useEffect(() => {

        console.log(orderBy)
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',

                order: orderBy,
                min: checkPrice.min,
                max: checkPrice.max,

            })
        );
    }, [category, dispatch, name, checkPrice.min, checkPrice.max, orderBy]);


    return (
        <>

            <Header />
            <div className='cities'>
                <div className='container'>
                    <div className='cities__container'>
                        <div className="row mr-minus-15 ml-minus-15">
                            <div className="cities__banner">
                                <LazyLoadImage src={imageBitisMan.image} alt='banner man' />
                            </div>
                            <div className="col-2 p-15">
                                <Menu getCategoryChild={getCategory} getPriceChild={getPrice} />
                            </div>

                            <div className="col-10 p-15">
                                <div className="heading fw-900 fz-3 ">NAM</div>

                                <div className="cities__heading">
                                    {loading ? '' : (<div className="cities__heading__result">Có {products.length} sản phẩm</div>)}

                                    <div className="cities__heading__select">
                                        <select onChange={(e) => setOrderBy(e.target.value)}>
                                            <option value="lowest">Rẻ nhất</option>
                                            <option value="highest">Mắc nhất</option>
                                        </select>
                                    </div>
                                </div>
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
export default ProductsPage