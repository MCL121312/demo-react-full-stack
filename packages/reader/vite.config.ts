import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    react(),
    {
      name: "startup-banner",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          const addr = server.httpServer!.address()
          const port = typeof addr === "object" && addr ? addr.port : ""
          console.log("")
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
          console.log("  @demo/reader  读者端前端")
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
          console.log(`  Local → http://localhost:${port}`)
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
          console.log("")
        })
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
})
