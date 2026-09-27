# Final project analysis

## Analysis

The Hop&Barley app is a mobile application for ordering homebrewing supplies. The application
implements the following functionality:

- Welcome screens (onboarding)
- User registration and authentication
- Browsing the product catalog
- Adding items to the cart
- Viewing the cart

The primary goal of the project is to build an intuitive, user-friendly interface that allows users
to quickly find and order the supplies they need.

Core app navigation (expo-router) is implemented via TabBar and Stack navigation. Users can
seamlessly navigate between primary screens such as the product catalog and the cart. Auxiliary
navigation is handled through a Drawer menu, providing quick access to sections such as order
history, user profile, and settings. While routing is set up for most auxiliary screens, their core
features still require implementation.

State management is handled via the Context API (Theme) and Redux (Auth, Cart). This approach
ensures efficient global state control and provides components with quick access to shared data
across the app.

Communication with external backends (Auth, Store) is isolated within dedicated services, allowing
for centralized request handling and data management.

The app requires functional expansion to boost user engagement and streamline interactions. The
following enhancements are slated for development:

- A recipe catalog with the ability to add required ingredients directly to the cart
- Gesture-based swipe navigation across onboarding screens
- Toast notifications for auth actions (login, registration, logout, password recovery) and error
  handling
- Advanced search and sorting within the product catalog

## Recipes

1. ✅ Add a recipe catalog with the ability to add ingredients directly to the shopping cart.
2. ✅ Add recipe sorting by rating and name.
3. ✅ Add recipe filtering by difficulty level.
4. ✅ Add recipe search by title.

## Onboarding

1. ✅ Implement swipe gestures on the Onboarding screen so users can navigate slides by swiping left
   and right.
2. ✅ Store onboarding completion status in AsyncStorage to prevent displaying it on subsequent app
   launches.
3. ✅ Test on wide screens and optimize responsiveness for landscape orientation and tablets.

## Authentication

1. ✅ Add toast notifications for successful login, registration, logout, password recovery, and
   error feedback.
2. ✅ Add a confirmation screen post-password reset notifying users that instructions were sent to
   their email.
3. ✅ Implement loading indicators across all server requests to keep users informed during data
   fetching.
4. ✅ Add OTP code verification during registration to enhance account security.

## Store

1. ✅ Migrate state management to Redux Toolkit to streamline global state handling and improve
   component data access.
2. ✅ Add pull-to-refresh data updates and infinite scrolling pagination.
3. ✅ Implement product sorting by price, rating, and other key parameters.
4. ✅ Add product filtering by categories, price range, and attributes.
5. ✅ Add product search by title and description.

## Cart

1. ✅ Add toast notifications for successfully adding and removing items from the cart.
2. ✅ Display a dynamic item count badge on the TabBar cart icon.
3. ✅ Optimize cart performance and state manipulation using custom hooks.
