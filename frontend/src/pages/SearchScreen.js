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
import Menu from "../components/Menu/Menu";
const SearchScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products, pages, count } = productList;
    const [checkPrice, setCheckPrice] = useState({ min: 0, max: 1000000 })
    const getPrice = (price) => {
        setCheckPrice({ ...checkPrice, min: price.min, max: price.max })
    }
    const [category, setCategory] = useState('all');
    const getCategory = (category) => {
        setCategory(category);
    }
    const [toggle, setToggle] = useState(false);
    const [orderBy, setOrderBy] = useState('');
    const {
        name = 'all',
    } = useParams();
    const addToCartHandler = (productId, index) => {
        dispatch(addToCart(productId, 1, products.products[index].size[0].size, 'yes'));
    }
    const [page, setPage] = useState(0)
    useEffect(() => {
        dispatch(
            listProducts({
                name,
                category: category !== 'all' ? category : '',
                order: orderBy,
                min: checkPrice.min,
                max: checkPrice.max,
                page: page
            })
        );
        window.scrollTo(0, 0);
    }, [name, category, dispatch, checkPrice, orderBy, page]);
    return (
        <>
            <Header />
            <div className='cities'>
                <div className='container'>
                    <div className="row mr-minus-15 ml-minus-15">
                    {loading ? <LoadingBox /> : (<>

                        {products.products ? (products.products.length > 0) ? (
                            <><div className={toggle ? "menu__small" : "col-2 p-15 m-0"}>
                            <Menu getCategoryChild={getCategory} getPriceChild={getPrice} />
                        </div>
                        <div className="col-10 p-15 m-12 ">
                     
                           
                                   <div className="products__heading__toggle  pb-2 mb-2 m-12 ">
                                <div className={toggle ? 'products__toggle-close ' : 'products__toggle-open'} onClick={() => setToggle(!toggle)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                                    <div className="cities__heading">
                                       <div className="cities__heading__result">C?? {products.count} s???n ph???m</div> <div className="cities__heading__select">
                                            <select onChange={(e) => setOrderBy(e.target.value)}>
                                                <option value="all">S???p x???p</option>
                                                <option value="lowest" >R??? nh???t</option>
                                                <option value="highest">M???c nh???t</option>
                                            </select>
                                        </div>

                                       
                                    </div>
                                    <div className="row">
                                        {products.products.map((product, index) => (
                                            <div className="col-4 m-4 s-6 xs-12 p-15" key={index}>
                                                <div className="cities__body">
                                                    <div className="cities__body__image1">
                                                        <Link to={`/product/${product._id}`}>
                                                            <ProductImage img={product.images[0].image} />
                                                        </Link></div>

                                                    <ProductContents ratingStar={product.rating} name={product.name} price={product.price} addCart={() => addToCartHandler(product._id, index)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="product__pagination">
                                        {[...Array(products.pages).keys()].map((x) => (
                                            <div className={x === page ? "product__pagination__number--active" : "product__pagination__number"} onClick={() => setPage(x)}>{x + 1}
                                            </div>
                                        ))}
                                    </div>
                               
                        </div></>
                        ):(<div className="cities__notfound"><p>Xin l???i kh??ng t??m th???y s???n ph???m b???n c???n t??m :(.</p></div>):('')}
                        
                    </>)}
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default SearchScreen