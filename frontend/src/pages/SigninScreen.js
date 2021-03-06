import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { signin } from '../actions/signinActions';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import MessageBox from '../components/Message/MessageBox';
const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image] = useState('https://file.hstatic.net/1000230642/file/banner-main_72c5a4c7e3be459585e93d0cb037a47c.jpg');
    const dispatch = useDispatch();
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, error } = userSignin;
    const [openMess, setOpenMess] = useState({ open: false, tittle: '', content: '', type: '', duration: 0 });
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
                <div className="col-12 m-12 s-12 sx-12">
                    <div className="signin__image">
                        <LazyLoadImage src={image} alt="image" />
                    </div>
                </div>
                {error&&<MessageBox messData={{open: true, title: 'Đăng nhập thất bại', content: 'Không tồn tại email hoặc sai mật khẩu', type: 'error'}}/>}
                <div className="container width100">
                    <div className='row'>
                        <div className="col-12 m-12 s-12 sx-12">
                            <div className="signin__form">
                                <form className="signin__form__contents" onSubmit={submitHandler}>
                                    <h2 className="signin__form__contents__heading">Đăng nhập</h2>
                                    <input type="email" className="information__heading__form__input" onChange={(e) => setEmail(e.target.value)} required />
                                    <div className="information__heading__form__text">Email</div>
                                    <input type="password" className="information__heading__form__input" onChange={(e) => setPassword(e.target.value)} required />
                                    <div className="information__heading__form__text">Mật khẩu</div>
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