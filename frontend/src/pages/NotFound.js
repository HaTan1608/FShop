import React, { useState } from 'react'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header';
const NotFound = () => {
	const [state] = useState({
		heading: 'Oops, 404',
		paragraph: 'Sorry, the page you are looking for does not exist.',
		image: '/assets/images/404.jpg',
	});
	return (
		<>
			<Header />
			<div className=''>Oops,404</div>
			<Footer />
		</>
	);
};
export default NotFound;
