import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../Message/LoadingBox';
import ProductContents from './ProductContents';
import ProductImage from './ProductImage';
const ProductList = ({ getToggleChild,getNewPage, category, gender, price ,newPage}) => {
    const dispatch = useDispatch();
    const [orderBy, setOrderBy] = useState('');
    const productList = useSelector((state) => state.productList);
    const { loading, products, pages, count } = productList;
    const [toggle, setToggle] = useState(false);
    const addToCartHandler = (productId, index) => {
        console.log(products.products[index].size[0])
        dispatch(addToCart(productId, 1, products.products[index].size[0].size), 'yes');
    }
    const sendToggle = () => {
        getToggleChild();
        setToggle(!toggle);
    }
    const [page, setPage] = useState(1);
    const sendNewPage = () => {
        getNewPage();
        
    }
    useEffect(() => {
        if(newPage){
        setPage(1);
    }
        dispatch(
            listProducts({
                category: category !== 'all' ? category : '',
                gender: gender,
                order: orderBy,
                min: price.min,
                max: price.max,
                page: page
            })
        );
            sendNewPage();
        window.scrollTo(0, 0);
    }, [category, dispatch, price, orderBy, gender, page]);
    return (<>
        <div className="products__heading__toggle">
            {gender === 'male' ?
                <div className="heading fw-900 fz-3 " onClick={() => console.log(products.products)}>NAM</div> :
                <div className="heading fw-900 fz-3 ">NỮ</div>}
            <div className={toggle ? 'products__toggle-close' : 'products__toggle-open'} onClick={() => sendToggle()}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        {loading ? <LoadingBox /> : (
            <>
                <div className="cities__heading">
                    {products.products ? (products.products.length > 0 ? (<div className="cities__heading__result">Có {products.count} sản phẩm</div>) : '') : ''}

                    <div className="cities__heading__select" id="select">
                        <select onChange={(e) => setOrderBy(e.target.value) + setPage(1)}>
                            <option value="all">Sắp xếp</option>
                            <option value="lowest" >Rẻ nhất</option>
                            <option value="highest">Mắc nhất</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {products.products ? (products.products.length > 0 ? products.products.map((product, index) => (
                        <div className="col-4 m-4 s-6 xs-12 p-15" key={product._id}>
                            <div className={index < 3 ? `cities__body` : `cities__body animation`}>
                                <div className="cities__body__image1">
                                    <Link to={`/product/${product._id}`}>
                                        <ProductImage img={product.images[0].image} />
                                    </Link></div>

                                <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id, index)} />
                            </div>
                        </div>
                    )) : '') : ''}
                </div>
                <div className="product__pagination">
                    {[...Array(products.pages).keys()].map((x, index) => (
                        <div className={x === page - 1 ? "product__pagination__number--active" : "product__pagination__number"} onClick={() => setPage(parseInt(x) + 1)} key={index + 1}>{x + 1}
                        </div>
                    ))}
                </div>
            </>
        )
        }
    </>
    )
}
export default ProductList