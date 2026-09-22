import { ProductCardItem } from './product';

export interface BeerRecipeIngredient extends ProductCardItem {
  url: string;
  amount: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface BeerRecipe {
  id: string;
  slug: string;
  title: string;
  style: string;
  difficulty: Difficulty;
  average_rating: number;
  abv: string;
  ibu: number;
  gallery: string[];
  short_description: string;
  full_description: string;
  ingredients: BeerRecipeIngredient[];
  instructions: string[];
}

export interface BeerRecipeCardItem {
  slug: string;
  title: string;
  style: string;
  difficulty: Difficulty;
  average_rating: number;
  abv: string;
  ibu: number;
  gallery: string[];
  short_description: string;
}

export interface BeerRecipesFilters {
  page?: number;
  limit?: number;
}
