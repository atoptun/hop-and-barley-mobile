import { ImageSource } from 'expo-image';

export interface OnboardingStep {
  image: string | number | ImageSource;
  title: string;
  text: string;
}
