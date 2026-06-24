FROM node:20-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared packages/shared
COPY packages/reader packages/reader
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm --filter @demo/reader build

FROM nginx:alpine
COPY --from=builder /app/packages/reader/dist /usr/share/nginx/html
EXPOSE 4173
