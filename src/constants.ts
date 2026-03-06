export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  flavors: string[];
  image: string;
  isBestSeller?: boolean;
  stockCount?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ignite-v80',
    name: 'IGNITE V80',
    price: 100,
    category: 'Queridinhos',
    flavors: ['Menthol', 'Banana Ice', 'Grape Ice', 'Ice Mint', 'Watermelon Ice'],
    image: 'https://picsum.photos/seed/v80/400/400',
    isBestSeller: true,
    stockCount: 7
  },
  {
    id: 'elf-king-40k',
    name: 'ELF KING 40K',
    price: 130,
    category: 'Linha Premium',
    flavors: ['Black Mint', 'Green Apple Slush'],
    image: 'https://picsum.photos/seed/king40/400/400',
    stockCount: 12
  },
  {
    id: 'ignite-v400-ice',
    name: 'IGNITE V400 ICE',
    price: 140,
    category: 'Linha Premium',
    flavors: ['Menthol', 'Strawberry Watermelon Ice', 'Cherry Watermelon Ice', 'Tutti Frutti Mix', 'Strawberry Ice', 'Grape Ice', 'Passion Fruit Sour Kiwi'],
    image: 'https://picsum.photos/seed/v400ice/400/400',
    stockCount: 5
  },
  {
    id: 'ignite-v400-mix',
    name: 'IGNITE V400 MIX',
    price: 145,
    category: 'Linha Premium',
    flavors: ['Grape + Strawberry', 'Mighty + Menthol'],
    image: 'https://picsum.photos/seed/v400mix/400/400',
    stockCount: 8
  },
  {
    id: 'elf-gh23k',
    name: 'ELF GH23K',
    price: 115,
    category: 'Equilíbrio e Performance',
    flavors: ['Green Apple Ice', 'Baja Splash', 'Lime Grapefruit', 'Miami Mint', 'Peach Mango Watermelon', 'Sakura Grape', 'Kiwi Dragon Fruit', 'Strawberry Ice', 'Watermelon Ice', 'Ice Mint', 'Strawberry Banana', 'Pineapple Plums Lime Mint'],
    image: 'https://picsum.photos/seed/gh23/400/400',
    stockCount: 15
  },
  {
    id: 'ignite-v300',
    name: 'IGNITE V300',
    price: 130,
    category: 'Equilíbrio e Performance',
    flavors: ['Pineapple', 'Watermelon'],
    image: 'https://picsum.photos/seed/v300/400/400',
    stockCount: 4
  },
  {
    id: 'elf-bar-bc-15k',
    name: 'ELF BAR BC 15K',
    price: 95,
    category: 'Melhor Custo-Benefício',
    flavors: ['Passion Fruit Orange Guava', 'Banana Ice', 'Sour Apple'],
    image: 'https://picsum.photos/seed/bc15/400/400',
    stockCount: 20
  }
];

export const CATEGORIES = [
  'Queridinhos',
  'Linha Premium',
  'Equilíbrio e Performance',
  'Melhor Custo-Benefício'
];
