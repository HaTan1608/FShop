import Header from "../components/Header"
import React, { useEffect, useState } from "react"
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router";
import Menu from "../components/Menu/Menu";
import ProductList from "../components/Product/ProductList";
import ProductBanner from "../components/Product/ProductBanner";
import { Helmet } from "react-helmet-async";
const ProductsPage = () => {
    let { gender } = useParams();
    const [checkPrice, setCheckPrice] = useState({ min: 0, max: 1000000 })
    
    const [newPage,setNewPage]= useState(false);
    const getPrice = (price) => {
        setCheckPrice({ ...checkPrice, min: price.min, max: price.max })
        setNewPage(true);
    }
    const [category, setCategory] = useState('all');
    const getCategory = (category) => {
        setCategory(category);
        setNewPage(true);
    }
    const [toggle, setToggle] = useState(false);
    const getToggle = () => {
        setToggle(!toggle);
    }
    const getPageChild = ()=>{
        setNewPage(false);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Helmet>
                <title>Giày {gender === 'male' ? 'Nam' : "Nữ"}</title>
                <meta name="description" content={`Giày ${gender}`} />
                <meta name='keywords' content={`giày, bitis, bitis hunter, sandals,`} />
            </Helmet>
            <Header />
            <div className='cities'>
                <div className='container'>
                    <div className="row mr-minus-15 ml-minus-15">
                        <ProductBanner />
                        <div className={toggle ? "menu__small" : "col-2 p-15 m-0"}>
                            <Menu getCategoryChild={getCategory} getPriceChild={getPrice} />
                        </div>
                        <div className="col-10 p-15 m-12">
                            <ProductList getToggleChild={getToggle} getNewPage={getPageChild} gender={gender} price={checkPrice} category={category} newPage={newPage} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ProductsPage