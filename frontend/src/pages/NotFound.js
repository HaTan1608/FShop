import React, { useState } from 'react'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';

import { Helmet } from "react-helmet-async";
const NotFound = () => {
	const [state] = useState({
		heading: 'Oops, 404',
		paragraph: 'Sorry, the page you are looking for does not exist.',
		image: '/assets/images/404.jpg',
	});
	return (
		<>	<Helmet>
			<title>Không tìm thấy trang!</title>

		</Helmet>

			<Header />
			<div className=''>Oops,404</div>
			<Footer />
		</>
	);
};
export default NotFound;
