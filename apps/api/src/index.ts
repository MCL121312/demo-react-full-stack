import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { createServer } from 'net';
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

function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const s = createServer();
    s.once('error', (err: any) => resolve(err.code === 'EADDRINUSE'));
    s.once('listening', () => {
      s.close();
      resolve(false);
    });
    s.listen(port);
  });
}

async function findAvailablePort(start: number): Promise<number> {
  for (let i = 0; i < 10; i++) {
    const p = start + i;
    if (!(await isPortInUse(p))) return p;
  }
  return start;
}

const watchMode = process.argv.includes('watch');

async function main() {
  const desiredPort = Number(process.env.PORT) || 4000;
  const actualPort = watchMode ? await findAvailablePort(desiredPort) : desiredPort;

  if (desiredPort !== actualPort) {
    console.log(`🔀 端口 ${desiredPort} 被占用，自动切换到端口 ${actualPort}`);
  }

  if (await isPortInUse(actualPort)) {
    console.error(`❌ 端口 ${actualPort} 已被占用`);
    console.error('');
    console.error('   解决方案:');
    console.error(`   1. 使用其他端口: PORT=${actualPort + 1} pnpm dev`);
    console.error(`   2. 杀掉占用进程: lsof -ti:${actualPort} | xargs kill -9`);
    console.error('');
    process.exit(1);
  }

  const server = serve({ fetch: app.fetch, port: actualPort }, () => {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  @demo/api  后端 API 服务');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  API   → http://localhost:${actualPort}`);
    console.log(`  文档  → http://localhost:${actualPort}/docs`);
    console.log('');
    console.log(`  PID: ${process.pid}`);
    console.log(`  退出: lsof -ti:${actualPort} | xargs kill -9`);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
  });

  let isShuttingDown = false;

  async function gracefulShutdown(signal: string) {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n📥 收到 ${signal}，正在关闭服务...`);

    const timer = setTimeout(() => {
      console.error('⚠️ 关闭超时，强制退出');
      process.exit(1);
    }, 10000);

    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });

    clearTimeout(timer);
    console.log('👋 服务已关闭');
    process.exit(0);
  }

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('uncaughtException', (err) => {
    console.error('💥 未捕获的异常:', err);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
  });
  process.on('unhandledRejection', (reason) => {
    console.error('💥 未处理的 Promise 拒绝:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
  });
}

main().catch((err) => {
  console.error('❌ 启动失败:', err);
  process.exit(1);
});

export default app;
