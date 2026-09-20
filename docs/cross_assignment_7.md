# Cross Assignment 7

## Prepare

Copy `.env.template` file

```bash
cp .env.template .env.local
```

```bash
yarn expo prebuild --clean

yarn expo run:android
```

## Video

[![Cross Assignment 7](https://img.youtube.com/vi/TxlDFA6SKRI/0.jpg)](https://youtu.be/TxlDFA6SKRI)

[Watch on YouTube](https://youtu.be/TxlDFA6SKRI)

## Animation

[Animated product list](/src/components/features/catalog/product-list.tsx)

[Animated add to cart counter](/src/components/common/add-to-cart-counter.tsx)

## Render optimisation

[Optimised product list](/src/components/features/catalog/product-list.tsx)

[Memoized product card](/src/components/features/catalog/product-card.tsx)

## Size optimisation

### Remove unused fonts

Before: All font files are included - 18 Inter fonts ≈ 6.2 MB

```text
node_modules/@expo-google-fonts/inter/100Thin_Italic/Inter_100Thin_Italic.ttf (347KB)
node_modules/@expo-google-fonts/inter/100Thin/Inter_100Thin.ttf (343KB)
node_modules/@expo-google-fonts/inter/200ExtraLight_Italic/Inter_200ExtraLight_Italic.ttf (347KB)
node_modules/@expo-google-fonts/inter/200ExtraLight/Inter_200ExtraLight.ttf (343KB)
node_modules/@expo-google-fonts/inter/300Light_Italic/Inter_300Light_Italic.ttf(347KB)
node_modules/@expo-google-fonts/inter/300Light/Inter_300Light.ttf (343KB)
node_modules/@expo-google-fonts/inter/400Regular_Italic/Inter_400Regular_Italic.ttf (346KB)
node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf (342KB)
node_modules/@expo-google-fonts/inter/500Medium_Italic/Inter_500Medium_Italic.ttf (346KB)
node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf (343KB)
node_modules/@expo-google-fonts/inter/600SemiBold_Italic/Inter_600SemiBold_Italic.ttf (347KB)
node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf (344KB)
node_modules/@expo-google-fonts/inter/700Bold_Italic/Inter_700Bold_Italic.ttf (348KB)
node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf (344KB)
node_modules/@expo-google-fonts/inter/800ExtraBold_Italic/Inter_800ExtraBold_Italic.ttf (349KB)
node_modules/@expo-google-fonts/inter/800ExtraBold/Inter_800ExtraBold.ttf (345KB)
node_modules/@expo-google-fonts/inter/900Black_Italic/Inter_900Black_Italic.ttf(349KB)
node_modules/@expo-google-fonts/inter/900Black/Inter_900Black.ttf (345KB)
```

```bash
yarn remove @expo-google-fonts/inter
yarn add expo-font
```

```typescript
import { useFonts } from 'expo-font';

const [fontLoaded, fontError] = useFonts({
  Inter_400Regular: require('@/assets/fonts/Inter-Regular.ttf'),
  Inter_500Medium: require('@/assets/fonts/Inter-Medium.ttf'),
  Inter_600SemiBold: require('@/assets/fonts/Inter-SemiBold.ttf'),
  Inter_700Bold: require('@/assets/fonts/Inter-Bold.ttf'),
  Inter_800ExtraBold: require('@/assets/fonts/Inter-ExtraBold.ttf'),
});
```

After: Only the used font files are included - 5 Inter fonts ≈ 1.7 MB.

```text
assets/fonts/Inter-Bold.ttf (344KB)
assets/fonts/Inter-ExtraBold.ttf (345KB)
assets/fonts/Inter-Medium.ttf (343KB)
assets/fonts/Inter-Regular.ttf (342KB)
assets/fonts/Inter-SemiBold.ttf (344KB)
```

### Remove unused icons

Before: All @expo/vector-icons are included - 19 icon fonts ≈ 4.1 MB

```text
node_modules/@expo-google-fonts/material-symbols/400Regular/MaterialSymbols_400Regular.ttf (967KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf (130KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf (66KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/EvilIcons.ttf (13KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf (56KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf (166KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf (134KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf (34KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf (203KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Brands.ttf (209KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Regular.ttf (68KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Solid.ttf (424KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Fontisto.ttf (314KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Foundation.ttf (57KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf (390KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf (1.3MB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf (357KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf (69KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/SimpleLineIcons.ttf (54KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Zocial.ttf (26KB)
```

After: Only the used font @expo/vector-icons are included - 1 icon font ≈ 1.3 MB.

```text
node_modules/@expo-google-fonts/material-symbols/400Regular/MaterialSymbols_400Regular.ttf (967KB)
node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf (1.3MB)
```

### Convert and compress images

Before: ≈ 8.1 MB

```txt
assets/images/login.png (3 variations | 154KB)
assets/images/onboarding/step-1.png (3 variations | 2.4KB)
assets/images/onboarding/step-2.png (3 variations | 2.6KB)
assets/images/onboarding/step-3.png (3 variations | 3.1KB)
```

After: ≈ 0.5 MB

```txt
assets/images/login.webp (3 variations | 40KB)
assets/images/onboarding/step-1.webp (3 variations | 154KB)
assets/images/onboarding/step-2.webp (3 variations | 146KB)
assets/images/onboarding/step-3.webp (3 variations | 110KB)
```
