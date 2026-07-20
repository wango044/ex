export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'lamination' | 'shaping' | 'coloring' | 'all';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  avatar: string;
}
