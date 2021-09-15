import React, { useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
const FooterIntro = () => {
    const [state] = useState({
        logo: '/assets/footer/logo.png',
        intro: 'Fshop chuyên phân phối sản phẩm chính hãng của Bitis, mang đến chất lượng dịch vụ tốt nhất cho bạn',
    })
    return (
        <div className="footer__intro">
            <div className="footer__logo">
                <Link to='/'> <div>Fshop</div></Link>
            </div>
            <p className="footer__intro__msg">{state.intro}</p>
        </div>
    )
}
export default FooterIntro