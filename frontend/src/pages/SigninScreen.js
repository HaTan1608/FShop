import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { signin } from '../actions/signinActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

import { Helmet } from "react-helmet-async";
const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image] = useState('/assets/signin/sign.jpg');
    const dispatch = useDispatch();
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));

    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <>
            <Helmet>
                <title>Đăng nhập</title>

            </Helmet>
            <Header />
            <div className="signin">
                <div className="container width100">
                    <div className='row'>
                        <div className="col-6 m-6 s-0 sx-0">
                            <div className="homepage__banner">
                                <LazyLoadImage src={image} alt="image" />
                            </div>

                        </div>
                        <div className="col-6 m-6 s-12 sx-12">
                            <div className="signin__form">
                                <form className="signin__form__contents" onSubmit={submitHandler}>
                                    <h2 className="signin__form__contents__heading">Đăng nhập</h2>
                                    <div className="signin__form__contents__email">
                                        <span className="signin__form__contents__email__text">Email</span>
                                        <input className="signin__form__contents__email__input" type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="signin__form__contents__password">
                                        <span className="signin__form__contents__password__text">Mật khẩu</span>
                                        <input className="signin__form__contents__password__input" type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="signin__form__button">
                                        <button className="btn-dark signin__form__button__button" type="submit">Đăng nhập</button>
                                        <span className="signin__form__button__new"><Link to={`/register?redirect=${redirect}`}> Tạo tài khoản</Link></span>
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
export default SigninScreen;