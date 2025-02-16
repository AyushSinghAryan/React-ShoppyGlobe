# ShoppyGlobe

Live Site: [ShoppyGlobe](https://reactshoppyglobe.netlify.app/)

## Overview
ShoppyGlobe is a fully responsive e-commerce web application built with React and TailwindCSS. It allows users to browse products, filter items, add/remove products from the cart, and view product details. The state is managed using Redux, and user notifications are handled via React Toastify.

## Features
- Browse products fetched from an API using a custom hook
- View detailed product information
- Search and filter products using an input field
- Add/remove products from the cart
- Increase/decrease product quantity in the cart
- Toast notifications for user interactions
- State management using Redux
- Error page for undefined URLs
- Fully responsive UI using TailwindCSS

## Installation
Follow these steps to set up the project locally:

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/AyushSinghAryan/React-ShoppyGlobe.git
   ```
2. Navigate to the project folder:
   ```sh
   cd React-ShoppyGlobe
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open your browser and visit `http://localhost:5173` (default Vite port).

## Build for Production
To create an optimized production build:
```sh
npm run build
# or
yarn build
```

To preview the production build:
```sh
npm run preview
# or
yarn preview
```

## Tech Stack
- **Frontend:** React, TailwindCSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Notifications:** React Toastify
- **Build Tool:** Vite

## Repository
GitHub: [React-ShoppyGlobe](https://github.com/AyushSinghAryan/React-ShoppyGlobe)

