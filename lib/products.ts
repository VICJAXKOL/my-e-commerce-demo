export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: "Apparel" | "Footwear" | "Home" | "Electronics" | "Sports & Fitness" | "Beauty & Personal Care" | "Accessories" | "Books & Entertainment";
  stock: number;
  rating: number;
  reviews: number;
  badge?: "Sale" | "New" | "Popular";
};
export const products: Product[] = [
  // Apparel (4)
  {
    id: "1",
    name: "Classic T-Shirt",
    price: 19.99,
    description: "Comfortable cotton t-shirt in multiple colors.",
    image: "/products/tshirt.webp",
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
    image: "/products/jeans.jpg",
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
    image: "/products/hoodie.webp",
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
    image: "/products/cap.jpg",
    category: "Apparel",
    stock: 55,
    rating: 4.3,
    reviews: 43,
  },
  // Footwear (4)
  {
    id: "5",
    name: "Running Sneakers",
    price: 79.99,
    description: "Lightweight sneakers for everyday running.",
    image: "/products/sneakers.jpg",
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
    image: "/products/boots.webp",
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
    image: "/products/slipon.avif",
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
    image: "/products/cleats.jpg",
    category: "Footwear",
    stock: 15,
    rating: 4.7,
    reviews: 71,
    badge: "New",
  },
  // Home & Living (4)
  {
    id: "9",
    name: "Coffee Mug",
    price: 12.5,
    description: "Ceramic mug with 350ml capacity.",
    image: "/products/mug.jpg",
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
    image: "/products/plate.jpg",
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
    image: "/products/bottle.jpg",
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
    image: "/products/pillow.webp",
    category: "Home",
    stock: 35,
    rating: 4.4,
    reviews: 48,
  },
  // Electronics (4)
  {
    id: "13",
    name: "Wireless Headphones",
    price: 129.99,
    description: "Premium wireless headphones with noise cancellation.",
    image: "/products/headphones.jpg",
    category: "Electronics",
    stock: 22,
    rating: 4.7,
    reviews: 184,
    badge: "Popular",
  },
  {
    id: "14",
    name: "USB-C Cable",
    price: 14.99,
    description: "Durable USB-C cable for fast charging and data transfer.",
    image: "/products/cable.jpg",
    category: "Electronics",
    stock: 150,
    rating: 4.6,
    reviews: 312,
  },
  {
    id: "15",
    name: "Power Bank",
    price: 49.99,
    description: "20000mAh portable battery charger for all devices.",
    image: "/products/powerbank.jpg",
    category: "Electronics",
    stock: 38,
    rating: 4.8,
    reviews: 267,
    badge: "New",
  },
  {
    id: "16",
    name: "Fast Charger",
    price: 39.99,
    description: "Quick charging adapter compatible with all USB-C devices.",
    image: "/products/charger.webp",
    category: "Electronics",
    stock: 72,
    rating: 4.5,
    reviews: 145,
    badge: "Sale",
  },
  // Sports & Fitness (4)
  {
    id: "17",
    name: "Yoga Mat",
    price: 34.99,
    description: "Non-slip yoga mat with carrying strap, 6mm thickness.",
    image: "/products/yogamat.jpg",
    category: "Sports & Fitness",
    stock: 48,
    rating: 4.6,
    reviews: 89,
    badge: "Popular",
  },
  {
    id: "18",
    name: "Dumbbells Set",
    price: 89.99,
    description: "Adjustable dumbbells set, 5-25 lbs with storage rack.",
    image: "/products/dumbbells.jpg",
    category: "Sports & Fitness",
    stock: 15,
    rating: 4.7,
    reviews: 76,
    badge: "New",
  },
  {
    id: "19",
    name: "Resistance Bands",
    price: 24.99,
    description: "Latex-free resistance bands set with carrying bag.",
    image: "/products/bands.jpg",
    category: "Sports & Fitness",
    stock: 65,
    rating: 4.4,
    reviews: 112,
  },
  {
    id: "20",
    name: "Jumping Rope",
    price: 19.99,
    description: "Speed adjustable jump rope for cardio training.",
    image: "/products/rope.jpg",
    category: "Sports & Fitness",
    stock: 55,
    rating: 4.5,
    reviews: 98,
  },
  // Beauty & Personal Care (4)
  {
    id: "21",
    name: "Face Wash",
    price: 16.99,
    description: "Gentle cleanser for all skin types, 200ml.",
    image: "/products/facewash.avif",
    category: "Beauty & Personal Care",
    stock: 72,
    rating: 4.6,
    reviews: 201,
    badge: "Popular",
  },
  {
    id: "22",
    name: "Moisturizer",
    price: 24.99,
    description: "Hydrating moisturizer with SPF 30 protection.",
    image: "/products/moisturizer.avif",
    category: "Beauty & Personal Care",
    stock: 58,
    rating: 4.7,
    reviews: 156,
    badge: "Sale",
  },
  {
    id: "23",
    name: "Lip Balm",
    price: 9.99,
    description: "Organic lip balm with vanilla flavor, 5g.",
    image: "/products/lipbalm.webp",
    category: "Beauty & Personal Care",
    stock: 120,
    rating: 4.4,
    reviews: 178,
  },
  {
    id: "24",
    name: "Hand Sanitizer",
    price: 8.99,
    description: "Antibacterial hand sanitizer gel, 250ml.",
    image: "/products/sanitizer.jpg",
    category: "Beauty & Personal Care",
    stock: 200,
    rating: 4.3,
    reviews: 289,
    badge: "New",
  },
  // Accessories (4)
  {
    id: "25",
    name: "Backpack",
    price: 59.99,
    description: "Laptop backpack with USB charging port.",
    image: "/products/backpack.jpg",
    category: "Accessories",
    stock: 33,
    rating: 4.7,
    reviews: 145,
    badge: "Popular",
  },
  {
    id: "26",
    name: "Smart Watch",
    price: 149.99,
    description: "Fitness tracker with heart rate monitor and GPS.",
    image: "/products/smartwatch.jpg",
    category: "Accessories",
    stock: 26,
    rating: 4.6,
    reviews: 203,
    badge: "New",
  },
  {
    id: "27",
    name: "Sunglasses",
    price: 79.99,
    description: "UV protection sunglasses with polarized lenses.",
    image: "/products/sunglasses.avif",
    category: "Accessories",
    stock: 42,
    rating: 4.5,
    reviews: 87,
  },
  {
    id: "28",
    name: "Leather Belt",
    price: 39.99,
    description: "Premium leather belt, adjustable sizing.",
    image: "/products/belt.jpg",
    category: "Accessories",
    stock: 51,
    rating: 4.4,
    reviews: 64,
    badge: "Sale",
  },
  // Books & Entertainment (4)
  {
    id: "29",
    name: "Fiction Novel",
    price: 16.99,
    description: "Bestselling fiction novel, 400 pages.",
    image: "/products/book.jpg",
    category: "Books & Entertainment",
    stock: 85,
    rating: 4.8,
    reviews: 512,
    badge: "Popular",
  },
  {
    id: "30",
    name: "Premium Notebook",
    price: 18.99,
    description: "Hardcover notebook with 200 ruled pages.",
    image: "/products/notebook.jpg",
    category: "Books & Entertainment",
    stock: 74,
    rating: 4.6,
    reviews: 134,
  },
  {
    id: "31",
    name: "Pen Set",
    price: 24.99,
    description: "Luxury pen set with 5 fine-tip pens.",
    image: "/products/penset.jpg",
    category: "Books & Entertainment",
    stock: 49,
    rating: 4.5,
    reviews: 92,
    badge: "New",
  },
  {
    id: "32",
    name: "Board Game",
    price: 34.99,
    description: "Popular strategy board game for 2-4 players.",
    image: "/products/boardgame.jpg",
    category: "Books & Entertainment",
    stock: 28,
    rating: 4.7,
    reviews: 156,
    badge: "Sale",
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

