/** Load .env before any other imports – required for cPanel/Passenger */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // Use `.env` as the source of truth.
  // On cPanel, Node app environment variables may already be set in Passenger;
  // `override: true` ensures `.env` values are applied consistently.
  dotenv.config({ path: path.join(__dirname, '.env'), override: true });
} catch (e) {
  console.warn('Could not load .env:', e.message);
}
