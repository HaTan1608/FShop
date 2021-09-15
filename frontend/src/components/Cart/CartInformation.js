import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
const CartInformation = (props) => {
    const cartFinal = useSelector((state) => state.orderDetails);
    const cart = useSelector((state) => state.cart);
    let { cartItems } = cart;


    if (cartItems) {
        if (cartItems.length < 1) {

        }
    } else {

        cartItems = cartFinal.orderDetails.orderItems;
    }

    return (
        <div className="information__cart">
            {cartItems.length > 0 ? cartItems.map((item) => (
                <>
                    <div className="information__cart__item" key={item.product}>
                        <div className="information__cart__item__image">
                            <LazyLoadImage src={item.image} alt={item.image} />
                        </div>
                        <div className="information__cart__item__qty">
                            {item.qty}
                        </div>
                        <div className="information__cart__item__name">
                            {item.name}
                        </div>
                        <div className="information__cart__item__total">
                            {(item.price * item.qty).toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </div>
                    </div>

                </>
            )) : ('')}
            <div className="information__cart__fee">
                <div className="information__cart__fee__total">
                    <div className="information__cart__fee__total__text">
                        Tổng tiền
                    </div>
                    <div className="information__cart__fee__total__price">
                        {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })} <span className="information__cart__item__total__dollor"> VNĐ</span>
                    </div>
                </div>
                <div className="information__cart__fee__ship">
                    <div className="information__cart__fee__ship__text">
                        Phí ship
                    </div>
                    <div className="information__cart__fee__ship__price">
                        Miễn phí
                    </div>
                </div>

            </div>
            <div className="information__cart__total">
                <div className="information__cart__total__text">
                    Tổng
                </div>
                <div className="information__cart__total__price">
                    {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </div>
            </div>
        </div>
    )
}
export default CartInformation;