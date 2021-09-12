import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../Message/LoadingBox';
import ProductContents from './ProductContents';
import ProductImage from './ProductImage';
const ProductList = ({ category, gender, price }) => {
    const dispatch = useDispatch();
    const [orderBy, setOrderBy] = useState('');
    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;
    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId, 1));
    }

    useEffect(() => {
        dispatch(
            listProducts({
                category: category !== 'all' ? category : '',
                gender: gender,
                order: orderBy,
                min: price.min,
                max: price.max,
            })
        );
    }, [category, dispatch, price, orderBy, gender]);
    return (<>
        {gender === 'male' ?
            <div className="heading fw-900 fz-3 ">NAM</div> :
            <div className="heading fw-900 fz-3 ">NỮ</div>}


        {loading ? <LoadingBox /> : (
            <>
                <div className="cities__heading">
                    {loading ? '' : (<div className="cities__heading__result">Có {products.length} sản phẩm</div>)}

                    <div className="cities__heading__select">
                        <select onChange={(e) => setOrderBy(e.target.value)}>
                            <option value="all">Sắp xếp</option>
                            <option value="lowest" >Rẻ nhất</option>
                            <option value="highest">Mắc nhất</option>
                        </select>
                    </div>
                </div>
                <div className="row">

                    {products.length > 0 ? products.map((product) => (
                        <div className="col-4 p-15" key={product._id}>
                            <div className="cities__body">
                                <div className="cities__body__image1">
                                    <Link to={`/product/${product._id}`}>
                                        <ProductImage img={product.images[0].image} />
                                    </Link></div>

                                <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id)} />
                            </div>
                        </div>
                    )) : ''}
                </div>
            </>
        )
        }
    </>
    )
}
export default ProductList