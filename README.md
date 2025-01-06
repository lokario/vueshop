# Online Store - A Modern E-Commerce Platform

VueShop is a feature-rich e-commerce platform built with Vue 3, Vuetify, and Pinia. It offers a seamless shopping experience with real-time functionality, advanced filtering, a responsive design, and dynamic user interactions. This project is designed to showcase best practices in modern web development.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Login and signup functionalities with token-based authentication.
- **Dynamic Product Browsing**: Infinite scrolling and filtering by categories and search terms.
- **Responsive Design**: Optimized for desktop and mobile devices with adaptive layouts.
- **Shopping Cart**: Real-time cart management with item quantity adjustments and total price calculations.
- **Dark Mode**: Toggle between light and dark themes for an enhanced user experience.
- **404 Page**: User-friendly error page for non-existent routes.

## Technologies Used

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Pinia**: State management library for Vue, offering simplicity and reactivity.
- **Vuetify**: A Material Design component framework for a consistent and responsive UI.
- **Vite**: A fast and modern build tool for development and production.
- **VueUse**: A collection of essential utilities for Vue 3.
- **Vitest**: A fast and feature-rich test runner for Vue components.

## Project Structure

```plaintext
src/
├── assets/            # Static assets (e.g., images, logos)
├── components/        # Reusable Vue components
├── layouts/           # Layout components
├── models/            # TypeScript models (e.g., Product, User)
├── pages/             # Route-based components (e.g., SignInPage, HomePage)
├── router/            # Vue Router configuration
├── services/          # API interaction logic
├── stores/            # Pinia state management
├── styles/            # Global and component-specific styles
├── tests/             # Unit and integration tests
└── views/             # Page-specific views
```

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/online-store.git
   cd online-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

## Testing

1. Run unit and integration tests:
   ```bash
   npm run test
   ```

2. Watch for test file changes:
   ```bash
   npm run test:watch
   ```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.