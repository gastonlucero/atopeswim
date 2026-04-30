import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, 'data')

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const persistencePlugin = () => ({
  name: 'persistence-plugin',
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (req.url?.startsWith('/api/storage')) {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const type = url.searchParams.get('type') // 'salidas' or 'rutas'
        const filePath = path.join(DATA_DIR, `${type}.csv`)

        if (req.method === 'GET') {
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            res.setHeader('Content-Type', 'text/csv')
            res.end(content)
          } else {
            res.end('')
          }
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: Buffer) => { body += chunk })
          req.on('end', () => {
            console.log(`[Persistence] Saving ${type} to ${filePath} (${body.length} bytes)`)
            fs.writeFileSync(filePath, body, 'utf-8')
            res.end('ok')
          })
          return
        }
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), persistencePlugin()],
})
