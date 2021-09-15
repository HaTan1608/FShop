import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { Helmet } from "react-helmet-async";
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
            <Helmet>
                <title>Danh sách đơn hàng</title>
            </Helmet>
            <Header />
            {loading ? (
                ""
            ) : error ? (
                ''
            ) : (<div className="orderhistory">
                <div className="container">
                    <div className="row orderhistory__heading">
                        <div className="col-3 m-4 s-6"><h1>Mã đơn hàng</h1></div>
                        <div className="col-2 m-3 s-0 orderhistory__heading__text"><h1>Ngày đặt</h1></div>
                        <div className="col-2 m-3 s-0 orderhistory__heading__text"><h1>Tổng tiền</h1></div>
                        <div className="col-2 m-0 s-0 orderhistory__heading__text"><h1>Thanh toán</h1></div>
                        <div className="col-2 m-0 s-0 orderhistory__heading__text"><h1>Vận chuyển</h1></div>
                        <div className="col-1 m-2 s-6"></div>
                    </div>
                    {orders.map((order) => (
                        <div className="row orderhistory__body" key={order._id}>
                            <div className="col-3 m-4 s-6">{order._id}</div>
                            <div className="col-2 m-3 s-0 orderhistory__body__text">{order.createdAt.substring(0, 10)}</div>
                            <div className="col-2 m-3 s-0 orderhistory__body__text">{(order.totalPrice).toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}</div>
                            <div className="col-2 m-0 s-0 orderhistory__body__text">{order.isPaid ? 'Đã thanh toán' : 'Chưa'}</div>
                            <div className="col-2 m-0 s-0 orderhistory__body__text">{order.isDelivered
                                ? 'Đã giao hàng'
                                : 'Chưa'}</div>
                            <div className="col-1 m-2 s-6 orderhistory__body__text__link">
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