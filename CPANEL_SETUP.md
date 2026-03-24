# cPanel Setup for Visit Kirehe

## Option A: Apache Proxy (recommended – no cPanel changes needed)

The deploy puts an `.htaccess` in the frontend folder that proxies `/api` and `/uploads` to the Node app. This gives same-origin requests (no CORS).

**Requirements:** Your host must have `mod_proxy` and `mod_proxy_http` enabled (common on cPanel). If you get 500 errors on `/api/*`, ask your host to enable them.

**No extra setup** – just push and the frontend will use the proxy.

---

## Option B: Main domain points to Node app

If the proxy does not work, point the main domain to the Node app:

- Go to **Setup Node.js App** (or **Application Manager**)
- Create or edit your app
- Set **Application root** to: `visitkirehe/server`
- Set **Application URL** to: `https://visitkirehe.cypadi.com` (main domain)
- Save and restart

---

## GitHub Secrets (Settings → Secrets and variables → Actions)

Add these so the deploy can create `.env` on the server:

| Secret       | Value                         |
|-------------|--------------------------------|
| `DB_HOST`   | `localhost`                    |
| `DB_USER`   | `cypadico930`                  |
| `DB_PASSWORD` | your MySQL password         |
| `DB_NAME`   | `cypadico930_visitkirehe`      |

### 3. Subdomain `api.visitkirehe.cypadi.com`

- If the main domain serves the Node app, you can remove or redirect this subdomain
- Or keep it as an alias: both `visitkirehe.cypadi.com` and `api.visitkirehe.cypadi.com` can point to the same Node app

### 4. After deploy

- Push to `main` to trigger deploy
- Visit `https://visitkirehe.cypadi.com` – the site and API should load from the same origin
- Test: `https://visitkirehe.cypadi.com/api/health` should return `{"ok":true}`
