import http from 'http'
import app from './index.js'

// Passenger/cPanel will typically set `PORT` (or one of these). We avoid a hardcoded port
// so we don't fight with Passenger's own port management.
const PORT =
  Number.parseInt(process.env.PORT || process.env.PASSENGER_APP_PORT || process.env.PASSENGER_PORT, 10) || null
const HOST = process.env.HOST || '0.0.0.0'

if (!PORT) {
  throw new Error(
    `Missing required PORT for server.js. Set PORT (or PASSENGER_APP_PORT / PASSENGER_PORT).`,
  )
}

http.createServer(app).listen(PORT, HOST, () => {
  console.log(`Visit Kirehe API running on http://${HOST}:${PORT}`)
})

