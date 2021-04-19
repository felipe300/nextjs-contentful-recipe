import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 3000);
	}, []);

	return (
		<div className='not-found'>
			<h1>404</h1>
			<p>Ooppps! That page cannot be found 😢</p>
			<p>
				Redirecting to <Link href='/'>Homepage</Link> for more marmite recepies
			</p>
			<style jsx>{`
				.not-found {
					display: grid;
					place-items: center;
					background: hsl(0, 0%, 100%);
					padding: 1.875em;
					box-shadow: 0.0625px 0.1875px 0.3125px hsla(0, 0%, 0%, 0.1);
					transform: rotateZ(-1deg);
				}
				h1 {
					font-size: 3em;
				}
			`}</style>
		</div>
	);
};

export default NotFound;
