import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { get } from "../api/client"
import type { Article } from "@demo/shared"

export default function ArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setError("无效的文章ID")
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    get<Article>(`/reader/articles/${id}`)
      .then((data) => { if (!cancelled) setArticle(data) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error}</div>
  if (!article) return <div>文章不存在</div>

  return (
    <article>
      <Link to="/">← 返回列表</Link>
      <h1>{article.title}</h1>
      <div>{article.content}</div>
    </article>
  )
}
