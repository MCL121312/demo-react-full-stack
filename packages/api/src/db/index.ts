import { DatabaseSync } from "node:sqlite"
import { initializeSchema } from "./schema"

export const db = new DatabaseSync("../../data/data.sqlite")
db.exec("PRAGMA journal_mode = WAL")
initializeSchema(db)
