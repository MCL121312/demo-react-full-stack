import { useParams } from "react-router-dom"

export default function ArticleEditor() {
  const { id } = useParams()
  const isEdit = !!id

  return (
    <div>
      <h1>{isEdit ? "编辑文章" : "新建文章"}</h1>
      <form>
        <input name="title" placeholder="标题" />
        <textarea name="content" placeholder="内容" />
        <select name="tier">
          <option value="free">公开</option>
          <option value="vip">VIP</option>
        </select>
        <button type="submit">保存</button>
      </form>
    </div>
  )
}
