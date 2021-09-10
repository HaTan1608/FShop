import React, { useEffect } from "react";
const Menu = ({ getCategoryChild, getPriceChild }) => {
    const sendData = () => {
        if (document.getElementById('bitis').checked === true && document.getElementById('sandals').checked === true) {
            getCategoryChild('all')
        } else if (document.getElementById('bitis').checked === true && document.getElementById('sandals').checked === false) {
            getCategoryChild('Bitis')
        } else if (document.getElementById('bitis').checked === false && document.getElementById('sandals').checked === true) {
            getCategoryChild('Sandals')
        } else {
            getCategoryChild('all')
        }
    }
    const sendPrice = () => {
        getPriceChild({ min: document.getElementById('min').value, max: document.getElementById('max').value })
    }
    return (
        <div className="menu">
            <div className="menu__categories">
                <h3>Categories</h3>
                <div className="menu__categories__child">
                    <input type="checkbox" className="menu__categories__child__input" id='bitis' onChange={sendData} />
                    <label >Bitis Hunter</label>
                </div>
                <div className="menu__categories__child">
                    <input type="checkbox" className="menu__categories__child__input" id='sandals' onChange={sendData} />
                    <label >Sandals </label>
                </div>


            </div>
            <div className="menu__price">
                <h3>Khoảng giá</h3>
                <div className="menu__price__child">
                    <input type="number" className="menu__price__child__input" id="min" />
                    <label>&nbsp;&nbsp;-&nbsp;&nbsp;</label>
                    <input type="number" className="menu__price__child__input" id="max" />

                </div>
                <button className="menu__button" onClick={sendPrice}>ÁP DỤNG</button>


            </div>
        </div>
    )
}
export default Menu;