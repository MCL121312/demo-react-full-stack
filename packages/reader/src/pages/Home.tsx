import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { get } from "../api/client"
import type { Article } from "@demo/shared"

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [tier, setTier] = useState<"free" | "vip">("free")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    get<Article[]>(`/reader/articles?tier=${tier}`)
      .then((data) => { if (!cancelled) setArticles(data) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [tier])

  return (
    <div>
      <h1>文章列表</h1>
      <nav>
        <button onClick={() => setTier("free")}>公开</button>
        <button onClick={() => setTier("vip")}>VIP</button>
      </nav>
      {loading && <div>加载中...</div>}
      {error && <div>错误: {error}</div>}
      {!loading && !error && (
        <ul>
          {articles.map((a) => (
            <li key={a.id}>
              <Link to={`/article/${a.id}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
