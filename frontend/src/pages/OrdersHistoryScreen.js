import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';

export default function OrdersHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const formate = (price) => {
        return `${price}.000`;
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (!orders) {
            dispatch(listOrderMine());
        }
    }, [dispatch, orders]);
    return (
        <>

            <Header />
            {loading ? (
                ""
            ) : error ? (
                ''
            ) : (<div className="orderhistory">
                <div className="container">
                    <div className="row orderhistory__heading">
                        <div className="col-3"><h1>Mã đơn hàng</h1></div>
                        <div className="col-2 orderhistory__heading__text"><h1>Ngày đặt</h1></div>
                        <div className="col-2 orderhistory__heading__text"><h1>Tổng tiền</h1></div>
                        <div className="col-2 orderhistory__heading__text"><h1>Thanh toán</h1></div>
                        <div className="col-2 orderhistory__heading__text"><h1>Vận chuyển</h1></div>
                        <div className="col-1"></div>
                    </div>
                    {orders.map((order) => (
                        <div className="row orderhistory__body" key={order._id}>
                            <div className="col-3">{order._id}</div>
                            <div className="col-2 orderhistory__body__text">{order.createdAt.substring(0, 10)}</div>
                            <div className="col-2 orderhistory__body__text">{formate(order.totalPrice)}<span className="orderhistory__body__text__dollor">&nbsp;VNĐ</span></div>
                            <div className="col-2 orderhistory__body__text">{order.isPaid ? 'Đã thanh toán' : 'Chưa'}</div>
                            <div className="col-2 orderhistory__body__text">{order.isDelivered
                                ? 'Đã giao hàng'
                                : 'Chưa'}</div>
                            <div className="col-1 orderhistory__body__text__link">
                                <Link to={`order/${order._id}`}>Chi tiết</Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}



            <Footer />
        </>
    );
}