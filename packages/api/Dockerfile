FROM node:20-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared packages/shared
COPY packages/api packages/api
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm --filter @demo/api build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/packages/api/dist ./dist
COPY --from=builder /app/packages/api/node_modules ./node_modules
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/index.js"]
