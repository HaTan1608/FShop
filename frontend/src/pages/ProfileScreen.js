import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import LoadingBox from '../components/Message/LoadingBox';
import MessageBox from '../components/Message/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../types/userTypes';
import { Helmet } from "react-helmet-async";
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
    const [openMess, setOpenMess] = useState({ open: false, tittle: '', content: '', type: '', duration: 0 });
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setOpenMess({ ...openMess, open: true, title: 'Th???t b???i', content: 'M???t kh???u x??c nh???n kh??ng ????ng', type: 'error' })
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
            setOpenMess({ ...openMess, open: true, title: 'Th??nh c??ng', content: 'C???p nh???t th??ng tin th??nh c??ng', type: 'success' })
        }
    };
    return (
        <>
            <Helmet>
                <title>Th??ng tin t??i kho???n</title>

            </Helmet>
            <Header />
            <div className="profile">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    ''
                ) : (
                    <>
                        {loadingUpdate && ""}
                        {errorUpdate && (
                            <MessageBox messData={openMess} />
                        )}
                        {successUpdate && (
                            <MessageBox messData={openMess} />
                        )}
                        <div className="container">
                            <div className="row">
                                <div className="col-1 m-0 s-0 xs-0"></div>
                                <div className="col-5 m-6 s-12 xs-12">
                                    <div className="profile__heading">
                                        <h1>Th??ng tin t??i kho???n</h1>
                                    </div>
                                    <div className="profile__form">
                                        <form onSubmit={submitHandler}>

                                            <input type="text" className="information__heading__form__input" value={name} onChange={(e) => setName(e.target.value)} required />
                                            <div className="information__heading__form__text">H??? v?? t??n</div>

                                            <input type="text" className="information__heading__form__input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            <div className="information__heading__form__text">Email</div>
                                            <input type="text" className="information__heading__form__input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <div className="information__heading__form__text">M???t kh???u</div>
                                            <input type="text" className="information__heading__form__input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                            <div className="information__heading__form__text">X??c nh???n m???t kh???u</div>
                                            <button className="btn-dark width100" type="submit">C???P NH???T</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-4 m-5 s-12 xs-12 pl-2">
                                    <div className="profile__heading">
                                        <h1>????n h??ng c???a t??i</h1>
                                        <span className="profile__heading__link"> <Link to='/orderhistory'>Chi ti???t</Link></span>
                                    </div>
                                    {loadingOrders ? ('') : (
                                        <>
                                            <div className="profile__body">
                                                <div className="profile__body__text">???? ?????t</div>
                                                <div className="profile__body__data">{orders.length}</div>
                                            </div>
                                            <div className="profile__body">
                                                <div className="profile__body__text">???? giao</div>
                                                <div className="profile__body__data">{count(orders, true)}</div>
                                            </div>
                                            <div className="profile__body">
                                                <div className="profile__body__text">Ch??a giao</div>
                                                <div className="profile__body__data">{count(orders, false)}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="col-1 m-0 s-0 xs-0"></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}