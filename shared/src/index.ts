export interface Article {
  id: number;
  title: string;
  content: string;
  tier: 'free' | 'vip';
  published_at: number | null;
}

export interface User {
  id: number;
  email: string;
  role: 'reader' | 'admin';
  tier: 'free' | 'vip';
}

export interface ApiError {
  message: string;
  code: number;
}
