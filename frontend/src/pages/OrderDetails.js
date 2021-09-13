import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import InformationScreen from './InformationScreen';
import CartInformation from '../components/Cart/CartInformation';
const OrderDetails = (props) => {

    const orderDetailss = useSelector((state) => state.orderDetails.orderDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id))
    }, [])
    return (
        <div className="information ">
            {orderDetailss ? (<div className="container">
                <div className="row">
                    <div className="col-1 m-0"></div>
                    <div className="col-5 m-6 pr-3">
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

                            <div className="information__heading__text mt-2">Trạng thái vận chuyển</div>
                            {orderDetailss.isDelivered !== true ? (

                                <div className="information__heading__user__name">Chưa vận chuyển</div>
                            ) : (
                                <div className="information__heading__user__name">Đã giao</div>
                            )}

                        </div>
                        <div className="information__heading__homepage"><Link to="/" >Tiếp tục mua sắm</Link></div>
                    </div>
                    <div className="col-5 m-6 pl-3">
                        <CartInformation />
                    </div>
                    <div className="col-1 m-0"></div>
                </div>

            </div>) : ('')}

        </div >
    )
}
export default OrderDetails