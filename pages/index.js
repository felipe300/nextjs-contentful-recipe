import { createClient } from 'contentful';
// npm install contentful
import RecipeCard from '../components/RecipeCard';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.SPACE_ID,
		accessToken: process.env.ACCESS_KEY,
	});

	const res = await client.getEntries({
		content_type: 'recipe',
	});

	return {
		props: {
			recipes: res.items,
		},
	};
}

const Recipes = ({ recipes }) => {
	return (
		<div className='recipe-list'>
			{recipes.map((recipe) => {
				const { sys, fields } = recipe;
				return <RecipeCard key={sys.id} {...fields} />;
			})}

			<style jsx>{`
				.recipe-list {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-gap: 20px 60px;
				}
			`}</style>
		</div>
	);
};

export default Recipes;
