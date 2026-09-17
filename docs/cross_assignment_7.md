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

## Animation

[Animated product list](/src/components/features/catalog/product-list.tsx)

[Animated add to cart counter](/src/components/common/add-to-cart-counter.tsx)

## Render optimisation

[Optimised product list](/src/components/features/catalog/product-list.tsx)

[Memoized product card](/src/components/features/catalog/product-card.tsx)
