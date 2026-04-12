export interface Item {
  id: string;
  title: string;
  description: string;
  size: string;
  category: "tops" | "bottoms" | "dresses" | "outerwear" | "shoes" | "accessories";
  color: string;
  condition: "like new" | "good" | "fair";
  owner: {
    name: string;
    avatar: string;
    community: string;
  };
  images: string[];
  available: boolean;
  tags: string[];
}

export interface Community {
  id: string;
  name: string;
  type: "sorority" | "dorm" | "neighborhood" | "club";
  memberCount: number;
  activeListings: number;
  description: string;
  color: string;
}

export const communities: Community[] = [
  {
    id: "kkg",
    name: "Kappa Kappa Gamma",
    type: "sorority",
    memberCount: 84,
    activeListings: 127,
    description: "Sharing formals, gameday fits, and everyday pieces across the chapter.",
    color: "sage",
  },
  {
    id: "tri-delt",
    name: "Delta Delta Delta",
    type: "sorority",
    memberCount: 72,
    activeListings: 98,
    description: "Borrow for date parties, swaps, and everything in between.",
    color: "lavender",
  },
  {
    id: "honors-hall",
    name: "Honors Hall 3rd Floor",
    type: "dorm",
    memberCount: 31,
    activeListings: 43,
    description: "A small tight-knit group sharing closets on the third floor.",
    color: "sky",
  },
  {
    id: "maple-st",
    name: "Maple Street Co-op",
    type: "neighborhood",
    memberCount: 18,
    activeListings: 22,
    description: "Neighbors sharing seasonal pieces and special occasion wear.",
    color: "terracotta",
  },
  {
    id: "fashion-club",
    name: "Campus Fashion Collective",
    type: "club",
    memberCount: 56,
    activeListings: 89,
    description: "Fashion-forward students sharing statement pieces and trend items.",
    color: "lavender",
  },
];

const placeholderImg = (seed: string) =>
  `https://picsum.photos/seed/${seed}/400/500`;

export const items: Item[] = [
  {
    id: "1",
    title: "Sage Green Midi Dress",
    description: "Perfect for date parties or spring formals. Flowy silhouette with adjustable straps. Worn twice.",
    size: "S",
    category: "dresses",
    color: "Green",
    condition: "like new",
    owner: { name: "Ava M.", avatar: "AM", community: "Kappa Kappa Gamma" },
    images: [placeholderImg("sage-dress")],
    available: true,
    tags: ["formal", "spring", "date party"],
  },
  {
    id: "2",
    title: "Vintage Levi's 501s",
    description: "Authentic 90s straight-leg Levi's. Great distressing and patina. True to size.",
    size: "28",
    category: "bottoms",
    color: "Blue",
    condition: "good",
    owner: { name: "Jordan K.", avatar: "JK", community: "Honors Hall 3rd Floor" },
    images: [placeholderImg("levis-501")],
    available: true,
    tags: ["casual", "vintage", "denim"],
  },
  {
    id: "3",
    title: "Black Leather Moto Jacket",
    description: "Real leather moto jacket. Broken in perfectly. Runs slightly oversized.",
    size: "M",
    category: "outerwear",
    color: "Black",
    condition: "good",
    owner: { name: "Priya S.", avatar: "PS", community: "Campus Fashion Collective" },
    images: [placeholderImg("moto-jacket")],
    available: true,
    tags: ["statement", "going out", "fall"],
  },
  {
    id: "4",
    title: "Floral Puff-Sleeve Top",
    description: "Cottagecore vibes. Lightweight cotton with elastic puff sleeves. Great for gameday layering.",
    size: "M",
    category: "tops",
    color: "White",
    condition: "like new",
    owner: { name: "Mia R.", avatar: "MR", community: "Delta Delta Delta" },
    images: [placeholderImg("floral-top")],
    available: true,
    tags: ["gameday", "casual", "spring"],
  },
  {
    id: "5",
    title: "Gold Strappy Heels",
    description: "4-inch block heel. Comfortable enough to dance in. Size runs TTS.",
    size: "8",
    category: "shoes",
    color: "Gold",
    condition: "fair",
    owner: { name: "Chloe T.", avatar: "CT", community: "Kappa Kappa Gamma" },
    images: [placeholderImg("gold-heels")],
    available: false,
    tags: ["formal", "going out", "heels"],
  },
  {
    id: "6",
    title: "Oversized Blazer",
    description: "Thrifted menswear blazer. Amazing with bike shorts or over a mini dress.",
    size: "L",
    category: "outerwear",
    color: "Beige",
    condition: "good",
    owner: { name: "Sage W.", avatar: "SW", community: "Maple Street Co-op" },
    images: [placeholderImg("blazer")],
    available: true,
    tags: ["layering", "thrifted", "versatile"],
  },
  {
    id: "7",
    title: "Satin Slip Skirt",
    description: "Midi-length satin skirt in champagne. Bias cut, super flattering.",
    size: "S",
    category: "bottoms",
    color: "Champagne",
    condition: "like new",
    owner: { name: "Ella N.", avatar: "EN", community: "Delta Delta Delta" },
    images: [placeholderImg("satin-skirt")],
    available: true,
    tags: ["date party", "going out", "elegant"],
  },
  {
    id: "8",
    title: "Statement Earrings Set",
    description: "Three pairs of gold/pearl statement earrings. Mix and match for any occasion.",
    size: "OS",
    category: "accessories",
    color: "Gold",
    condition: "like new",
    owner: { name: "Ava M.", avatar: "AM", community: "Kappa Kappa Gamma" },
    images: [placeholderImg("earrings")],
    available: true,
    tags: ["accessories", "formal", "versatile"],
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "dresses", label: "Dresses" },
  { id: "outerwear", label: "Outerwear" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
] as const;

export const occasions = [
  "formal",
  "date party",
  "gameday",
  "going out",
  "casual",
  "spring",
  "fall",
  "winter",
] as const;
