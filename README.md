# Next.js E-Commerce Store

A modern, fully-functional e-commerce store built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🛍️ **Complete Shopping Experience**: Browse products, add to cart, and checkout
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- 🔍 **Advanced Filtering**: Search, filter by category, and sort products
- 🛒 **Persistent Cart**: Cart data persists in localStorage
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Next.js 14 App Router for optimal performance
- 🎯 **Type-Safe**: Written in TypeScript for better developer experience

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage
- **Data Fetching**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository or navigate to this directory

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextjs-shopify/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── shop/              # Shop page
│   │   ├── product/[id]/      # Product detail page
│   │   ├── checkout/          # Checkout page
│   │   ├── order-success/     # Order confirmation page
│   │   ├── layout.tsx         # Root layout
│   │   ├── providers.tsx      # Client-side providers
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── ClientLayout.tsx  # Main layout wrapper
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Footer
│   │   ├── ProductCard.tsx   # Product card component
│   │   ├── CartDrawer.tsx    # Shopping cart drawer
│   │   └── AuthModal.tsx     # Authentication modal
│   ├── hooks/                 # Custom React hooks
│   │   └── useCart.ts        # Cart management hook
│   ├── lib/                   # Utility functions
│   │   └── utils.ts          # Helper utilities
│   ├── types/                 # TypeScript type definitions
│   │   └── product.ts        # Product types
│   └── data/                  # Static data
│       └── products.ts       # Product catalog
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage (localStorage)
- Real-time total calculation

### Product Catalog
- 8 sample products across multiple categories
- Product images, descriptions, ratings
- Discount pricing support
- Stock availability tracking

### Checkout Flow
- Multi-step checkout form
- Order summary
- Mock payment processing
- Order confirmation page

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## Customization

### Adding Products
Edit `src/data/products.ts` to add or modify products:

```typescript
{
  id: "9",
  name: "Your Product",
  description: "Product description",
  price: 99.99,
  category: "Category",
  image: "https://your-image-url.com",
  inStock: true,
  rating: 4.5,
  reviewCount: 100
}
```

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes

### Adding Pages
Create new pages in the `src/app` directory following Next.js App Router conventions.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
npm run start
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
