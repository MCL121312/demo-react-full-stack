# demo-react-full-stack

```
├── packages/
│   ├── api/             Hono + node:sqlite（Code First）
│   │   ├── Dockerfile
│   │   └── src/
│   │       ├── index.ts       @hono/node-server → PORT=4000
│   │       ├── db/            schema + connection
│   │       ├── routes/
│   │       │   ├── reader/    读者端接口
│   │       │   └── admin/     管理后台接口
│   │       └── middleware/
│   ├── reader/          读者端 - 移动端 H5（React 19 + Vite 8 + Rolldown）
│   │   ├── Dockerfile
│   │   └── src/
│   │       ├── pages/    Home, Article
│   │       └── api/      fetch 封装
│   ├── admin/           管理后台（React 19 + Vite 8 + Rolldown）
│   │   ├── Dockerfile
│   │   └── src/
│   │       ├── pages/    Dashboard, ArticleEditor
│   │       └── components/
│   └── shared/          共享类型
│       └── src/
├── .oxlintrc.json
├── pnpm-workspace.yaml
└── package.json
```

## 技术栈

| 层       | 工具                      | 引擎            |
| -------- | ------------------------- | --------------- |
| 打包     | Vite 8                    | Rolldown (Rust) |
| JSX 编译 | `@vitejs/plugin-react` v6 | Oxc (Rust)      |
| 代码检查 | oxlint                    | Oxc (Rust)      |
| 格式化   | oxfmt                     | Oxc (Rust)      |
| 后端     | Hono + node:sqlite        | Node 24 内置    |

## 开发

```bash
pnpm install
pnpm dev           # 同时启动 api + reader + admin
pnpm lint          # oxlint 检查
pnpm fmt           # oxfmt 格式化
```

## 端口

| 服务   | 开发             | 生产 |
| ------ | ---------------- | ---- |
| api    | 4000             | 4000 |
| reader | 自动 (默认 5173) | 4173 |
| admin  | 自动 (默认 5173) | 4173 |

## 构建/部署

三个独立 Docker 镜像：

```bash
pnpm build
```

| 镜像     | 端口 | 说明         |
| -------- | ---- | ------------ |
| `api`    | 4000 | Hono API     |
| `reader` | 4173 | 读者端 SPA   |
| `admin`  | 4173 | 管理后台 SPA |
