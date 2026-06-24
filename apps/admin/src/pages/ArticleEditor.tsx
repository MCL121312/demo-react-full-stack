import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, post, put } from '../api/client';
import type { Article } from '../../../../shared/src';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tier, setTier] = useState<'free' | 'vip'>('free');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    get<Article>(`/admin/articles/${id}`)
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setTier(data.tier);
      })
      .catch((e) => setError(e.message))
      .finally(() => setFetching(false));
  }, [id]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await put(`/admin/articles/${id}`, { title, content, tier });
      } else {
        await post<Article>('/admin/articles', { title, content, tier });
      }
      navigate('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败');
      setLoading(false);
    }
  }

  if (fetching) return <div>加载中...</div>;

  return (
    <div>
      <h1>{isEdit ? '编辑文章' : '新建文章'}</h1>
      {error && <div>错误: {error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="标题"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="内容"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          name="tier"
          value={tier}
          onChange={(e) => setTier(e.target.value as 'free' | 'vip')}
        >
          <option value="free">公开</option>
          <option value="vip">VIP</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? '保存中...' : '保存'}
        </button>
      </form>
    </div>
  );
}
