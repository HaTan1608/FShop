import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { register } from '../actions/registerActions';
import { Helmet } from "react-helmet-async";
import MessageBox from '../components/Message/MessageBox';
const RegisterScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image] = useState('https://file.hstatic.net/1000230642/file/banner-main_72c5a4c7e3be459585e93d0cb037a47c.jpg');
    const dispatch = useDispatch();
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo } = userRegister;
    const [openMess, setOpenMess] = useState({ open: false, tittle: '', content: '', type: '', duration: 0 });
    const submitHandler = (e) => {

        e.preventDefault();
        if (password !== confirmPassword) {
            setOpenMess({ ...openMess, open: true, title: 'Thất bại', content: 'Mật khẩu xác nhận không đúng', type: 'error' })
        } else {
            dispatch(register(email, password, ''));

            setOpenMess({ ...openMess, open: true, title: 'Thành công', content: 'Tạo tài khoản thành công', type: 'success' })

        }
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <>
            <Helmet>
                <title>Đăng kí</title>

            </Helmet>
            <Header />

            <MessageBox messData={openMess} />
            <div className="signin">
                <div className="col-12 s-12 xs-12">
                    <div className="signin__image">
                        <LazyLoadImage src={image} alt="image" />
                    </div>

                </div>
                <div className="container">
                    <div className='row'>

                        <div className="col-12 s-12 xs-12">
                            <div className="signin__form">
                                <form className="signin__form__contents" onSubmit={submitHandler}>
                                    <h2 className="signin__form__contents__heading">Đăng kí</h2>
                                    <div className="signin__form__contents__email">
                                        <span className="signin__form__contents__email__text">Email</span>
                                        <input className="signin__form__contents__email__input" type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="signin__form__contents__password">
                                        <span className="signin__form__contents__password__text">Mật khẩu</span>
                                        <input className="signin__form__contents__password__input" type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="signin__form__contents__password">
                                        <span className="signin__form__contents__password__text">Xác nhận</span>
                                        <input className="signin__form__contents__password__input" type="password" id="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="signin__form__button">
                                        <button className="btn-dark signin__form__button__button" type="submit">Đăng kí</button>
                                        <span className="signin__form__button__new">Có tài khoản</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )


}
export default RegisterScreen;