import { Hono } from "hono"
import { db } from "../../db"
import { z } from "zod"

const router = new Hono()

const createSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tier: z.enum(["free", "vip"]),
})

router.post("/articles", async (c) => {
  const body = await c.req.json()
  const { title, content, tier } = createSchema.parse(body)
  const stmt = db.prepare("INSERT INTO articles (title, content, tier) VALUES (?, ?, ?) RETURNING *")
  const row = stmt.get(title, content, tier)
  return c.json(row, 201)
})

router.put("/articles/:id", async (c) => {
  const id = Number(c.req.param("id"))
  const body = await c.req.json()
  const { title, content, tier } = createSchema.parse(body)
  const stmt = db.prepare("UPDATE articles SET title = ?, content = ?, tier = ? WHERE id = ?")
  stmt.run(title, content, tier, id)
  return c.newResponse(null, 204)
})

router.delete("/articles/:id", async (c) => {
  const id = Number(c.req.param("id"))
  const stmt = db.prepare("DELETE FROM articles WHERE id = ?")
  stmt.run(id)
  return c.newResponse(null, 204)
})

export default router
