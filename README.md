# React + Vite eCom Store — Course Assignment

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&logoColor=fff)](https://vitest.dev/)

A small eCommerce storefront built for a frontend development **course assignment**.  
The app fetches products from the **Noroff Online Shop API**, supports searching and sorting,
adds items to a cart, provides a checkout success flow, and includes a validated contact form.

> **Live demo:** [Marquet Co](https://marquet-co.netlify.app/)

---

## ✨ Features

- **Homepage**: product grid, **look‑ahead search**, client‑side sorting, and category/tag chips
- **Product page**: large image, price + discount badge, rating, and **Add to Cart**
- **Cart page**: list items, update/remove, show totals, **proceed to checkout**
- **Checkout success**: confirmation screen that **clears the cart**
- **Contact page**: validated form (name, subject, email, message) with accessible errors
- **Responsive UI** built with Tailwind; keyboard‑friendly and screen‑reader‑aware
- **TypeScript** first; **Vitest** ready for unit tests

---

## 🧰 Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (fast dev server & build)
- **React Router** for routing
- **Tailwind CSS** for styling
- **Vitest** for unit tests

---

## 🔌 API

All product data is fetched from the Noroff API:

- **List:** `https://v2.api.noroff.dev/online-shop`
- **Single product:** `https://v2.api.noroff.dev/online-shop/{productId}`

> Tip: You can centralize the base in `src/constants/api.ts` and optionally read from an env var.

```ts
// src/constants/api.ts
export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://v2.api.noroff.dev/online-shop";
```

Create a local `.env` if you want to override:

```
VITE_API_BASE=https://v2.api.noroff.dev/online-shop
```

---

## 🧭 Routes

- `/` – Homepage (list + search + sort)
- `/product/:id` – Single product details
- `/cart` – Cart overview
- `/success` – Checkout success (clears cart)
- `/contact` – Contact form with validation

---

## 🚀 Getting Started

```bash
# 1) Install
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview local production build
npm run preview

# 5) Run unit tests (Vitest)
npm run test
```

---

## 🗂 Project Structure

```
src/
├─ components/          # Reusable UI (Header, Footer, ProductCard, CartIcon, AddToCartButton, Toast, etc.)
├─ pages/               # Home, ProductPage, CartPage, SuccessPage, ContactPage
├─ layout/              # <Layout> with shared header/footer & outlet
├─ features/            # Domain-specific hooks/state (e.g., products, cart)
├─ hooks/               # Custom hooks (debounce, useLocalStorage, etc.)
├─ types/               # TypeScript models (Product, CartItem, API responses)
├─ constants/           # API base, route paths, etc.
├─ styles/              # Global styles or Tailwind setup
└─ main.tsx             # App entry (Router + Layout)
```

---

## 🧪 Testing (Vitest)

- Co-locate tests next to components (e.g. `ProductCard.test.tsx`).
- Example command:
  ```bash
  npm run test
  ```
- Consider testing:
  - search & sort behavior
  - cart add/remove/total calculations
  - contact form validation success/failure

---

## ♿ Accessibility & UX

- Semantic HTML, labeled controls, ARIA where appropriate
- Keyboard navigation & visible focus states
- Color contrast checked for text and interactive elements
- Reduced layout shift with set aspect ratios for images
- Toast messages with role="status" or role="alert" for screen readers

---

## 📦 Implementation Notes

- **State management**: cart state kept in React (optionally persisted with `localStorage`).
- **Fetching**: simple `fetch` wrappers; errors surfaced with friendly UI + retry.
- **Search**: debounced look‑ahead suggestions on Home.
- **Sorting**: price (low→high/high→low), name (A–Z), rating, discount.
- **Contact form**: min length 3 for name/subject/message, valid email regex; logs payload on submit.

---

## ✅ Assignment Checklist

- [x] React app bootstrapped with Vite
- [x] Shared `<Layout>` with Header/Footer + Cart icon & count
- [x] Pages and routes implemented
- [x] Data fetched from live API
- [x] Search with look‑ahead + sorting
- [x] Cart logic, totals, and checkout success that resets cart
- [x] Contact form with validation and console logging on submit
- [x] Deployed to Netlify
- [x] Clean, responsive UI with accessible patterns

---

## 📄 License

Noroff School of Technology and Digital Media © 2025 — For educational use.
