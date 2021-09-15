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
import LoadingBox from "../components/Message/LoadingBox";
const SearchScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, pages, count } = productList;

    const [orderBy, setOrderBy] = useState('');
    const {
        name = 'all',

    } = useParams();
    const addToCartHandler = (productId) => {

        dispatch(addToCart(productId, 1));

    }
    const [page, setPage] = useState(0)
    useEffect(() => {
        dispatch(listProducts({
            name, page
        }));
    }, [dispatch, name, page]);
    const [toggle, setToggle] = useState(false);


    return (
        <>
            <Header />
            <div className='cities'>
                <div className='container'>

                    <div className="row mr-minus-15 ml-minus-15">
                        <div className="col-12 p-15 m-12 ">
                            <div className="products__heading__toggle  pb-2 mb-2">

                                <div className={toggle ? 'products__toggle-close ' : 'products__toggle-open'} onClick={() => setToggle(!toggle)}>
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
                                        {[...Array(products.pages).keys()].map((x) => (
                                            <div className={x === page ? "product__pagination__number--active" : "product__pagination__number"} onClick={() => setPage(x)}>{x + 1}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default SearchScreen