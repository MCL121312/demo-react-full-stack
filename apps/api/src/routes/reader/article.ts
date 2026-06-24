import { Hono } from 'hono';
import { db } from '../../db';

const router = new Hono();

router.get('/articles', async (c) => {
  const tier = c.req.query('tier') ?? 'free';
  const stmt = db.prepare('SELECT * FROM articles WHERE tier = ?');
  const rows = stmt.all(tier);
  return c.json(rows);
});

router.get('/articles/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const stmt = db.prepare('SELECT * FROM articles WHERE id = ?');
  const row = stmt.get(id);
  if (!row) return c.notFound();
  return c.json(row);
});

export default router;
