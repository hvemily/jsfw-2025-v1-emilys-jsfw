# React + Vite eCom Store – Course Assignment

This project is built as part of a frontend development course assignment with the goal of applying React knowledge to build a functioning and styled eCommerce store.

---

## Goal

To apply knowledge of React to build an eCom store that fetches data from a live API, displays product listings, enables cart functionality, and allows users to check out and contact the store.

---

## Brief Summary

You are required to build the following pages:

- **Homepage** – Displays all products and includes a search component
- **Product Page** – Displays details for a single product and allows adding to cart
- **Cart Page** – Lists cart items, shows total, and allows proceeding to checkout
- **Checkout Success Page** – Confirmation message after checkout and resets the cart
- **Contact Page** – A validated form to submit a message to the store

---

## Process Overview

1. Set up a new React app using Vite
2. Create shared layout using a `<Layout>` component with Header and Footer
3. Add navigation and a Cart icon with item count
4. Set up pages using React Router:
   - `/` → Homepage
   - `/product/:id` → Individual Product Page
   - `/cart` → Cart Page
   - `/success` → Checkout Success Page
   - `/contact` → Contact Page
5. Implement API data fetching from [Noroff API](https://v2.api.noroff.dev/online-shop)
6. Add dynamic filtering with a look-ahead search
7. Handle cart logic via state
8. Add checkout logic and reset cart on success
9. Validate the contact form and log form data on submission
10. Deploy the final result to Netlify

---

## API Reference

All product data is fetched from:

```
https://v2.api.noroff.dev/online-shop
```

Single product example:

```
https://v2.api.noroff.dev/online-shop/{productId}
```

---

## Pages and Features

| Page                  | Features                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| Homepage              | Product list, look-ahead search bar, links to product pages             |
| Product Page          | Title, description, image, price, discount, reviews, Add to Cart button |
| Cart Page             | Lists cart items, total sum, Checkout button                            |
| Checkout Success Page | Shows success message, clears cart, back to homepage button             |
| Contact Page          | Validated form with name, subject, email, and body                      |

---

## Form Validation Rules (Contact Page)

- **Full name**: Min 3 characters (required)
- **Subject**: Min 3 characters (required)
- **Email**: Must be valid format (required)
- **Message body**: Min 3 characters (required)
- On valid submit, data is logged to the console

---

## Tech Stack

- **React**
- **React Router**
- **Vite**
- **TypeScript** (optional but used here)
- **CSS Modules / Tailwind CSS / or Styled Components**
- **Vitest** (for unit testing)

---

## Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Start the Vite dev server
npm run build    # Build for production
npm run test     # Run tests
```

---

## Deployment

This project is deployed on Netlify.

Be sure to:

- Use `.gitignore` to exclude `node_modules`
- Submit both the **GitHub repo URL** and the **Netlify live URL**

---

## Folder Structure

```txt
src/
├── components/      # Shared components like Header, Footer, CartIcon
├── pages/           # Homepage, ProductPage, CartPage, SuccessPage, ContactPage
├── layout/          # Layout component with header/footer
├── hooks/           # Custom hooks (optional)
├── styles/          # Global styles or CSS modules
└── main.tsx         # App entry point
```

---

## Notes

- Focus on clean, readable code
- Use responsive design principles
- Try to avoid unnecessary dependencies – build from scratch where possible
- Comment your logic where it’s helpful

---
