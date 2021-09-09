import React, { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../types/orderTypes';
const OrderDetails = (props) => {

    const orderDetailss = useSelector((state) => state.orderDetails.orderDetails);
    const dispatch = useDispatch();
    const formate = (price) => {
        return `${price}.000`;
    }


    useEffect(() => {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch(detailsOrder(props.match.params.id))
    }, [])
    return (
        <div className="information ">
            {orderDetailss ? (<div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-5">
                        <h1>FShop</h1>
                        <div className="information__heading">
                            <div className="information__heading__text">Thông tin giao hàng</div>
                        </div>
                        <div className="information__heading__user">
                            <div className="information__heading__user__name"><span>Tên người nhận:</span>{orderDetailss.shippingAddress.fullName}</div>
                            <div className="information__heading__user__name"><span>Số điện thoại</span>{orderDetailss.shippingAddress.phone}</div>
                            <div className="information__heading__user__name"><span>Địa chỉ</span>{orderDetailss.shippingAddress.address + ' ' + orderDetailss.shippingAddress.city}</div>
                            <div className="information__heading__text mt-2">Hình thức thanh toán</div>

                            {orderDetailss.paymentMethod !== 'COD' ? (

                                <div className="information__heading__user__name"><span>{orderDetailss.paymentMethod}</span>Đã thanh toán</div>
                            ) : (
                                <div className="information__heading__user__name">Thanh toán trực tiếp ( COD )</div>
                            )}

                        </div>
                    </div>
                    <div className="col-5">
                        <div className="information__cart">
                            {orderDetailss.orderItems.length > 0 ? orderDetailss.orderItems.map((item) => (
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
                                        {formate(item.price * item.qty)}<span className="information__cart__item__total__dollor"> VNĐ</span>
                                    </div>
                                </div>
                            )) : ('')}
                            <div className="information__cart__fee">
                                <div className="information__cart__fee__total">
                                    <div className="information__cart__fee__total__text">
                                        Tổng tiền
                                    </div>
                                    <div className="information__cart__fee__total__price">
                                        {formate(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
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
                                    {formate(orderDetailss.orderItems.reduce((a, c) => a + c.price * c.qty, 0))} <span className="information__cart__item__total__dollor"> VNĐ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>) : ('')}

        </div >
    )
}
export default OrderDetails