import React, {  useState } from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
const Header = () =>{
    const [state] = useState({
        logo:'/assets/images/logo.png',
    })
    
    return (
    <div className="header">
        <div className="header__logo">
                <LazyLoadImage src={state.logo} alt="logo image"/>
        </div>
        <div className="header__right">
          <a href="/cart">Giỏ hàng</a>
          <a href="/login">Đăng nhập</a>
        </div>
    </div>
    )
}
export default Header;