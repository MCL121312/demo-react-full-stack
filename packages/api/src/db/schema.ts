export function initializeSchema(db: import("node:sqlite").DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT    NOT NULL UNIQUE,
      role  TEXT    NOT NULL DEFAULT 'reader' CHECK(role IN ('reader','admin')),
      tier  TEXT    NOT NULL DEFAULT 'free'   CHECK(tier  IN ('free','vip'))
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      title        TEXT    NOT NULL,
      content      TEXT    NOT NULL,
      tier         TEXT    NOT NULL DEFAULT 'free' CHECK(tier IN ('free','vip')),
      published_at INTEGER
    )
  `)
}
