import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions';
import CartInformation from '../components/Cart/CartInformation';
const InformationScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [cities, setCities] = useState([])
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, cartItems } = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [phone, setPhone] = useState(shippingAddress.phone);
    const [city, setCity] = useState(shippingAddress.city);
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false)
    const abc = (e) => {
        let index = e.target.selectedIndex;
        let nameCity = e.target[index].text;
        setCity(nameCity);

    };
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingAddress({ fullName, address, city, phone })
        );
        props.history.push('/payment');
    };
    useEffect(() => {
        if (cartItems.length === 0) {
            props.history.push('/cart');
        }
        fetch("https://dc.tintoc.net/app/api-customer/public/provinces")
            .then(res => res.json())
            .then(
                (result) => {
                    setCities(result);

                    document.getElementById("select").selectedIndex = "8";
                    setCity(result[8].name);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [cartItems])

    return (
        <div className="information ">
            <div className="container">
                <div className="row">

                    <div className="col-1 m-0"></div>
                    <div className="col-5 m-6">
                        <div className="links__back xs-0 s-0"><Link to='/cart'>Quay về</Link></div>
                        <h1>FShop</h1>
                        {userInfo ? (
                            <>
                                <div className="information__heading">
                                    <div className="information__heading__text">Thông tin liên hệ</div>
                                </div>
                                <div className="information__heading__user">
                                    <div className="information__heading__user__name"><span>Họ và tên:</span>{userInfo.name}</div>
                                    <div className="information__heading__user__name"><span>Email:</span>{userInfo.email}</div>
                                </div>
                            </>
                        ) : (
                            <div className="information__heading">
                                <div className="information__heading__text">Thông tin liên hệ</div>
                            </div>
                        )}

                        <div className="information__heading">
                            <div className="information__heading__text">Địa chỉ giao hàng</div>
                        </div>
                        <div className="information__heading__form">
                            <form onSubmit={submitHandler}>

                                <input type="text" className="information__heading__form__input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                <div className="information__heading__form__text">Họ tên người nhận</div>

                                <input type="text" className="information__heading__form__input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                <div className="information__heading__form__text">Địa chỉ</div>
                                <select onChange={abc} className="information__heading__form__input" id="select">
                                    {cities.length > 0
                                        ? cities.map((city) => (
                                            <option id={city.id} key={city.id} >
                                                {city.name}
                                            </option>
                                        ))
                                        : null}
                                </select>
                                <div className="information__heading__form__text">Thành phố</div>
                                <input type="text" className="information__heading__form__input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <div className="information__heading__form__text">Số điện thoại</div>
                                <button className="btn-dark w-40" type="submit">HÌNH THỨC THANH TOÁN</button>
                            </form>
                        </div>
                    </div>

                    <div className="col-5 m-6 s-0">
                        <CartInformation />
                    </div>
                    <div className="information__heading__show">
                        <div className={toggle ? 'information__toggle-close' : 'information__toggle-open'} onClick={() => setToggle(!toggle)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div><span className="information__heading__show__text">Thông tin giỏ hàng</span>
                    </div>
                    <div className="col-5 m-6 s-12">
                        <div className={toggle ? 'information__cart-open' : 'information__cart-close'}><CartInformation /></div>
                    </div>
                    <div className="col-1 m-0 s-0"></div>
                </div>

            </div>
        </div >
    )
}
export default InformationScreen