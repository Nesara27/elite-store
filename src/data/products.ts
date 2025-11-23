// Dummy product data for eCommerce store
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-fidelity sound with active noise cancellation. Experience music like never before with our flagship headphones.",
    price: 24999,
    originalPrice: 33199,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 1240,
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium sound quality",
      "Comfortable design"
    ]
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Stay connected with style. Advanced health tracking and seamless smartphone integration.",
    price: 33199,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    inStock: true,
    rating: 4.6,
    reviewCount: 856,
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "7-day battery"
    ]
  },
  {
    id: "3",
    name: "Minimalist Backpack",
    description: "Elegant design meets functionality. Perfect for work, travel, or everyday use.",
    price: 10799,
    originalPrice: 14939,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    inStock: true,
    rating: 4.7,
    reviewCount: 645,
    features: [
      "Water-resistant material",
      "Laptop compartment",
      "Multiple pockets",
      "Ergonomic design"
    ]
  },
  {
    id: "4",
    name: "Wireless Mouse Elite",
    description: "Precision meets comfort. Ergonomic design with customizable buttons for productivity.",
    price: 6639,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
    inStock: true,
    rating: 4.5,
    reviewCount: 432,
  },
  {
    id: "5",
    name: "Mechanical Keyboard RGB",
    description: "Type in style with tactile switches and stunning RGB lighting effects.",
    price: 12449,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    inStock: true,
    rating: 4.9,
    reviewCount: 1089,
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere. Waterproof design with 360° sound.",
    price: 8299,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    inStock: false,
    rating: 4.4,
    reviewCount: 567,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    description: "UV protection with timeless style. Premium polarized lenses.",
    price: 15769,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    inStock: true,
    rating: 4.6,
    reviewCount: 324,
  },
  {
    id: "8",
    name: "Laptop Stand Aluminum",
    description: "Elevate your workspace. Adjustable height and angle for perfect ergonomics.",
    price: 4979,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    inStock: true,
    rating: 4.7,
    reviewCount: 892,
  },
];

export const categories = [...new Set(products.map(p => p.category))];
