import { useEffect, useState } from "react"
import { get } from "../api/client"
import type { Article } from "@demo/shared"

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [tier, setTier] = useState<"free" | "vip">("free")

  useEffect(() => {
    get<Article[]>(`/reader/articles?tier=${tier}`).then(setArticles)
  }, [tier])

  return (
    <div>
      <h1>文章列表</h1>
      <nav>
        <button onClick={() => setTier("free")}>公开</button>
        <button onClick={() => setTier("vip")}>VIP</button>
      </nav>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <a href={`/article/${a.id}`}>{a.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
