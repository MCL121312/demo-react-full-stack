import { useEffect, useState } from "react"
import type { Article } from "@demo/shared"

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch("/api/admin/articles").then((r) => r.json()).then(setArticles)
  }, [])

  return (
    <div>
      <h1>文章管理</h1>
      <a href="/articles/new">新建文章</a>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            {a.title}
            <a href={`/articles/${a.id}/edit`}>编辑</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
