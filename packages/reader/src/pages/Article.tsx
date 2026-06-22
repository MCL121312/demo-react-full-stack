import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get } from "../api/client"
import type { Article } from "@demo/shared"

export default function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    get<Article>(`/reader/articles/${id}`).then(setArticle)
  }, [id])

  if (!article) return <div>加载中...</div>

  return (
    <article>
      <h1>{article.title}</h1>
      <div>{article.content}</div>
    </article>
  )
}
