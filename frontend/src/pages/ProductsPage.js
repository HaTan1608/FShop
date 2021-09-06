import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import ProductImage from "../components/Product/ProductImage";
import ProductContents from "../components/Product/ProductContents";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
const ProductsPage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

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
                                                    <ProductImage img={product.image} />
                                                    <ProductContents name={product.name} price={product.price} />


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