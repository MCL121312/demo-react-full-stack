import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { get, del } from "../api/client"
import type { Article } from "@demo/shared"

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function fetchArticles() {
    setLoading(true)
    setError(null)
    get<Article[]>("/admin/articles")
      .then(setArticles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchArticles() }, [])

  async function handleDelete(id: number) {
    if (!confirm("确定删除这篇文章？")) return
    try {
      await del(`/admin/articles/${id}`)
      setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : "删除失败")
    }
  }

  return (
    <div>
      <h1>文章管理</h1>
      <Link to="/articles/new">新建文章</Link>
      {loading && <div>加载中...</div>}
      {error && <div>错误: {error}</div>}
      {!loading && !error && (
        <ul>
          {articles.map((a) => (
            <li key={a.id}>
              {a.title}
              <Link to={`/articles/${a.id}/edit`}>编辑</Link>
              <button onClick={() => handleDelete(a.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
