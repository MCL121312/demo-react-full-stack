import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import readerArticles from "./routes/reader/article"
import adminArticles from "./routes/admin/article"

const app = new Hono()

app.use("*", cors())

app.route("/api/reader", readerArticles)
app.route("/api/admin", adminArticles)

const port = Number(process.env.PORT) || 4000

serve({ fetch: app.fetch, port }, () => {
  console.log(`API 运行在 http://localhost:${port}`)
})

export default app
