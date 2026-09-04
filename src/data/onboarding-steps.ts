import { OnboardingStep } from '@/types/onboarding';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: require('@/assets/images/onboarding/step-1.png'),
    title: 'Brew Any Style',
    text: 'Access curated recipes with exact mash profiles, boil schedules, and fermentation guides.',
  },
  {
    image: require('@/assets/images/onboarding/step-2.png'),
    title: 'Fresh Ingredients, Delivered',
    text: 'Shop malts, hops, yeast, and hardware directly matched to your favorite recipes.',
  },
  {
    image: require('@/assets/images/onboarding/step-3.png'),
    title: 'Grain to Glass Made Simple',
    text: 'Everything you need to turn your kitchen or garage into a craft brewery.',
  },
];
