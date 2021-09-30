import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
const NotFound = () => {
	const [state] = useState({
		heading: 'Oops, 404',
		paragraph: 'Xin lỗi, trang không tồn tại',
		image: 'https://file.hstatic.net/1000230642/collection/ha-noi-kv-rong_aa42c9a90c7544c39ab9cfdf6a27eee1_master.png',
	});
	return (
		<>
			<Helmet>
				<title>404</title>
				<meta name='description' content='travel friends not found page' />
			</Helmet>
			<Header />
			<div className='homepage__banner notfound'>
				<div className='notfound__video'>
					{state.image ? (
						<LazyLoadImage src={state.image} alt={state.image} />
					) : (
						<video
							src={state.video}
							autoPlay
							loop
							muted
							poster={state.poster}></video>
					)}
				</div>
				<div className='notfound__contents'>
					<div className='notfound__contents__text'>
						<div className='notfound__contents__text__child'>
							<h1 className='notfound__contents__text__child__h1'>{state.heading}</h1>
							<p className='notfound__contents__text__child__p'>{state.paragraph}</p>
							<div className='notfound__contents__text__child__link'>
								<Link to='/'>Về trang chủ</Link>
							</div>
						</div>
					</div>

				</div>
			</div>
			<Footer />
		</>
	);
};
export default NotFound;
