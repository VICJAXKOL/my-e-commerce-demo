# My E-Commerce Demo

A modern, feature-rich e-commerce application built with Next.js, React, and Tailwind CSS. Browse products across 8 categories, add items to cart, and checkout seamlessly.

## 🚀 Live Demo

**[View on Vercel](https://my-e-commerce-demo-vicjaxkol.vercel.app)**

## ✨ Features

- **8 Product Categories**: Apparel, Footwear, Home & Living, Electronics, Sports & Fitness, Beauty & Personal Care, Accessories, and Books & Entertainment
- **32 Unique Products**: Comprehensive catalog with pricing, ratings, reviews, and stock levels
- **Shopping Cart**: Add/remove items, adjust quantities, persisted cart state via Context API
- **Product Discovery**: Search, filter by category, and sort products
- **Dynamic Product Pages**: Individual product detail pages with related products
- **Responsive Design**: Mobile-first layout using Tailwind CSS
- **User-Friendly Navigation**: Multi-page app with breadcrumbs and intuitive routing

## 📋 Pages

- **Home** (`/`) - Featured products by category
- **Products** (`/products`) - Browse all products with search & filter
- **Product Detail** (`/products/[id]`) - Individual product page
- **Categories** (`/categories`) - Browse by category
- **Cart** (`/cart`) - View and manage cart items
- **Checkout** (`/checkout`) - Review order
- **Confirmation** (`/confirmation`) - Order confirmation
- **About, Contact, FAQ, Returns** - Informational pages

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **State**: React Context API (Cart management)
- **Language**: TypeScript 5
- **Images**: SVG assets in `/public/products`

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/VICJAXKOL/my-e-commerce-demo.git
cd my-e-commerce-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
my-react-app/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── products/
│   │   ├── page.tsx              # Products listing
│   │   └── [id]/page.tsx         # Product detail
│   ├── categories/page.tsx       # Categories page
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout
│   └── ...other pages
├── components/                   # Reusable React components
│   ├── ProductCard.tsx
│   ├── SearchAndFilter.tsx
│   ├── CartClient.tsx
│   ├── NavBar.tsx
│   └── ...more components
├── context/                      # React Context API
│   └── CartContext.tsx           # Cart state management
├── lib/                          # Utilities & data
│   └── products.ts              # Product catalog & functions
├── public/products/             # SVG product images (32 total)
└── package.json
```

## 📊 Product Catalog

**8 Categories × 4 Products = 32 Items**

| Category | Price Range | Items |
|----------|-------------|-------|
| Apparel | $19.99–$49.99 | T-Shirt, Jeans, Hoodie, Cap |
| Footwear | $44.99–$89.99 | Sneakers, Boots, Slip-ons, Cleats |
| Home & Living | $12.50–$29.99 | Mug, Plate, Bottle, Pillow |
| Electronics | $14.99–$129.99 | Headphones, Cable, Power Bank, Charger |
| Sports & Fitness | $19.99–$89.99 | Yoga Mat, Dumbbells, Bands, Rope |
| Beauty & Personal Care | $8.99–$24.99 | Face Wash, Moisturizer, Lip Balm, Sanitizer |
| Accessories | $39.99–$149.99 | Backpack, Smart Watch, Sunglasses, Belt |
| Books & Entertainment | $16.99–$34.99 | Novel, Notebook, Pen Set, Board Game |

## 🚀 Development

```bash
# Run TypeScript type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm run start
```

## 🔗 Sharing

- **GitHub**: [VICJAXKOL/my-e-commerce-demo](https://github.com/VICJAXKOL/my-e-commerce-demo)
- **Live Demo**: https://my-e-commerce-demo-vicjaxkol.vercel.app

## 📝 License

Open source — feel free to use and modify!
