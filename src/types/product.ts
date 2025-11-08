// Product types for eCommerce store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  category: string;
  image: string;
  images?: string[]; // Additional images for product detail
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
