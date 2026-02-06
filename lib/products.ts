export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: "Apparel" | "Footwear" | "Home";
  stock: number;
  rating: number;
  reviews: number;
  badge?: "Sale" | "New" | "Popular";
};

export const products: Product[] = [
  // Apparel
  {
    id: "1",
    name: "Classic T-Shirt",
    price: 19.99,
    description: "Comfortable cotton t-shirt in multiple colors.",
    image: "/products/tshirt.svg",
    category: "Apparel",
    stock: 45,
    rating: 4.5,
    reviews: 128,
    badge: "Popular",
  },
  {
    id: "2",
    name: "Denim Jeans",
    price: 49.99,
    description: "Classic blue denim jeans with perfect fit.",
    image: "/products/jeans.svg",
    category: "Apparel",
    stock: 32,
    rating: 4.7,
    reviews: 95,
    badge: "Popular",
  },
  {
    id: "3",
    name: "White Hoodie",
    price: 39.99,
    description: "Cozy white hoodie perfect for any season.",
    image: "/products/hoodie.svg",
    category: "Apparel",
    stock: 28,
    rating: 4.6,
    reviews: 67,
    badge: "New",
  },
  {
    id: "4",
    name: "Baseball Cap",
    price: 24.99,
    description: "Adjustable baseball cap with embroidered logo.",
    image: "/products/cap.svg",
    category: "Apparel",
    stock: 55,
    rating: 4.3,
    reviews: 43,
  },
  // Footwear
  {
    id: "5",
    name: "Running Sneakers",
    price: 79.99,
    description: "Lightweight sneakers for everyday running.",
    image: "/products/sneakers.svg",
    category: "Footwear",
    stock: 25,
    rating: 4.8,
    reviews: 156,
    badge: "Popular",
  },
  {
    id: "6",
    name: "Leather Boots",
    price: 89.99,
    description: "Premium leather boots with comfortable padding.",
    image: "/products/boots.svg",
    category: "Footwear",
    stock: 18,
    rating: 4.6,
    reviews: 82,
    badge: "Sale",
  },
  {
    id: "7",
    name: "Casual Slip-ons",
    price: 44.99,
    description: "Easy-to-wear slip-on shoes for casual style.",
    image: "/products/slipon.svg",
    category: "Footwear",
    stock: 40,
    rating: 4.4,
    reviews: 54,
  },
  {
    id: "8",
    name: "Running Cleats",
    price: 69.99,
    description: "Professional running cleats for track and field.",
    image: "/products/cleats.svg",
    category: "Footwear",
    stock: 15,
    rating: 4.7,
    reviews: 71,
    badge: "New",
  },
  // Home
  {
    id: "9",
    name: "Coffee Mug",
    price: 12.5,
    description: "Ceramic mug with 350ml capacity.",
    image: "/products/mug.svg",
    category: "Home",
    stock: 80,
    rating: 4.5,
    reviews: 203,
    badge: "Popular",
  },
  {
    id: "10",
    name: "Ceramic Plate",
    price: 18.99,
    description: "Elegant ceramic dinner plate with glossy finish.",
    image: "/products/plate.svg",
    category: "Home",
    stock: 60,
    rating: 4.6,
    reviews: 91,
  },
  {
    id: "11",
    name: "Water Bottle",
    price: 22.99,
    description: "Stainless steel water bottle keeps drinks cold for 24 hours.",
    image: "/products/bottle.svg",
    category: "Home",
    stock: 50,
    rating: 4.7,
    reviews: 134,
    badge: "Sale",
  },
  {
    id: "12",
    name: "Throw Pillow",
    price: 29.99,
    description: "Soft and comfortable throw pillow for any couch.",
    image: "/products/pillow.svg",
    category: "Home",
    stock: 35,
    rating: 4.4,
    reviews: 48,
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(productId: string, limit = 3) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function filterProducts(
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest"
) {
  let filtered = [...products];

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  return filtered;
}
