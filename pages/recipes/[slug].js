import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Skeleton from '../../components/Skeleton';
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
		// Fallback Pages, update a 404 page, works with incremental static Regeneration.
		// change from false (404 page, if not found) to true (reread getStaticProps, then check RecipeDetails)
		fallback: true,
	};
};

export async function getStaticProps({ params }) {
	const { items } = await client.getEntries({
		content_type: 'recipe',
		'fields.slug': params.slug,
	});

	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			recipe: items[0],
		},
		// incremental static Regeneration, just update DO NOT CREATE
		// time to check for changes, exmaple: 10 seconds
		revalidate: 1,
	};
}

const RecipeDetails = ({ recipe }) => {
	if (!recipe) return <Skeleton />;

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
					background: hsl(0, 0%, 100%);
					display: inline-block;
					padding: 1.25em;
					position: relative;
					top: -3.75em;
					left: -0.625em;
					transform: rotateZ(-1deg);
					box-shadow: 0.0625px 0.1875px 0.3125px hsla(0, 0%, 0%, 0.1);
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
