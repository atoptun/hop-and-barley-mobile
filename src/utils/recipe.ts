import { BASE_RECIPES } from '@/data/recipes-mock';
import { BeerRecipe } from '@/types/recipe';

export const mediaBaseUrl = process.env.EXPO_PUBLIC_MEDIA_BASE_URL;

export function updateRecipe(recipe: BeerRecipe): BeerRecipe {
  // Adding remote data along with local data due to my-json-server.typicode.com restrictions
  const baseRecipe = BASE_RECIPES.find(bp => bp.slug === recipe.slug);
  if (baseRecipe) {
    recipe = {
      ...baseRecipe,
      ...recipe,
    };
  }

  recipe.gallery = recipe.gallery.map(item => `${mediaBaseUrl}${item}`);
  recipe.ingredients = recipe.ingredients.map(item => ({
    ...item,
    image: `${mediaBaseUrl}${item.image}`,
  }));
  recipe.ibu = typeof recipe.ibu === 'number' ? recipe.ibu : parseFloat(recipe.ibu);
  recipe.average_rating =
    typeof recipe.average_rating === 'number'
      ? recipe.average_rating
      : parseFloat(recipe.average_rating);
  return recipe;
}
