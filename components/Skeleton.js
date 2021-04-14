import React from 'react';

const Skeleton = () => {
	return (
		<div className='skeleton'>
			<div className='s-banner'></div>
			<div className='s-header'></div>
			<div className='s-content'></div>
			<div className='s-content'></div>
			<div className='s-content'></div>

			<style jsx>{`
				.skeleton {
					max-width: 75em;
					margin: 1.25em auto;
				}
				.skeleton > div {
					background: hsl(55, 79%, 48%);
					border-radius: 0.25em;
					margin: 1.25em 0;
				}
				.s-banner {
					padding: 12% 0;
				}
				.s-header {
					padding: 0.925em 0;
					max-width: 31.25em;
				}
				.s-content {
					padding: 0.5em 0;
					max-width: 62.5em;
				}
			`}</style>
		</div>
	);
};

export default Skeleton;
