import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RecipeCard = ({ cookingTime, slug, thumbnail, title }) => {
	return (
		<div className='card'>
			<div className='featured'>
				<Image
					className='img'
					src={`https:${thumbnail.fields.file.url}`}
					width={thumbnail.fields.file.details.image.width}
					height={thumbnail.fields.file.details.image.height}
				/>
			</div>
			<div className='content'>
				<div className='info'>
					<h4>{title}</h4>
					<p>Takes approx: {cookingTime} minutes to make</p>
				</div>
				<div className='actions'>
					<Link href={`/recipes/${slug}`}>
						<a>Cook This</a>
					</Link>
				</div>
			</div>
			<style jsx>{`
				.card {
					transform: rotateZ(-1deg);
				}
				.content {
					background: hsl(0, 0%, 100%);

					margin: 0;
					position: relative;
					top: -2.5em;
					left: -0.625em;
				}
				.info {
					padding: 1em;
				}
				.info h4 {
					margin: 0.25em 0;
					text-transform: uppercase;
				}
				.info p {
					margin: 0;
					color: hsl(0, 0%, 47%);
				}
				.actions {
					margin-top: 1.25em;
					display: flex;
					justify-content: flex-end;
				}
				.actions a {
					color: hsl(0, 0%, 100%);
					background: hsl(356, 88%, 52%);
					padding: 1em 1.5em;
					text-decoration: none;
				}
			`}</style>
		</div>
	);
};

export default RecipeCard;
