export interface Closet {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  location: string;
  bio: string;
  venmo?: string;
  followers: number;
  itemCount: number;
  rules: string[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  size: string;
  fitNote?: string;
  category: Category;
  occasion: Occasion[];
  color: string;
  condition: "like new" | "good" | "fair";
  rentPrice: number;
  buyPrice?: number;
  closetId: string;
  images: string[];
  available: boolean;
}

export type Category =
  | "dresses"
  | "tops"
  | "bottoms"
  | "sets"
  | "outerwear"
  | "shoes"
  | "accessories";

export type Occasion =
  | "formal"
  | "gameday"
  | "date party"
  | "21st"
  | "rush"
  | "going out"
  | "casual"
  | "wedding guest";

export interface Community {
  id: string;
  name: string;
  type: "sorority" | "dorm" | "neighborhood" | "club";
  memberCount: number;
  activeListings: number;
  description: string;
}

// Unsplash clothing photos with reliable IDs
const img = (id: string, w = 400, h = 500) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80`;

export const closets: Closet[] = [
  {
    id: "fairley",
    name: "Fairley Closet",
    handle: "fairleycloset",
    avatar: "FC",
    location: "Oxford, MS",
    bio: "Selling + Rentals. Read rules before renting! Venmo before pickup.",
    venmo: "madisonfairleyy",
    followers: 2612,
    itemCount: 135,
    rules: [
      "Try ons are available",
      "Return within 2 days of rental date",
      "$5/day late fee if not returned on time",
      "If damaged, you must get it fixed or pay retail price",
      "Venmo before leaving with item",
      "If shipped, return within 2 days and send tracking number",
    ],
  },
  {
    id: "kayla",
    name: "Kayla's Closet",
    handle: "rentmycloset.kp",
    avatar: "KC",
    location: "Oxford, MS",
    bio: "Prices negotiable — DM if interested. Don't wash!",
    venmo: "kayla.pricee",
    followers: 256,
    itemCount: 33,
    rules: [
      "DM to rent",
      "Prices negotiable",
      "Do NOT wash items",
      "Return within 2 days",
    ],
  },
  {
    id: "oxford-rentals",
    name: "Oxford Rentals",
    handle: "rentmycloset.ox",
    avatar: "OR",
    location: "Oxford, MS",
    bio: "DM to Rent. Venmo: mariahsnare. @mariahsnare's closet!",
    venmo: "mariahsnare",
    followers: 141,
    itemCount: 38,
    rules: [
      "DM to rent",
      "Venmo required before pickup",
      "Return within 48 hours",
    ],
  },
  {
    id: "claires",
    name: "Rent Claire's Closet",
    handle: "rentclairescloset",
    avatar: "RC",
    location: "Athens, GA",
    bio: "UGA rentals! Formals, gameday, date parties. DM for availability.",
    venmo: "claire_rentals",
    followers: 890,
    itemCount: 67,
    rules: [
      "DM for availability",
      "48 hour rental period",
      "Venmo only",
      "Late returns: $10/day",
    ],
  },
  {
    id: "sophias",
    name: "Sophia's Styles",
    handle: "sophiastyles",
    avatar: "SS",
    location: "Tuscaloosa, AL",
    bio: "Bama girl closet! Gameday, formals, date nights. Venmo or Zelle accepted.",
    venmo: "sophia.k",
    followers: 1340,
    itemCount: 82,
    rules: [
      "Venmo or Zelle before pickup",
      "Return within 3 days",
      "$10/day late fee",
      "No alterations",
      "Try ons welcome — DM to schedule",
    ],
  },
  {
    id: "emilys",
    name: "Emily's Edit",
    handle: "emilys.edit",
    avatar: "EE",
    location: "Nashville, TN",
    bio: "Curated closet of designer pieces. Rent for less, look like more.",
    venmo: "emilyedit",
    followers: 478,
    itemCount: 45,
    rules: [
      "DM before renting",
      "48 hour rental window",
      "Venmo only — before pickup",
      "Dry clean only items noted in description",
    ],
  },
];

export const items: Item[] = [
  {
    id: "1",
    title: "Floral Strapless Maxi",
    description: "the CUTEST maxi!! Floral print, strapless with boning. Perfect for formals or date parties.",
    size: "S",
    fitNote: "fits smaller",
    category: "dresses",
    occasion: ["formal", "date party", "wedding guest"],
    color: "Cream/Pink Floral",
    condition: "like new",
    rentPrice: 35,
    closetId: "oxford-rentals",
    images: [img("photo-1595777457583-95e059d581b8")],
    available: true,
  },
  {
    id: "2",
    title: "Dress the Population Mini",
    description: "Dress the Population mini!! Purple floral with puff sleeves. Stunning in person.",
    size: "XS",
    category: "dresses",
    occasion: ["date party", "21st", "going out"],
    color: "Purple Floral",
    condition: "like new",
    rentPrice: 45,
    closetId: "oxford-rentals",
    images: [img("photo-1572804013309-59a88b7e92f1")],
    available: true,
  },
  {
    id: "3",
    title: "Black & White Polka Dot Dress",
    description: "Black and white polka dot dress!!! Flattering fit, great for any occasion.",
    size: "M",
    category: "dresses",
    occasion: ["date party", "going out", "casual"],
    color: "Black/White",
    condition: "good",
    rentPrice: 15,
    closetId: "kayla",
    images: [img("photo-1612336307429-8a898d10e223")],
    available: true,
  },
  {
    id: "4",
    title: "White Rosette Mini Dress",
    description: "White mini with rosette details. Perfect for 21st or rush events. SO cute in person.",
    size: "S",
    category: "dresses",
    occasion: ["21st", "rush", "date party"],
    color: "White",
    condition: "like new",
    rentPrice: 40,
    closetId: "kayla",
    images: [img("photo-1515372039744-b8f02a3ae446")],
    available: true,
  },
  {
    id: "5",
    title: "Champagne Satin Slip Dress",
    description: "Champagne satin midi with cowl neck and open back. Backless moment. Runs TTS.",
    size: "S",
    category: "dresses",
    occasion: ["formal", "date party", "wedding guest"],
    color: "Champagne",
    condition: "like new",
    rentPrice: 30,
    closetId: "kayla",
    images: [img("photo-1566174053879-31528523f8ae")],
    available: false,
  },
  {
    id: "6",
    title: "Blue Ruffle Midi Dress",
    description: "Baby blue ruffle midi. Perfect for gameday or brunch. Zipper back, fits TTS.",
    size: "M",
    fitNote: "runs TTS",
    category: "dresses",
    occasion: ["gameday", "casual", "date party"],
    color: "Blue",
    condition: "good",
    rentPrice: 25,
    closetId: "fairley",
    images: [img("photo-1594938298603-c8148c4dae35")],
    available: true,
  },
  {
    id: "7",
    title: "White Strapless Cutout Mini",
    description: "White strapless with side cutouts. 21st dress vibes. Worn once.",
    size: "S",
    category: "dresses",
    occasion: ["21st", "going out", "date party"],
    color: "White",
    condition: "like new",
    rentPrice: 35,
    buyPrice: 60,
    closetId: "fairley",
    images: [img("photo-1562137369-1a1a0bc66744")],
    available: true,
  },
  {
    id: "8",
    title: "Floral Off-Shoulder Maxi",
    description: "Gorgeous off-shoulder maxi, flowy slit. Beach formal or wedding guest perfection.",
    size: "M",
    fitNote: "runs slightly big",
    category: "dresses",
    occasion: ["formal", "wedding guest"],
    color: "Tropical Print",
    condition: "good",
    rentPrice: 30,
    closetId: "oxford-rentals",
    images: [img("photo-1496747611176-843222e1e57c")],
    available: true,
  },
  {
    id: "9",
    title: "Gold Strappy Heels",
    description: "Gold block heel strappy sandals. Comfortable enough to dance in all night. Size 8.",
    size: "8",
    category: "shoes",
    occasion: ["formal", "date party", "21st"],
    color: "Gold",
    condition: "good",
    rentPrice: 15,
    closetId: "fairley",
    images: [img("photo-1543163521-1bf539c55dd2")],
    available: true,
  },
  {
    id: "10",
    title: "Statement Pearl Earrings",
    description: "Oversized pearl drop earrings. Elevate any outfit. One pair.",
    size: "OS",
    category: "accessories",
    occasion: ["formal", "date party", "rush", "wedding guest"],
    color: "Pearl/Gold",
    condition: "like new",
    rentPrice: 10,
    closetId: "claires",
    images: [img("photo-1535632066927-ab7c9ab60908")],
    available: true,
  },
  {
    id: "11",
    title: "Red Satin Cowl Top",
    description: "Red satin cowl neck top. Goes with everything. Great for gameday (Ole Miss!) or going out.",
    size: "S",
    category: "tops",
    occasion: ["gameday", "going out", "date party"],
    color: "Red",
    condition: "like new",
    rentPrice: 15,
    closetId: "claires",
    images: [img("photo-1564257631407-4deb1f99d992")],
    available: true,
  },
  {
    id: "12",
    title: "Sequin Two-Piece Set",
    description: "Silver sequin skirt + crop top set. PERFECT for 21st or NYE. Show stopper.",
    size: "XS",
    fitNote: "fits XS-S",
    category: "sets",
    occasion: ["21st", "going out", "formal"],
    color: "Silver",
    condition: "like new",
    rentPrice: 50,
    closetId: "fairley",
    images: [img("photo-1518577915332-c2a19f149a75")],
    available: true,
  },
  {
    id: "13",
    title: "Emerald Velvet Midi",
    description: "Emerald green velvet midi with long sleeves. Stunning for winter formals. Feels SO luxe.",
    size: "M",
    fitNote: "runs TTS",
    category: "dresses",
    occasion: ["formal", "date party", "wedding guest"],
    color: "Emerald Green",
    condition: "like new",
    rentPrice: 40,
    closetId: "sophias",
    images: [img("photo-1550639525-c97d455acf70")],
    available: true,
  },
  {
    id: "14",
    title: "Leather Moto Jacket",
    description: "Black faux leather moto jacket. Throw it over any dress for an edgy vibe. Size S but fits oversized.",
    size: "S",
    fitNote: "runs oversized",
    category: "outerwear",
    occasion: ["going out", "casual", "date party"],
    color: "Black",
    condition: "good",
    rentPrice: 25,
    closetId: "emilys",
    images: [img("photo-1551028719-00167b16eac5")],
    available: true,
  },
  {
    id: "15",
    title: "Blush Pink Tulle Skirt",
    description: "Layered tulle midi skirt in blush pink. So dreamy for rush or brunch. Elastic waist fits XS-M.",
    size: "S",
    fitNote: "elastic waist, fits XS-M",
    category: "bottoms",
    occasion: ["rush", "casual", "date party"],
    color: "Blush Pink",
    condition: "like new",
    rentPrice: 20,
    closetId: "sophias",
    images: [img("photo-1583496661160-fb5886a0aaaa")],
    available: true,
  },
  {
    id: "16",
    title: "Navy Blazer Dress",
    description: "Double-breasted navy blazer dress. Power move for date party or 21st. Gold button details.",
    size: "S",
    category: "dresses",
    occasion: ["date party", "21st", "going out"],
    color: "Navy",
    condition: "like new",
    rentPrice: 35,
    buyPrice: 75,
    closetId: "emilys",
    images: [img("photo-1539008835657-9e8e9680c956")],
    available: true,
  },
  {
    id: "17",
    title: "Beaded Clutch Bag",
    description: "Vintage-style beaded clutch in ivory and gold. The perfect finishing touch for any formal look.",
    size: "OS",
    category: "accessories",
    occasion: ["formal", "wedding guest", "21st"],
    color: "Ivory/Gold",
    condition: "good",
    rentPrice: 12,
    closetId: "claires",
    images: [img("photo-1594223274512-ad4803739b7c")],
    available: true,
  },
  {
    id: "18",
    title: "Crimson Gameday Dress",
    description: "Red and white striped mini — PERFECT for Bama gameday. Runs slightly small.",
    size: "M",
    fitNote: "runs small",
    category: "dresses",
    occasion: ["gameday", "casual"],
    color: "Red/White",
    condition: "good",
    rentPrice: 20,
    closetId: "sophias",
    images: [img("photo-1603344797033-f0f4f587ab60")],
    available: true,
  },
  {
    id: "19",
    title: "Black Strappy Platform Heels",
    description: "Platform heels with ankle strap. Surprisingly comfy. Goes with literally everything.",
    size: "7.5",
    category: "shoes",
    occasion: ["formal", "going out", "date party", "21st"],
    color: "Black",
    condition: "like new",
    rentPrice: 18,
    closetId: "emilys",
    images: [img("photo-1515347619252-60a4bf4fff4f")],
    available: true,
  },
  {
    id: "20",
    title: "Cropped Denim Jacket",
    description: "Light wash cropped denim jacket. Pair with a dress for gameday or casual brunch.",
    size: "S",
    category: "outerwear",
    occasion: ["gameday", "casual"],
    color: "Light Wash",
    condition: "good",
    rentPrice: 15,
    closetId: "kayla",
    images: [img("photo-1578587018452-892bacefd3f2")],
    available: true,
  },
  {
    id: "21",
    title: "Sage Green Wrap Dress",
    description: "Sage green linen wrap dress. So flattering, looks amazing on everyone. Wedding guest perfection.",
    size: "M",
    fitNote: "adjustable wrap, fits S-M",
    category: "dresses",
    occasion: ["wedding guest", "casual", "rush"],
    color: "Sage Green",
    condition: "like new",
    rentPrice: 30,
    closetId: "sophias",
    images: [img("photo-1571513722275-4b41940f54b8")],
    available: true,
  },
  {
    id: "22",
    title: "Layered Gold Necklace Set",
    description: "Set of 3 layered gold necklaces — dainty, medium, and statement. Wear all together or mix and match.",
    size: "OS",
    category: "accessories",
    occasion: ["formal", "going out", "casual", "date party"],
    color: "Gold",
    condition: "like new",
    rentPrice: 10,
    closetId: "fairley",
    images: [img("photo-1599643478518-a784e5dc4c8f")],
    available: true,
  },
  {
    id: "23",
    title: "Black Silk Cami Top",
    description: "100% silk cami in black. Tuck into jeans or pair with a skirt for date night. Dry clean only.",
    size: "XS",
    category: "tops",
    occasion: ["going out", "date party", "casual"],
    color: "Black",
    condition: "like new",
    rentPrice: 15,
    closetId: "emilys",
    images: [img("photo-1562572159-4efc207f5aff")],
    available: false,
  },
  {
    id: "24",
    title: "Sunflower Print Maxi Skirt",
    description: "High-waisted maxi skirt with sunflower print. Festival vibes or Sunday brunch essential.",
    size: "M",
    category: "bottoms",
    occasion: ["casual", "gameday"],
    color: "Yellow/Green",
    condition: "good",
    rentPrice: 18,
    closetId: "sophias",
    images: [img("photo-1577900232427-18219b9166a0")],
    available: true,
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "dresses", label: "Dresses" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "sets", label: "Sets" },
  { id: "outerwear", label: "Outerwear" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
] as const;

export const occasions = [
  { id: "all", label: "All Occasions" },
  { id: "formal", label: "Formals" },
  { id: "gameday", label: "Gameday" },
  { id: "date party", label: "Date Party" },
  { id: "21st", label: "21st" },
  { id: "rush", label: "Rush" },
  { id: "going out", label: "Going Out" },
  { id: "wedding guest", label: "Wedding Guest" },
  { id: "casual", label: "Casual" },
] as const;

export const communities: Community[] = [
  {
    id: "kkg",
    name: "Kappa Kappa Gamma",
    type: "sorority",
    memberCount: 84,
    activeListings: 127,
    description: "Sharing formals, gameday fits, and everyday pieces across the chapter.",
  },
  {
    id: "tri-delt",
    name: "Delta Delta Delta",
    type: "sorority",
    memberCount: 72,
    activeListings: 98,
    description: "Borrow for date parties, swaps, and everything in between.",
  },
  {
    id: "honors-hall",
    name: "Honors Hall 3rd Floor",
    type: "dorm",
    memberCount: 31,
    activeListings: 43,
    description: "A small tight-knit group sharing closets on the third floor.",
  },
  {
    id: "maple-st",
    name: "Maple Street Co-op",
    type: "neighborhood",
    memberCount: 18,
    activeListings: 22,
    description: "Neighbors sharing seasonal pieces and special occasion wear.",
  },
  {
    id: "fashion-club",
    name: "Campus Fashion Collective",
    type: "club",
    memberCount: 56,
    activeListings: 89,
    description: "Fashion-forward students sharing statement pieces and trend items.",
  },
];

export interface Conversation {
  id: string;
  withClosetId: string;
  itemId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  fromMe: boolean;
  text: string;
  timestamp: string;
}

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    withClosetId: "fairley",
    itemId: "7",
    lastMessage: "Yes! Come by tomorrow after 3 and you can try it on",
    lastMessageAt: "2026-04-12T10:15:00",
    unreadCount: 1,
  },
  {
    id: "conv-2",
    withClosetId: "kayla",
    itemId: "4",
    lastMessage: "Perfect, I'll Venmo you now!",
    lastMessageAt: "2026-04-11T18:42:00",
    unreadCount: 0,
  },
  {
    id: "conv-3",
    withClosetId: "oxford-rentals",
    itemId: "1",
    lastMessage: "It's available this weekend! $35 for the weekend rental",
    lastMessageAt: "2026-04-10T14:30:00",
    unreadCount: 2,
  },
  {
    id: "conv-4",
    withClosetId: "claires",
    lastMessage: "Hey! Do you have anything for a spring formal?",
    lastMessageAt: "2026-04-08T09:20:00",
    unreadCount: 0,
  },
];

export const messages: Message[] = [
  // conv-1: Fairley Closet — about White Strapless Cutout Mini
  {
    id: "m1",
    conversationId: "conv-1",
    fromMe: true,
    text: "Hi! Is the White Strapless Cutout Mini still available for this Saturday?",
    timestamp: "2026-04-12T09:30:00",
  },
  {
    id: "m2",
    conversationId: "conv-1",
    fromMe: false,
    text: "Hey!! Yes it is! Did you want to rent or buy?",
    timestamp: "2026-04-12T09:45:00",
  },
  {
    id: "m3",
    conversationId: "conv-1",
    fromMe: true,
    text: "Rent please! Could I try it on first? I'm usually between an XS and S",
    timestamp: "2026-04-12T09:52:00",
  },
  {
    id: "m4",
    conversationId: "conv-1",
    fromMe: false,
    text: "Yes! Come by tomorrow after 3 and you can try it on",
    timestamp: "2026-04-12T10:15:00",
  },

  // conv-2: Kayla's Closet — about White Rosette Mini
  {
    id: "m5",
    conversationId: "conv-2",
    fromMe: true,
    text: "Hey! I love the white rosette mini dress. Is it available for next Friday?",
    timestamp: "2026-04-11T16:00:00",
  },
  {
    id: "m6",
    conversationId: "conv-2",
    fromMe: false,
    text: "Yesss it's available!! It's $40 for the weekend. Venmo @kayla.pricee before pickup",
    timestamp: "2026-04-11T16:30:00",
  },
  {
    id: "m7",
    conversationId: "conv-2",
    fromMe: true,
    text: "Amazing! Could you do $35? I'll return it by Sunday morning",
    timestamp: "2026-04-11T17:15:00",
  },
  {
    id: "m8",
    conversationId: "conv-2",
    fromMe: false,
    text: "Sure, $35 works! Just make sure it's back by Sunday noon",
    timestamp: "2026-04-11T18:00:00",
  },
  {
    id: "m9",
    conversationId: "conv-2",
    fromMe: true,
    text: "Perfect, I'll Venmo you now!",
    timestamp: "2026-04-11T18:42:00",
  },

  // conv-3: Oxford Rentals — about Floral Strapless Maxi
  {
    id: "m10",
    conversationId: "conv-3",
    fromMe: true,
    text: "Hi! Is the floral strapless maxi available this weekend?",
    timestamp: "2026-04-10T12:00:00",
  },
  {
    id: "m11",
    conversationId: "conv-3",
    fromMe: false,
    text: "Hey! Let me check... yes it should be back from the current rental by Friday!",
    timestamp: "2026-04-10T13:15:00",
  },
  {
    id: "m12",
    conversationId: "conv-3",
    fromMe: true,
    text: "Omg yay! How much for Fri-Sun?",
    timestamp: "2026-04-10T13:20:00",
  },
  {
    id: "m13",
    conversationId: "conv-3",
    fromMe: false,
    text: "It's available this weekend! $35 for the weekend rental",
    timestamp: "2026-04-10T14:30:00",
  },

  // conv-4: Claire's — general inquiry
  {
    id: "m14",
    conversationId: "conv-4",
    fromMe: true,
    text: "Hey! Do you have anything for a spring formal?",
    timestamp: "2026-04-08T09:20:00",
  },
];

export function getCloset(id: string): Closet | undefined {
  return closets.find((c) => c.id === id);
}

export function getItemsByCloset(closetId: string): Item[] {
  return items.filter((i) => i.closetId === closetId);
}

export function getConversationMessages(conversationId: string): Message[] {
  return messages.filter((m) => m.conversationId === conversationId);
}

export function getConversationsForUser(): (Conversation & { closet: Closet; item?: Item })[] {
  return conversations
    .map((c) => ({
      ...c,
      closet: closets.find((cl) => cl.id === c.withClosetId)!,
      item: c.itemId ? items.find((i) => i.id === c.itemId) : undefined,
    }))
    .filter((c) => c.closet)
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}
