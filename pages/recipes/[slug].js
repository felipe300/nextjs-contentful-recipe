import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
// REGEX ^[a-z0-9]+(?:-[a-z0-9]+)*$
// npm install @contentful/rich-text-react-renderer

const client = createClient({
	space: process.env.SPACE_ID,
	accessToken: process.env.ACCESS_KEY,
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: 'recipe',
	});

	const paths = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export async function getStaticProps({ params }) {
	const { items } = await client.getEntries({
		content_type: 'recipe',
		'fields.slug': params.slug,
	});

	return {
		props: {
			recipe: items[0],
		},
		// incremental static Regeneration, time to check for changes, exmaple: 10 seconds
		revalidate: 1,
	};
}

const RecipeDetails = ({ recipe }) => {
	const { sys, fields } = recipe;
	const { cookingTime, featuredImage, ingredients, method, title } = fields;
	return (
		<div>
			<div className='banner'>
				<Image
					className='img'
					src={`https:${featuredImage.fields.file.url}`}
					width={featuredImage.fields.file.details.image.width}
					height={featuredImage.fields.file.details.image.height}
					width={500}
					height={450}
				/>
				<h2>{title}</h2>
			</div>
			<div className='info'>
				<p>takes about {cookingTime} mins to cook</p>
				<h3>Ingredients</h3>
				{ingredients.map((item, idx) => {
					return <span key={idx}>{item}</span>;
				})}
			</div>
			<div className='method'>
				<h3>Method:</h3>
				<div>{documentToReactComponents(method)}</div>
			</div>

			<style jsx>{`
				h2,
				h3 {
					text-transform: uppercase;
				}

				.banner {
					display: grid;
					justify-items: center;
				}
				.banner h2 {
					margin: 0;
					background: #fff;
					display: inline-block;
					padding: 20px;
					position: relative;
					top: -60px;
					left: -10px;
					transform: rotateZ(-1deg);
					box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
				}
				.info p {
					margin: 0;
				}
				.info span::after {
					content: ', ';
				}
				.info span:last-child::after {
					content: '.';
				}
			`}</style>
		</div>
	);
};

export default RecipeDetails;
