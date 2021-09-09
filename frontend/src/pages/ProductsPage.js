import Header from "../components/Header"
import React, { useEffect } from "react"
import ProductImage from "../components/Product/ProductImage";
import ProductContents from "../components/Product/ProductContents";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
const ProductsPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const addToCartHandler = (productId) => {
        if (cartItems.length !== 0) {
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].product === productId) {
                    dispatch(addToCart(productId, cartItems[i].qty + 1))
                    break;
                }
            }
        }
        else {
            dispatch(addToCart(productId, 1));
        }
    }
    useEffect(() => {
        dispatch(listProducts());
    }, [])
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
export default ProductsPage