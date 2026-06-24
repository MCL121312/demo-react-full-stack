import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import readerArticles from './routes/reader/article';
import adminArticles from './routes/admin/article';
import { createOpenApiSpec } from './openapi/spec';

const app = new Hono();

app.use('*', cors());

app.route('/api/reader', readerArticles);
app.route('/api/admin', adminArticles);

app.get('/openapi.json', (c) => {
  const reqUrl = new URL(c.req.url);
  const baseUrl = `${reqUrl.protocol}//${reqUrl.host}`;
  return c.json(createOpenApiSpec(baseUrl));
});

app.get(
  '/docs',
  Scalar({
    pageTitle: 'Demo React Full Stack API 文档',
    url: '/openapi.json',
    theme: 'bluePlanet',
  }),
);

const port = Number(process.env.PORT) || 4000;

const server = serve({ fetch: app.fetch, port }, () => {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  @demo/api  后端 API 服务');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  API   → http://localhost:${port}`);
  console.log(`  文档  → http://localhost:${port}/docs`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));

export default app;
