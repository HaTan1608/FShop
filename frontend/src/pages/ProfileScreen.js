import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { USER_UPDATE_PROFILE_RESET } from '../types/userTypes';

export default function ProfileScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading: loadingOrders, orders } = orderMineList;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const count = (array, cont) => {
        let a = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].isDelivered === cont) {

                a++;
            }
        }
        return a;
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
            dispatch(listOrderMine());

        }

    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };
    return (
        <>
            <Header />
            <div className="profile">
                <div className="container">


                    {loading ? (
                        ''
                    ) : error ? (
                        ''
                    ) : (
                        <>
                            {loadingUpdate && ''}
                            {errorUpdate && (
                                ''
                            )}
                            {successUpdate && (
                                ''
                            )}
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-5">
                                    <div className="profile__heading">
                                        <h1>Thông tin tài khoản</h1>
                                    </div>
                                    <div className="profile__form">
                                        <form onSubmit={submitHandler}>

                                            <input type="text" className="information__heading__form__input" value={name} onChange={(e) => setName(e.target.value)} required />
                                            <div className="information__heading__form__text">Họ và tên</div>

                                            <input type="text" className="information__heading__form__input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            <div className="information__heading__form__text">Email</div>
                                            <input type="text" className="information__heading__form__input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <div className="information__heading__form__text">Mật khẩu</div>
                                            <input type="text" className="information__heading__form__input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                            <div className="information__heading__form__text">Xác nhận mật khẩu</div>
                                            <button className="btn-dark w-40" type="submit">CẬP NHẬT</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-4 ml-2">
                                    <div className="profile__heading">
                                        <h1>Đơn hàng của tôi</h1>
                                        <span className="profile__heading__link"> <Link to='/orderhistory'>Chi tiết</Link></span>
                                    </div>
                                    {loadingOrders ? ('') : (
                                        <>
                                            <div className="profile__body">
                                                <div className="profile__body__text">Đã đặt</div>
                                                <div className="profile__body__data">{orders.length}</div>
                                            </div>
                                            <div className="profile__body">
                                                <div className="profile__body__text">Đã giao</div>
                                                <div className="profile__body__data">{count(orders, true)}</div>
                                            </div>
                                            <div className="profile__body">
                                                <div className="profile__body__text">Chưa giao</div>
                                                <div className="profile__body__data">{count(orders, false)}</div>
                                            </div>

                                        </>
                                    )}
                                </div>
                                <div className="col-1"></div>
                            </div>

                        </>
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
}