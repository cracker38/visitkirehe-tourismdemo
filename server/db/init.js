/**
 * Run this once to create the database and tables: node server/db/init.js
 * Or: npm run db:init (from project root)
 * Requires MySQL running (e.g. XAMPP) and credentials in env or defaults (root, no password).
 */

import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.join(__dirname, 'schema.sql')

async function init() {
  const url = process.env.DATABASE_URL
  const config = url
    ? (() => {
        const u = new URL(url)
        return {
          host: u.hostname,
          port: u.port ? Number(u.port) : 3306,
          user: decodeURIComponent(u.username || ''),
          password: decodeURIComponent(u.password || ''),
          multipleStatements: true,
        }
      })()
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true,
      }

  console.log('Connecting to MySQL at', config.host, 'as', config.user, '...')
  const conn = await mysql.createConnection(config)
  const sql = fs.readFileSync(schemaPath, 'utf8')
  await conn.query(sql)
  await conn.end()
  console.log('Database "visitkirehe" and tables created/updated. Seed data inserted if empty.')
}

init().catch((err) => {
  console.error('DB init failed:', err.message)
  process.exit(1)
})
