import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router";
import Menu from "../components/Menu/Menu";
import ProductList from "../components/Product/ProductList";
import ProductBanner from "../components/Product/ProductBanner";
const ProductsPage = () => {

    let { gender } = useParams();


    const [checkPrice, setCheckPrice] = useState({ min: 0, max: 1000000 })
    const getPrice = (price) => {
        setCheckPrice({ ...checkPrice, min: price.min, max: price.max })
    }
    const [category, setCategory] = useState('all');
    const getCategory = (category) => {
        setCategory(category);
    }
    const [toggle, setToggle] = useState(false);
    const getToggle = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Header />
            <div className='cities'>
                <div className='container'>

                    <div className="row mr-minus-15 ml-minus-15">

                        <ProductBanner />
                        <div className={toggle ? "menu__small" : "col-2 p-15 m-0"}>
                            <Menu getCategoryChild={getCategory} getPriceChild={getPrice} />
                        </div>

                        <div className="col-10 p-15 m-12">
                            <ProductList getToggleChild={getToggle} gender={gender} price={checkPrice} category={category} />
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductsPage