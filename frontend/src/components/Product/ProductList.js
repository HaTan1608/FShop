import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { listProducts } from '../../actions/productActions';
import Toggle from '../Menu/Toggle';
import LoadingBox from '../Message/LoadingBox';
import ProductContents from './ProductContents';
import ProductImage from './ProductImage';
const ProductList = ({ getToggleChild, category, gender, price }) => {
    const dispatch = useDispatch();
    const [orderBy, setOrderBy] = useState('');
    const productList = useSelector((state) => state.productList);
    const { loading, products, pages, count } = productList;
    const [toggle, setToggle] = useState(false);
    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId, 1));
    }
    const sendToggle = () => {
        getToggleChild();
        setToggle(!toggle);
    }
    const [page, setPage] = useState(0);
    useEffect(() => {
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

                    <div className="cities__heading__select">
                        <select onChange={(e) => setOrderBy(e.target.value)}>
                            <option value="all">Sắp xếp</option>
                            <option value="lowest" >Rẻ nhất</option>
                            <option value="highest">Mắc nhất</option>
                        </select>
                    </div>
                </div>
                <div className="row">

                    {products.products ? (products.products.length > 0 ? products.products.map((product) => (
                        <div className="col-4 p-15" key={product._id}>
                            <div className="cities__body">
                                <div className="cities__body__image1">
                                    <Link to={`/product/${product._id}`}>
                                        <ProductImage img={product.images[0].image} />
                                    </Link></div>

                                <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id)} />
                            </div>
                        </div>
                    )) : '') : ''}
                </div>
                <div className="product__pagination">
                    {[...Array(products.pages).keys()].map((x, index) => (
                        <div className={x === page ? "product__pagination__number--active" : "product__pagination__number"} onClick={() => setPage(x)} key={index}>{x + 1}
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