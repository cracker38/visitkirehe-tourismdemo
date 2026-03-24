/** Load .env before any other imports – required for cPanel/Passenger */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  dotenv.config({ path: path.join(__dirname, '.env') });
} catch (e) {
  console.warn('Could not load .env:', e.message);
}
