export interface Article {
  id: number
  title: string
  content: string
  tier: "free" | "vip"
  publishedAt: string | null
}

export interface User {
  id: number
  email: string
  role: "reader" | "admin"
  tier: "free" | "vip"
}

export interface ApiError {
  message: string
  code: number
}
