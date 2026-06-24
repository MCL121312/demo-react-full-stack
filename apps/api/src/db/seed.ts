import { db } from './index';

const users = [
  { email: 'admin@demo.com', role: 'admin', tier: 'vip' },
  { email: 'reader@demo.com', role: 'reader', tier: 'free' },
  { email: 'vip@demo.com', role: 'reader', tier: 'vip' },
];

const articles = [
  {
    title: '免费文章1',
    content: '这是公开内容，所有人可见。',
    tier: 'free',
    published_at: Date.now(),
  },
  {
    title: 'VIP专属文章',
    content: '只有VIP用户才能看到这篇文章。',
    tier: 'vip',
    published_at: Date.now(),
  },
  { title: '免费文章2', content: '又一篇免费内容。', tier: 'free', published_at: Date.now() },
  {
    title: 'VIP进阶指南',
    content: 'VIP深度内容，关于高级特性。',
    tier: 'vip',
    published_at: Date.now(),
  },
];

const insertUser = db.prepare('INSERT INTO users (email, role, tier) VALUES (?, ?, ?)');
for (const u of users) {
  insertUser.run(u.email, u.role, u.tier);
}

const insertArticle = db.prepare(
  'INSERT INTO articles (title, content, tier, published_at) VALUES (?, ?, ?, ?)',
);
for (const a of articles) {
  insertArticle.run(a.title, a.content, a.tier, a.published_at);
}

console.log(`Seeded ${users.length} users and ${articles.length} articles.`);
